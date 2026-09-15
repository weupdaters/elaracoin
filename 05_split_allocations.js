/**
 * Step 5: Split Initial Supply into Dedicated On-Chain Wallets:
 *  - 25% Presale Pool: 25,000,000,000 ELARA
 *  - 75% Daily Rewards Pool: 75,000,000,000 ELARA
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

async function fundWithFriendbot(publicKey) {
  console.log(`Funding ${publicKey} via Friendbot...`);
  const res = await fetch(`${config.network.friendbotUrl}?addr=${publicKey}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Friendbot failed for ${publicKey}: ${text}`);
  }
}

async function splitAllocations() {
  console.log('=== Step 5: Allocating Funds to Dedicated On-Chain Pools ===\n');

  if (!fs.existsSync(KEYS_FILE)) {
    throw new Error('keys.json not found!');
  }

  const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
  const server = new StellarSdk.Horizon.Server(config.network.horizonUrl);

  const distributorKp = StellarSdk.Keypair.fromSecret(keys.distributorSecretKey);
  const asset = new StellarSdk.Asset(config.token.code, keys.issuerPublicKey);

  // 1. Create or load Presale and Rewards Keypairs
  let presaleKp;
  let rewardsKp;

  if (keys.presaleSecretKey) {
    presaleKp = StellarSdk.Keypair.fromSecret(keys.presaleSecretKey);
  } else {
    presaleKp = StellarSdk.Keypair.random();
    keys.presalePublicKey = presaleKp.publicKey();
    keys.presaleSecretKey = presaleKp.secret();
    await fundWithFriendbot(presaleKp.publicKey());
  }

  if (keys.rewardsSecretKey) {
    rewardsKp = StellarSdk.Keypair.fromSecret(keys.rewardsSecretKey);
  } else {
    rewardsKp = StellarSdk.Keypair.random();
    keys.rewardsPublicKey = rewardsKp.publicKey();
    keys.rewardsSecretKey = rewardsKp.secret();
    await fundWithFriendbot(rewardsKp.publicKey());
  }

  console.log(`Presale Wallet:      ${presaleKp.publicKey()}`);
  console.log(`Rewards Pool Wallet: ${rewardsKp.publicKey()}\n`);

  // 2. Establish Trustlines on Presale & Rewards Accounts
  console.log('Setting up trustlines on allocation wallets...');
  
  let presaleAccount = await server.loadAccount(presaleKp.publicKey());
  const hasPresaleTrust = presaleAccount.balances.some((b) => b.asset_code === config.token.code);
  if (!hasPresaleTrust) {
    const tx = new StellarSdk.TransactionBuilder(presaleAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.changeTrust({ asset, limit: config.token.allocation.presaleAmount }))
      .setTimeout(30)
      .build();
    tx.sign(presaleKp);
    await server.submitTransaction(tx);
    console.log(' Trustline created for Presale Wallet.');
  }

  let rewardsAccount = await server.loadAccount(rewardsKp.publicKey());
  const hasRewardsTrust = rewardsAccount.balances.some((b) => b.asset_code === config.token.code);
  if (!hasRewardsTrust) {
    const tx = new StellarSdk.TransactionBuilder(rewardsAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.changeTrust({ asset, limit: config.token.allocation.treasuryAmount }))
      .setTimeout(30)
      .build();
    tx.sign(rewardsKp);
    await server.submitTransaction(tx);
    console.log(' Trustline created for Rewards Pool Wallet.');
  }

  // 3. Transfer from Distributor to Pools
  console.log('\nTransferring allocations from Distributor...');
  let distributorAccount = await server.loadAccount(distributorKp.publicKey());
  
  const distElaraBalance = distributorAccount.balances.find(
    (b) => b.asset_code === config.token.code && b.asset_issuer === keys.issuerPublicKey
  )?.balance;

  console.log(`Distributor current balance: ${Number(distElaraBalance).toLocaleString()} ELARA`);

  if (Number(distElaraBalance) >= 100000000000) {
    const transferTx = new StellarSdk.TransactionBuilder(distributorAccount, {
      fee: StellarSdk.BASE_FEE * 2,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      // Send 25B to Presale Wallet
      .addOperation(
        StellarSdk.Operation.payment({
          destination: presaleKp.publicKey(),
          asset,
          amount: config.token.allocation.presaleAmount,
        })
      )
      // Send 75B to Rewards Pool Wallet
      .addOperation(
        StellarSdk.Operation.payment({
          destination: rewardsKp.publicKey(),
          asset,
          amount: config.token.allocation.treasuryAmount,
        })
      )
      .setTimeout(30)
      .build();

    transferTx.sign(distributorKp);
    const txRes = await server.submitTransaction(transferTx);
    console.log(` Allocation Transfer Successful! Hash: ${txRes.hash}`);
  } else {
    console.log('Funds already allocated to separate pools.');
  }

  // Save keys
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));

  console.log('\n--- Final Allocation Breakdown ---');
  console.log(`Presale Wallet:      25,000,000,000 ELARA (25%) -> ${presaleKp.publicKey()}`);
  console.log(`Rewards Pool Wallet: 75,000,000,000 ELARA (75%) -> ${rewardsKp.publicKey()}`);
  console.log('\n Step 5 complete! Allocations are transparently recorded on-chain.');
}

if (require.main === module) {
  splitAllocations().catch((err) => {
    console.error('Error splitting allocations:', err);
    process.exit(1);
  });
}

module.exports = { splitAllocations };
