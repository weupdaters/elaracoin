/**
 * Generates SEP-0001 stellar.toml and .htaccess in the web directory
 */
const fs = require('fs');
const path = require('path');
const config = require('./config');

const KEYS_FILE = path.join(__dirname, 'keys.json');
const WELL_KNOWN_DIR = path.join(__dirname, '.well-known');
const TOML_PATH = path.join(WELL_KNOWN_DIR, 'stellar.toml');
const HTACCESS_PATH = path.join(__dirname, '.htaccess');

function generateToml() {
  console.log('=== Generating stellar.toml (SEP-0001) & .htaccess ===\n');

  let issuerKey = 'REPLACE_WITH_ISSUER_PUBLIC_KEY';
  let contractId = 'REPLACE_WITH_SOROBAN_CONTRACT_ID';
  let presaleKey = '';
  let rewardsKey = '';

  if (fs.existsSync(KEYS_FILE)) {
    const keys = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
    issuerKey = keys.issuerPublicKey || issuerKey;
    contractId = keys.sorobanContractId || contractId;
    presaleKey = keys.presalePublicKey || '';
    rewardsKey = keys.rewardsPublicKey || '';
  }

  if (!fs.existsSync(WELL_KNOWN_DIR)) {
    fs.mkdirSync(WELL_KNOWN_DIR, { recursive: true });
  }

  const tomlContent = `# Stellar.toml for Elara (ELARA)
# Standard: SEP-0001 (https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0001.md)

# --- Organization Information ---
# Loaded directly by StellarExpert under the "Organization" tab
[DOCUMENTATION]
ORG_NAME = "${config.token.org.name}"
ORG_DBA = "${config.token.org.dba}"
ORG_URL = "${config.token.org.url}"
ORG_LOGO = "${config.token.org.logo}"
ORG_DESCRIPTION = "${config.token.org.description}"
ORG_OFFICIAL_EMAIL = "${config.token.org.email}"
ORG_SUPPORT_EMAIL = "${config.token.org.email}"
ORG_TWITTER = "${config.token.org.twitter}"
ORG_TELEGRAM = "${config.token.org.telegram}"

# --- Token Definition ---
[[CURRENCIES]]
code = "${config.token.code}"
issuer = "${issuerKey}"
contract = "${contractId}"
name = "${config.token.name}"
desc = "Elara (ELARA) - 100 Billion locked supply. 25% Presale allocation (${config.token.allocation.presaleAmount} ELARA). Features ${config.token.allocation.dailyRewardsRate}."
display_decimals = ${config.token.decimals}
fixed_number = ${config.token.totalSupply}
max_number = ${config.token.totalSupply}
is_asset_minting_completed = true
image = "${config.token.org.logo}"
status = "live"
anchor_asset_type = "other"

# --- Official Verified Accounts (Tagged on StellarExpert) ---
[[ACCOUNTS]]
public_key = "${issuerKey}"
desc = "Elara Issuer Account (Locked - Master Key Weight 0)"

${presaleKey ? `[[ACCOUNTS]]\npublic_key = "${presaleKey}"\ndesc = "Elara 25% Presale Pool (25,000,000,000 ELARA)"\n` : ''}
${rewardsKey ? `[[ACCOUNTS]]\npublic_key = "${rewardsKey}"\ndesc = "Elara 75% Daily Rewards Pool (75,000,000,000 ELARA - 0.25% daily rewards to holders)"\n` : ''}

# --- Project Principals ---
[PRINCIPALS]
name = "${config.token.org.name} Core Team"
email = "${config.token.org.email}"
`;

  fs.writeFileSync(TOML_PATH, tomlContent);
  console.log(` Created: ${TOML_PATH}`);

  // Create .htaccess for Apache / XAMPP to serve CORS headers
  const htaccessContent = `# Allow CORS for stellar.toml so StellarExpert and wallets can read metadata
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>

<Files "stellar.toml">
    ForceType text/plain
</Files>
`;

  fs.writeFileSync(HTACCESS_PATH, htaccessContent);
  console.log(` Created: ${HTACCESS_PATH}`);
  console.log('\n stellar.toml & .htaccess updated successfully!');
}

if (require.main === module) {
  generateToml();
}

module.exports = { generateToml };
