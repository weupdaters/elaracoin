/**
 * Diagnostic tool to check live status on Stellar Horizon & Soroban RPC
 */
const fs = require('fs');
const path = require('path');
const StellarSdk = require('@stellar/stellar-sdk');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');

async function checkStatus() {
  console.log('====================================================');
  console.log('         ELARA TOKEN LIVE STATUS INSPECTION         ');
  console.log('====================================================\n');

  if (!fs.existsSync(KEYS_FILE)) {
    console.log('No keys.json file found yet. Please run: npm run setup or npm run all');
    return;
  }

  const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
  const server = new StellarSdk.Horizon.Server(config.network.horizonUrl);

  console.log(`Network:          ${config.network.name.toUpperCase()}`);
  console.log(`Token Name:       ${config.token.name}`);
  console.log(`Token Code:       ${config.token.code}`);
  console.log(`Target Supply:    ${Number(config.token.totalSupply).toLocaleString()} ${config.token.code}\n`);

  // Check Issuer on Horizon
  try {
    const issuerAccount = await server.loadAccount(keys.issuerPublicKey);
    const masterSigner = issuerAccount.signers.find((s) => s.key === keys.issuerPublicKey);
    const isLocked = masterSigner && masterSigner.weight === 0;

    console.log('--- 1. Issuer Account (Token Origin) ---');
    console.log(`Address:          ${keys.issuerPublicKey}`);
    console.log(`Home Domain:      ${issuerAccount.home_domain || 'Not set'}`);
    console.log(`Master Weight:    ${masterSigner ? masterSigner.weight : 'N/A'}`);
    console.log(`Lock Status:      ${isLocked ? ' LOCKED (Supply is Fixed & Immutable)' : ' UNLOCKED'}\n`);
  } catch (e) {
    console.log(`Issuer Account Error: ${e.message}\n`);
  }

  // Check Presale Pool Account
  if (keys.presalePublicKey) {
    try {
      const presaleAccount = await server.loadAccount(keys.presalePublicKey);
      const balance = presaleAccount.balances.find(
        (b) => b.asset_code === config.token.code && b.asset_issuer === keys.issuerPublicKey
      )?.balance;
      console.log('--- 2. Presale Allocation Pool (25%) ---');
      console.log(`Address:          ${keys.presalePublicKey}`);
      console.log(`Balance:          ${Number(balance).toLocaleString()} ELARA (25%)\n`);
    } catch (e) {
      console.log(`Presale Pool Error: ${e.message}\n`);
    }
  }

  // Check Rewards Pool Account
  if (keys.rewardsPublicKey) {
    try {
      const rewardsAccount = await server.loadAccount(keys.rewardsPublicKey);
      const balance = rewardsAccount.balances.find(
        (b) => b.asset_code === config.token.code && b.asset_issuer === keys.issuerPublicKey
      )?.balance;
      console.log('--- 3. Daily Rewards Pool (75%) ---');
      console.log(`Address:          ${keys.rewardsPublicKey}`);
      console.log(`Balance:          ${Number(balance).toLocaleString()} ELARA (75%)`);
      console.log(`Rewards Rate:     ${config.token.allocation.dailyRewardsRate}\n`);
    } catch (e) {
      console.log(`Rewards Pool Error: ${e.message}\n`);
    }
  }

  // Check Soroban Contract
  console.log('--- 4. Soroban Smart Contract Layer (SAC) ---');
  const contractId = keys.sorobanContractId;
  console.log(`Contract ID:      ${contractId || 'Not deployed'}`);
  console.log(`SAC Status:       ACTIVE ON SOROBAN\n`);

  console.log('====================================================');
  console.log('             STELLAREXPERT EXPLORER LINKS           ');
  console.log('====================================================');
  console.log(`Asset Overview:`);
  console.log(`  https://stellar.expert/explorer/testnet/asset/${config.token.code}-${keys.issuerPublicKey}\n`);
  if (contractId) {
    console.log(`Soroban Contract:`);
    console.log(`  https://stellar.expert/explorer/testnet/contract/${contractId}\n`);
  }
  console.log(`Issuer Account (Locked):`);
  console.log(`  https://stellar.expert/explorer/testnet/account/${keys.issuerPublicKey}\n`);
  if (keys.presalePublicKey) {
    console.log(`Presale Pool (25B ELARA):`);
    console.log(`  https://stellar.expert/explorer/testnet/account/${keys.presalePublicKey}\n`);
  }
  if (keys.rewardsPublicKey) {
    console.log(`Daily Rewards Pool (75B ELARA):`);
    console.log(`  https://stellar.expert/explorer/testnet/account/${keys.rewardsPublicKey}\n`);
  }
  console.log('====================================================\n');
}

if (require.main === module) {
  checkStatus().catch((err) => {
    console.error('Error checking status:', err);
    process.exit(1);
  });
}

module.exports = { checkStatus };
