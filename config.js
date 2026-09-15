/**
 * Configuration for Elara (ELARA) Token on Stellar and Soroban
 */
require('dotenv').config();

module.exports = {
  network: {
    name: 'testnet',
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
    friendbotUrl: 'https://friendbot.stellar.org',
  },
  token: {
    name: 'Elara',
    code: 'ELARA',
    totalSupply: '100000000000', // 100,000,000,000 (100 Billion)
    decimals: 7,

    // Distribution breakdown
    allocation: {
      presalePercent: 25, // 25% (25 Billion ELARA)
      presaleAmount: '25000000000',
      dailyRewardsRate: '0.25% daily rewards to every token holder',
      treasuryPercent: 75,
      treasuryAmount: '75000000000',
    },

    // Organization & Project Metadata for SEP-0001 (stellar.toml)
    // NOTE: When launching to production, update homeDomain to your live domain (e.g. 'elerea.com')
    homeDomain: 'elerea.com',
    org: {
      name: 'Elara',
      dba: 'Elara Token',
      url: 'https://elerea.com',
      logo: 'https://elerea.com/assets/logo.png',
      email: 'contact@elerea.com',
      twitter: 'elara_token',
      telegram: 'https://t.me/elaratoken',
      // Description placeholder: Update this text whenever you want to finalize the project description!
      description: 'Elara is a next-generation token on Stellar and Soroban featuring 0.25% daily rewards to all holders, a 25% presale allocation, and full Soroban smart contract interoperability.',
    }
  }
};
