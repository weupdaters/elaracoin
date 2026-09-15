/**
 * Deploy Stellar Asset Contract (SAC) on Soroban MAINNET
 * for ELARA token - GB3WVZRQB2MXRFD4J3JV3OZH5K6V7WPKIKVMONOKXN3QV2QTVHNMAGVG
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');

const KEYS_FILE = path.join(__dirname, 'keys.json');
const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));

// Ankr public RPC - confirmed working
const SOROBAN_RPC = 'https://rpc.ankr.com/stellar_soroban';
const NETWORK_PASSPHRASE = 'Public Global Stellar Network ; September 2015';

async function deploySACMainnet() {
  console.log('====================================================');
  console.log('   ELARA - SOROBAN SAC DEPLOY ON MAINNET');
  console.log('====================================================\n');

  const rpc = new StellarSdk.rpc.Server(SOROBAN_RPC);
  const distributorKp = StellarSdk.Keypair.fromSecret(keys.distributorSecretKey);
  const asset = new StellarSdk.Asset(keys.assetCode, keys.issuerPublicKey);

  // Calculate deterministic contract ID
  const expectedContractId = asset.contractId(StellarSdk.Networks.PUBLIC);
  console.log('Asset:               ', keys.assetCode);
  console.log('Issuer:              ', keys.issuerPublicKey);
  console.log('Expected Contract ID:', expectedContractId);
  console.log('Deployer:            ', distributorKp.publicKey());

  // Check if already deployed
  try {
    const contractData = await rpc.getContractData(
      expectedContractId,
      StellarSdk.xdr.ScVal.scvLedgerKeyContractInstance(),
      StellarSdk.rpc.Durability.Persistent
    );
    if (contractData) {
      console.log('\n✅ SAC already deployed on Mainnet Soroban!');
      console.log('Contract ID:', expectedContractId);
      saveSACToKeys(expectedContractId);
      return expectedContractId;
    }
  } catch (e) {
    console.log('Contract not yet deployed. Deploying now...');
  }

  // Load deployer account from Horizon (works for both Horizon & Soroban)
  console.log('\nLoading account from Horizon...');
  const horizonServer = new StellarSdk.Horizon.Server('https://horizon.stellar.org');
  const deployerAccount = await horizonServer.loadAccount(distributorKp.publicKey());

  // Build SAC deploy transaction
  const tx = new StellarSdk.TransactionBuilder(deployerAccount, {
    fee: '10000000', // 10 XLM max fee for Soroban
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(StellarSdk.Operation.createStellarAssetContract({ asset }))
    .setTimeout(120)
    .build();

  console.log('Simulating transaction...');
  const preparedTx = await rpc.prepareTransaction(tx);

  console.log('Signing transaction...');
  preparedTx.sign(distributorKp);

  console.log('Submitting to Soroban RPC...');
  const sendRes = await rpc.sendTransaction(preparedTx);
  console.log('Submission status:', sendRes.status, '| Hash:', sendRes.hash);

  if (sendRes.status === 'ERROR') {
    const errStr = JSON.stringify(sendRes);
    if (errStr.includes('existing') || errStr.includes('already') || errStr.includes('ContractError')) {
      console.log('✅ SAC already exists on Mainnet!');
      saveSACToKeys(expectedContractId);
      return expectedContractId;
    }
    throw new Error('SAC deploy failed: ' + errStr);
  }

  // Poll for confirmation
  console.log('\nWaiting for ledger confirmation...');
  let attempts = 0;
  while (attempts < 30) {
    await new Promise(r => setTimeout(r, 2000));
    const result = await rpc.getTransaction(sendRes.hash);
    if (result.status === 'SUCCESS') {
      console.log('\n====================================================');
      console.log('   SAC SUCCESSFULLY DEPLOYED ON SOROBAN MAINNET!');
      console.log('====================================================');
      console.log('Contract ID:', expectedContractId);
      console.log('Soroban Explorer:');
      console.log(`https://stellar.expert/explorer/public/contract/${expectedContractId}`);
      saveSACToKeys(expectedContractId);
      return expectedContractId;
    } else if (result.status === 'FAILED') {
      throw new Error('Transaction FAILED on ledger: ' + JSON.stringify(result));
    }
    attempts++;
    process.stdout.write('.');
  }
}

function saveSACToKeys(contractId) {
  const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
  keys.sorobanContractId = contractId;
  keys.sacDeployed = true;
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));
  console.log('\n✅ Contract ID saved to keys.json');
}

deploySACMainnet().catch(err => {
  const detail = err.response?.data?.extras || err.message;
  console.error('\n❌ ERROR:', typeof detail === 'object' ? JSON.stringify(detail, null, 2) : detail);
  process.exit(1);
});
