# Elara (ELARA) Token on Stellar & Soroban

A complete toolset to issue, distribute, lock, and wrap the **Elara (`ELARA`)** token on Stellar and the Soroban Smart Contract Platform (Stellar Asset Contract - SAC), replicating the architecture seen on StellarExpert for tokens like AQUA and SHX.

---

## Token Specifications

- **Token Name**: Elara
- **Ticker / Code**: `ELARA`
- **Total Supply**: `100,000,000,000` (100 Billion)
- **Issuer Status**: **Locked** (Guarantees supply is permanently capped)
- **Allocations**:
  - **Presale**: 25% (`25,000,000,000 ELARA`)
  - **Rewards / Treasury**: 75% (`75,000,000,000 ELARA`)
  - **Holder Reward Rate**: 0.25% daily rewards to token holders
- **Soroban Integration**: Built-in Stellar Asset Contract (SAC) deployed to Soroban

---

## Quick Start: One-Click Execution

To deploy the entire token lifecycle automatically on Stellar Testnet:

```bash
node run_all.js
```

Or run step-by-step:

```bash
# Step 1: Generate Issuer & Distributor accounts and fund with Friendbot
node 01_setup_accounts.js

# Step 2: Set home domain, establish trustline, and mint 100B ELARA
node 02_mint_and_distribute.js

# Step 3: Deploy Soroban Stellar Asset Contract (generates C... address)
node 03_deploy_sac.js

# Step 4: Lock the Issuer account permanently (master key weight = 0)
node 04_lock_issuer.js

# Step 5: Generate .well-known/stellar.toml and .htaccess
node generate_toml.js

# Check live network status & view StellarExpert links
node check_status.js
```

---

## How to Customize Metadata & Description

The user can update the project metadata anytime:

1. **Token Description & Socials**:
   Open `config.js` and edit the `token.org` fields:
   ```javascript
   org: {
     name: 'Elara',
     dba: 'Elara Token',
     url: 'https://yourdomain.com',
     logo: 'https://yourdomain.com/assets/logo.png',
     email: 'contact@yourdomain.com',
     twitter: 'elara_token',
     telegram: 'https://t.me/elaratoken',
     description: 'Your finalized description here...',
   }
   ```
2. **Regenerate `stellar.toml`**:
   ```bash
   node generate_toml.js
   ```
3. Since this directory is `/Applications/XAMPP/xamppfiles/htdocs/elerea`, running Apache via XAMPP will automatically serve the file at:
   `http://localhost/elerea/.well-known/stellar.toml`
   When you connect your domain (e.g. `elerea.com`), it will be served at:
   `https://elerea.com/.well-known/stellar.toml`

---

## Files in this Repository

| File | Purpose |
| :--- | :--- |
| `config.js` | Central configuration for network, token parameters, allocations, and metadata |
| `01_setup_accounts.js` | Generates keypairs and funds them on Stellar Testnet |
| `02_mint_and_distribute.js` | Establishes trustlines and mints initial 100B supply |
| `03_deploy_sac.js` | Deploys the Soroban SAC wrapper (`C...` contract address) |
| `04_lock_issuer.js` | Locks the issuer account permanently (making supply immutable) |
| `generate_toml.js` | Builds the SEP-0001 `stellar.toml` file with your socials & logo |
| `check_status.js` | Displays balances, lock status, and direct StellarExpert links |
| `run_all.js` | Master script running the entire pipeline end-to-end |
| `keys.json` | Stores generated keys and contract addresses (Keep secret!) |
| `.well-known/stellar.toml` | SEP-0001 metadata file for StellarExpert and wallets |
| `.htaccess` | CORS header config for Apache / XAMPP |
