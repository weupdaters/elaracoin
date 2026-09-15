/**
 * Step 4: Permanently Lock the Issuer Account to guarantee fixed 100B supply
 * (Produces "Issuer account lock status: locked" on StellarExpert)
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

async function lockIssuer() {
  console.log('=== Step 4: Locking Issuer Account ===\n');

  if (!fs.existsSync(KEYS_FILE)) {
    throw new Error('keys.json not found! Please run 01_setup_accounts.js first.');
  }

  const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
  const server = new StellarSdk.Horizon.Server(config.network.horizonUrl);

  const issuerKp = StellarSdk.Keypair.fromSecret(keys.issuerSecretKey);

  console.log(`Target Issuer: ${issuerKp.publicKey()}`);
  console.log('Checking current issuer status on Horizon...');
  let issuerAccount = await server.loadAccount(issuerKp.publicKey());

  // Check if already locked
  const masterWeight = issuerAccount.signers.find((s) => s.key === issuerKp.publicKey())?.weight;
  if (masterWeight === 0) {
    console.log(' Issuer account is ALREADY LOCKED (master_weight = 0).');
    return;
  }

  console.log(`Current master key weight: ${masterWeight}`);
  console.log('Setting master key weight to 0...');

  // Set master key weight to 0
  const lockTx = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(
      StellarSdk.Operation.setOptions({
        masterWeight: 0,
        lowThreshold: 0,
        medThreshold: 0,
        highThreshold: 0,
      })
    )
    .setTimeout(30)
    .build();

  lockTx.sign(issuerKp);
  const result = await server.submitTransaction(lockTx);
  console.log(` Lock transaction submitted! Hash: ${result.hash}`);

  // Re-verify
  issuerAccount = await server.loadAccount(issuerKp.publicKey());
  const updatedWeight = issuerAccount.signers.find((s) => s.key === issuerKp.publicKey())?.weight;

  console.log(`\nVerified master key weight: ${updatedWeight}`);
  if (updatedWeight === 0) {
    console.log(' SUCCESS: Issuer account is permanently locked!');
    console.log('No additional tokens can ever be minted.');
    console.log('StellarExpert will now report: "Issuer account lock status: locked".');

    keys.issuerLocked = true;
    fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));
  } else {
    console.warn('Warning: Issuer account may not be locked properly.');
  }

  console.log('\n Step 4 complete!');
}

if (require.main === module) {
  lockIssuer().catch((err) => {
    console.error('Error locking issuer:', err);
    process.exit(1);
  });
}

module.exports = { lockIssuer };
