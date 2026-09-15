/**
 * Step 1: Generate and fund Issuer and Distributor accounts on Stellar Testnet
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

async function fundWithFriendbot(publicKey) {
  console.log(`Funding account ${publicKey} via Friendbot...`);
  const res = await fetch(`${config.network.friendbotUrl}?addr=${publicKey}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Friendbot failed for ${publicKey}: ${text}`);
  }
  console.log(` Funded ${publicKey}`);
}

async function setupAccounts() {
  console.log('=== Step 1: Account Setup ===\n');

  let keys = {};
  if (fs.existsSync(KEYS_FILE)) {
    console.log('Found existing keys.json file.');
    keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
    console.log(`Existing Issuer:      ${keys.issuerPublicKey}`);
    console.log(`Existing Distributor: ${keys.distributorPublicKey}`);
    return keys;
  }

  // Generate new keypairs
  console.log('Generating fresh keypairs...');
  const issuer = StellarSdk.Keypair.random();
  const distributor = StellarSdk.Keypair.random();

  console.log(`Issuer Public Key:      ${issuer.publicKey()}`);
  console.log(`Distributor Public Key: ${distributor.publicKey()}\n`);

  // Fund accounts via Friendbot
  await fundWithFriendbot(issuer.publicKey());
  await fundWithFriendbot(distributor.publicKey());

  // Compute deterministic Soroban Contract ID
  const asset = new StellarSdk.Asset(config.token.code, issuer.publicKey());
  const contractId = asset.contractId(StellarSdk.Networks.TESTNET);

  keys = {
    network: config.network.name,
    assetCode: config.token.code,
    issuerPublicKey: issuer.publicKey(),
    issuerSecretKey: issuer.secret(),
    distributorPublicKey: distributor.publicKey(),
    distributorSecretKey: distributor.secret(),
    sorobanContractId: contractId,
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));
  console.log(`\nKeys saved to ${KEYS_FILE}`);
  console.log(`Soroban Contract ID (derived): ${contractId}`);
  console.log('\n Step 1 complete! Ready for Step 2 (Minting).');
  return keys;
}

if (require.main === module) {
  setupAccounts().catch((err) => {
    console.error('Error setting up accounts:', err);
    process.exit(1);
  });
}

module.exports = { setupAccounts };
