/**
 * Step 6: Automated Daily Rewards Distributor (0.25% daily to ELARA holders)
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

async function distributeDailyRewards() {
  console.log('====================================================');
  console.log('   ELARA DAILY REWARDS DISTRIBUTION ENGINE (0.25%)  ');
  console.log('====================================================\n');

  if (!fs.existsSync(KEYS_FILE)) {
    throw new Error('keys.json not found!');
  }

  const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
  const server = new StellarSdk.Horizon.Server(config.network.horizonUrl);

  if (!keys.rewardsSecretKey) {
    console.log('Rewards pool wallet not found. Please run node 05_split_allocations.js first.');
    return;
  }

  const rewardsKp = StellarSdk.Keypair.fromSecret(keys.rewardsSecretKey);
  const asset = new StellarSdk.Asset(config.token.code, keys.issuerPublicKey);

  console.log(`Rewards Pool Wallet: ${rewardsKp.publicKey()}`);
  const poolAccount = await server.loadAccount(rewardsKp.publicKey());
  const poolBalance = poolAccount.balances.find(
    (b) => b.asset_code === config.token.code && b.asset_issuer === keys.issuerPublicKey
  )?.balance;
  console.log(`Available Rewards Pool: ${Number(poolBalance).toLocaleString()} ELARA\n`);

  // Query all accounts with an ELARA trustline
  console.log('Scanning ledger for ELARA token holders...');
  const accountsPage = await server.accounts().forAsset(asset).call();
  const holders = accountsPage.records;

  // Filter out system wallets
  const systemWallets = new Set([
    keys.issuerPublicKey,
    keys.distributorPublicKey,
    keys.presalePublicKey,
    keys.rewardsPublicKey,
  ]);

  const eligibleHolders = holders.filter((acc) => !systemWallets.has(acc.account_id));

  console.log(`Found ${holders.length} total trustlines (${eligibleHolders.length} eligible external holders).\n`);

  if (eligibleHolders.length === 0) {
    console.log('ℹ️ No external token holders found yet. Once users participate in the presale or acquire ELARA, daily rewards will distribute to them.');
    return;
  }

  // Calculate 0.25% rewards for each holder
  const rewardRate = 0.0025; // 0.25%
  let totalRewardsToDistribute = 0;
  const payouts = [];

  for (const holder of eligibleHolders) {
    const elaraLine = holder.balances.find(
      (b) => b.asset_code === config.token.code && b.asset_issuer === keys.issuerPublicKey
    );
    const balance = parseFloat(elaraLine ? elaraLine.balance : '0');
    if (balance > 0) {
      const reward = (balance * rewardRate).toFixed(7);
      if (parseFloat(reward) > 0) {
        payouts.push({ destination: holder.account_id, amount: reward, holderBalance: balance });
        totalRewardsToDistribute += parseFloat(reward);
      }
    }
  }

  console.log(`Total Rewards to Pay: ${totalRewardsToDistribute.toLocaleString()} ELARA to ${payouts.length} holders.\n`);

  // Build batch payment transaction (up to 100 ops per Stellar tx)
  let currentAccount = await server.loadAccount(rewardsKp.publicKey());
  let txBuilder = new StellarSdk.TransactionBuilder(currentAccount, {
    fee: (StellarSdk.BASE_FEE * payouts.length).toString(),
    networkPassphrase: StellarSdk.Networks.TESTNET,
  });

  payouts.forEach((p) => {
    console.log(`  -> Reward: ${p.amount} ELARA to ${p.destination.slice(0, 8)}... (Holding: ${p.holderBalance})`);
    txBuilder.addOperation(
      StellarSdk.Operation.payment({
        destination: p.destination,
        asset,
        amount: p.amount,
      })
    );
  });

  const tx = txBuilder.setTimeout(30).build();
  tx.sign(rewardsKp);

  console.log('\nSubmitting daily rewards payment batch to ledger...');
  const res = await server.submitTransaction(tx);
  console.log(` Daily rewards distributed! Tx Hash: ${res.hash}`);
}

if (require.main === module) {
  distributeDailyRewards().catch((err) => {
    console.error('Error distributing rewards:', err);
    process.exit(1);
  });
}

module.exports = { distributeDailyRewards };
