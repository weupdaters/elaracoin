/**
 * Step 3: Deploy the Stellar Asset Contract (SAC) wrapper on Soroban
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

async function deploySAC() {
  console.log('=== Step 3: Deploying Soroban Stellar Asset Contract (SAC) ===\n');

  if (!fs.existsSync(KEYS_FILE)) {
    throw new Error('keys.json not found! Please run 01_setup_accounts.js first.');
  }

  const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
  const rpc = new StellarSdk.rpc.Server(config.network.sorobanRpcUrl);

  const distributorKp = StellarSdk.Keypair.fromSecret(keys.distributorSecretKey);
  const asset = new StellarSdk.Asset(config.token.code, keys.issuerPublicKey);
  const expectedContractId = asset.contractId(StellarSdk.Networks.TESTNET);

  console.log(`Asset:                ${config.token.code}`);
  console.log(`Issuer:               ${keys.issuerPublicKey}`);
  console.log(`Expected Contract ID: ${expectedContractId}`);
  console.log(`Deployer Account:     ${distributorKp.publicKey()}\n`);

  console.log('Loading deployer account from Soroban RPC...');
  const deployerAccount = await rpc.getAccount(distributorKp.publicKey());

  const tx = new StellarSdk.TransactionBuilder(deployerAccount, {
    fee: '1000',
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(StellarSdk.Operation.createStellarAssetContract({ asset }))
    .setTimeout(60)
    .build();

  console.log('Simulating and preparing Soroban transaction...');
  const preparedTx = await rpc.prepareTransaction(tx);

  console.log('Signing transaction with deployer key...');
  preparedTx.sign(distributorKp);

  console.log('Submitting to Soroban RPC...');
  const sendRes = await rpc.sendTransaction(preparedTx);
  console.log(`Submission status: ${sendRes.status} (Transaction Hash: ${sendRes.hash})`);

  if (sendRes.status === 'ERROR') {
    // Check if contract already exists
    if (JSON.stringify(sendRes).includes('existing') || JSON.stringify(sendRes).includes('already')) {
      console.log('SAC contract is already deployed on Soroban!');
    } else {
      throw new Error(`Transaction submission error: ${JSON.stringify(sendRes.errorResult || sendRes)}`);
    }
  } else {
    console.log('Polling for confirmation on ledger...');
    const result = await rpc.pollTransaction(sendRes.hash, { attempts: 20, delay: 1500 });
    console.log(`Transaction status: ${result.status}`);
  }

  // Update keys.json with verified contract ID
  keys.sorobanContractId = expectedContractId;
  keys.sacDeployed = true;
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));

  console.log('\n Soroban Stellar Asset Contract (SAC) is LIVE!');
  console.log(`Contract ID: ${expectedContractId}`);
  console.log(`StellarExpert Explorer: https://stellar.expert/explorer/testnet/contract/${expectedContractId}`);
  console.log('\n Step 3 complete! Ready for Step 4 (Lock Issuer & Metadata).');
  return expectedContractId;
}

if (require.main === module) {
  deploySAC().catch((err) => {
    console.error('Error deploying SAC:', err);
    process.exit(1);
  });
}

module.exports = { deploySAC };
