/**
 * Master Deployment Pipeline for Elara (ELARA) Token on Stellar and Soroban
 */
const { setupAccounts } = require('./01_setup_accounts');
const { mintAndDistribute } = require('./02_mint_and_distribute');
const { deploySAC } = require('./03_deploy_sac');
const { lockIssuer } = require('./04_lock_issuer');
const { generateToml } = require('./generate_toml');
const { checkStatus } = require('./check_status');

async function runPipeline() {
  console.log('****************************************************');
  console.log('  STARTING ELARA TOKEN DEPLOYMENT ON SOROBAN / STELLAR ');
  console.log('****************************************************\n');

  try {
    // 1. Setup & Fund Accounts
    await setupAccounts();
    console.log('\n----------------------------------------------------\n');

    // 2. Set Domain, Trustline, and Mint 100B Supply
    await mintAndDistribute();
    console.log('\n----------------------------------------------------\n');

    // 3. Deploy Soroban Stellar Asset Contract (SAC)
    await deploySAC();
    console.log('\n----------------------------------------------------\n');

    // 4. Lock Issuer Account (Guarantees Fixed Immutable Supply)
    await lockIssuer();
    console.log('\n----------------------------------------------------\n');

    // 5. Generate SEP-0001 stellar.toml and .htaccess
    generateToml();
    console.log('\n----------------------------------------------------\n');

    // 6. Inspect Final Status & Show StellarExpert Links
    await checkStatus();

    console.log('****************************************************');
    console.log('   ELARA TOKEN SUCCESSFULLY CREATED AND DEPLOYED!   ');
    console.log('****************************************************');
  } catch (error) {
    console.error('\n❌ Pipeline execution failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runPipeline();
}

module.exports = { runPipeline };
