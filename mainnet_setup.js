/**
 * MAINNET DEPLOYMENT: ELARA Token on Stellar Public Network
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

// === YOUR DISTRIBUTOR WALLET (holds all 100B ELARA) ===
const DISTRIBUTOR_SECRET = 'SDD5CHC22RDLVGSB25SCXFCXTAL3K6VFXWGVAUNURQJBQP3ZDMO6QJIA';
const DISTRIBUTOR_PUBLIC = 'GC4ZGLPRXB4WAHPNAJOLRD2DSCMBK4OJL5KXNIHCYMPDJICPPGWK2O3D';

async function mainnetDeploy() {
  console.log('====================================================');
  console.log('   ELARA TOKEN - STELLAR MAINNET DEPLOYMENT');
  console.log('====================================================\n');

  const server = new StellarSdk.Horizon.Server(config.network.horizonUrl);
  const networkPassphrase = config.network.networkPassphrase;

  const distributorKp = StellarSdk.Keypair.fromSecret(DISTRIBUTOR_SECRET);

  // Step 1: Generate fresh Issuer keypair
  console.log('--- Step 1: Generating Issuer Keypair ---');
  const issuerKp = StellarSdk.Keypair.random();
  console.log('Issuer Public Key:', issuerKp.publicKey());
  const asset = new StellarSdk.Asset(config.token.code, issuerKp.publicKey());

  // Step 2: Fund Issuer (2 XLM) from Distributor
  console.log('\n--- Step 2: Funding Issuer with 2 XLM ---');
  let distAccount = await server.loadAccount(distributorKp.publicKey());
  const fundTx = new StellarSdk.TransactionBuilder(distAccount, {
    fee: '1000',
    networkPassphrase,
  })
    .addOperation(StellarSdk.Operation.createAccount({
      destination: issuerKp.publicKey(),
      startingBalance: '2',
    }))
    .setTimeout(60)
    .build();
  fundTx.sign(distributorKp);
  const fundRes = await server.submitTransaction(fundTx);
  console.log('Issuer funded! Hash:', fundRes.hash);

  // Step 3: Set Home Domain on Issuer
  console.log('\n--- Step 3: Setting Home Domain (elaracoin.online) ---');
  let issuerAccount = await server.loadAccount(issuerKp.publicKey());
  const domainTx = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: '1000',
    networkPassphrase,
  })
    .addOperation(StellarSdk.Operation.setOptions({
      homeDomain: 'elaracoin.online',
    }))
    .setTimeout(60)
    .build();
  domainTx.sign(issuerKp);
  await server.submitTransaction(domainTx);
  console.log('Home domain set: elaracoin.online');

  // Step 4: Establish Trustline on Distributor
  console.log('\n--- Step 4: Establishing Trustline for 100B ELARA ---');
  distAccount = await server.loadAccount(distributorKp.publicKey());
  const trustTx = new StellarSdk.TransactionBuilder(distAccount, {
    fee: '1000',
    networkPassphrase,
  })
    .addOperation(StellarSdk.Operation.changeTrust({
      asset: asset,
      limit: config.token.totalSupply,
    }))
    .setTimeout(60)
    .build();
  trustTx.sign(distributorKp);
  await server.submitTransaction(trustTx);
  console.log('Trustline established!');

  // Step 5: Mint 100B ELARA to Distributor
  console.log('\n--- Step 5: Minting 100,000,000,000 ELARA ---');
  issuerAccount = await server.loadAccount(issuerKp.publicKey());
  const mintTx = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: '1000',
    networkPassphrase,
  })
    .addOperation(StellarSdk.Operation.payment({
      destination: distributorKp.publicKey(),
      asset: asset,
      amount: config.token.totalSupply,
    }))
    .setTimeout(60)
    .build();
  mintTx.sign(issuerKp);
  const mintRes = await server.submitTransaction(mintTx);
  console.log('100B ELARA MINTED! Hash:', mintRes.hash);

  // Step 6: Lock Issuer permanently
  console.log('\n--- Step 6: Locking Issuer (Supply Permanently Capped) ---');
  issuerAccount = await server.loadAccount(issuerKp.publicKey());
  const lockTx = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: '1000',
    networkPassphrase,
  })
    .addOperation(StellarSdk.Operation.setOptions({
      masterWeight: 0,
      lowThreshold: 0,
      medThreshold: 0,
      highThreshold: 0,
    }))
    .setTimeout(60)
    .build();
  lockTx.sign(issuerKp);
  await server.submitTransaction(lockTx);
  console.log('Issuer LOCKED! No more tokens can ever be minted.');

  // Save keys
  const keys = {
    network: 'public',
    assetCode: 'ELARA',
    issuerPublicKey: issuerKp.publicKey(),
    issuerSecretKey: issuerKp.secret(),
    issuerLocked: true,
    distributorPublicKey: distributorKp.publicKey(),
    distributorSecretKey: DISTRIBUTOR_SECRET,
    createdAt: new Date().toISOString(),
  };
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));

  console.log('\n====================================================');
  console.log('   SUCCESS! ELARA IS LIVE ON STELLAR MAINNET!');
  console.log('====================================================');
  console.log('\nToken Code:  ELARA');
  console.log('Supply:      100,000,000,000 ELARA');
  console.log('Network:     Stellar Mainnet');
  console.log('Home Domain: elaracoin.online');
  console.log('\nIssuer:     ', issuerKp.publicKey());
  console.log('Distributor:', distributorKp.publicKey());
  console.log('\n--- StellarExpert Links ---');
  console.log('Token:', `https://stellar.expert/explorer/public/asset/ELARA-${issuerKp.publicKey()}`);
  console.log('Issuer:', `https://stellar.expert/explorer/public/account/${issuerKp.publicKey()}`);
  console.log('Distributor:', `https://stellar.expert/explorer/public/account/${distributorKp.publicKey()}`);
}

mainnetDeploy().catch(err => {
  const detail = err.response?.data?.extras?.result_codes || err.message;
  console.error('\nERROR:', JSON.stringify(detail, null, 2));
  process.exit(1);
});
