/**
 * Step 2: Set Home Domain, Establish Trustline, and Mint 100 Billion ELARA tokens
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

async function mintAndDistribute() {
  console.log('=== Step 2: Minting & Distribution ===\n');

  if (!fs.existsSync(KEYS_FILE)) {
    throw new Error('keys.json not found! Please run 01_setup_accounts.js first.');
  }

  const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
  const server = new StellarSdk.Horizon.Server(config.network.horizonUrl);

  const issuerKp = StellarSdk.Keypair.fromSecret(keys.issuerSecretKey);
  const distributorKp = StellarSdk.Keypair.fromSecret(keys.distributorSecretKey);
  const asset = new StellarSdk.Asset(config.token.code, issuerKp.publicKey());

  console.log(`Asset: ${config.token.code}`);
  console.log(`Issuer: ${issuerKp.publicKey()}`);
  console.log(`Distributor: ${distributorKp.publicKey()}\n`);

  // 1. Set Home Domain on Issuer (for SEP-0001 / StellarExpert verification)
  console.log(`Setting home_domain to "${config.token.homeDomain}" on Issuer...`);
  let issuerAccount = await server.loadAccount(issuerKp.publicKey());
  let setDomainTx = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(
      StellarSdk.Operation.setOptions({
        homeDomain: config.token.homeDomain,
      })
    )
    .setTimeout(30)
    .build();

  setDomainTx.sign(issuerKp);
  await server.submitTransaction(setDomainTx);
  console.log(` Home domain set to: ${config.token.homeDomain}`);

  // 2. Establish Trustline on Distributor for 100,000,000,000 ELARA
  console.log(`Establishing trustline on Distributor for ${config.token.totalSupply} ${config.token.code}...`);
  let distributorAccount = await server.loadAccount(distributorKp.publicKey());
  let trustTx = new StellarSdk.TransactionBuilder(distributorAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(
      StellarSdk.Operation.changeTrust({
        asset: asset,
        limit: config.token.totalSupply,
      })
    )
    .setTimeout(30)
    .build();

  trustTx.sign(distributorKp);
  await server.submitTransaction(trustTx);
  console.log(` Trustline established.`);

  // 3. Mint Supply: Payment from Issuer to Distributor
  console.log(`Minting ${config.token.totalSupply} ${config.token.code} to Distributor...`);
  issuerAccount = await server.loadAccount(issuerKp.publicKey());
  let mintTx = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: distributorKp.publicKey(),
        asset: asset,
        amount: config.token.totalSupply,
      })
    )
    .setTimeout(30)
    .build();

  mintTx.sign(issuerKp);
  const mintResult = await server.submitTransaction(mintTx);
  console.log(` Mint transaction successful! Hash: ${mintResult.hash}`);

  // 4. Verify balance
  distributorAccount = await server.loadAccount(distributorKp.publicKey());
  const balance = distributorAccount.balances.find(
    (b) => b.asset_code === config.token.code && b.asset_issuer === issuerKp.publicKey()
  );

  console.log('\n--- Balance & Allocation Verification ---');
  console.log(`Total Minted Supply: ${balance ? balance.balance : '0'} ${config.token.code}`);
  console.log(`  - Presale Allocation (25%):   ${config.token.allocation.presaleAmount} ${config.token.code}`);
  console.log(`  - Daily Rewards Pool (75%):   ${config.token.allocation.treasuryAmount} ${config.token.code}`);
  console.log(`  - Holder Rewards Policy:      ${config.token.allocation.dailyRewardsRate}`);
  console.log('\n Step 2 complete! Ready for Step 3 (Deploy Soroban SAC).');
}

if (require.main === module) {
  mintAndDistribute().catch((err) => {
    console.error('Error minting token:', err);
    process.exit(1);
  });
}

module.exports = { mintAndDistribute };
