/**
 * Elara (ELARA) Frontend Application Logic
 */

const CONFIG = {
  assetCode: 'ELARA',
  issuerAddress: 'GCXS3E6W2UGTBKUXINHK4CI7J4OHNZEL4IGNUILMEOBGRAEONVJ5WZF6',
  contractId: 'CBFLQJDLMXI2LVDCDHBKNZJDAW5KMDOQN2WVAQ3TGGW6XQCHGUKGDVSR',
  presaleWallet: 'GCYTX2XZO6K2OK6GYXKUBOPRTPOP27DCSBOTP7YZCHDNA5EZN6SZVAHU',
  rewardsWallet: 'GCKDAEMMRZ3EARU7Q4DOMSOC4E3JZASFVWVJGUNXKFU6SMA7F4SFGX6L',
  horizonUrl: 'https://horizon-testnet.stellar.org',
  
  // Presale Rate: 1 XLM = 2,500 ELARA (Example presale pricing)
  xlmToElaraRate: 2500,
  dailyRewardRate: 0.0025, // 0.25%
};

let userPublicKey = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updatePresaleCalc();
  updateRewardsCalc();
});

function setupEventListeners() {
  // Wallet connect
  const btnConnect = document.getElementById('btn-connect');
  if (btnConnect) {
    btnConnect.addEventListener('click', connectWallet);
  }

  // Presale input
  const xlmInput = document.getElementById('presale-xlm');
  if (xlmInput) {
    xlmInput.addEventListener('input', updatePresaleCalc);
  }

  // Rewards calculator input
  const rewardInput = document.getElementById('reward-holdings');
  if (rewardInput) {
    rewardInput.addEventListener('input', updateRewardsCalc);
  }

  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const textToCopy = btn.getAttribute('data-copy');
      copyToClipboard(textToCopy);
    });
  });
}

// Wallet Connection via Freighter
async function connectWallet() {
  const btnConnect = document.getElementById('btn-connect');
  btnConnect.disabled = true;
  btnConnect.textContent = 'Connecting...';

  try {
    // Check if Freighter extension is available in browser
    if (typeof window.freighterApi !== 'undefined') {
      const isConnected = await window.freighterApi.isConnected();
      if (isConnected) {
        const key = await window.freighterApi.getPublicKey();
        if (key) {
          userPublicKey = key;
          onWalletConnected(key);
          return;
        }
      }
      // Request access
      const access = await window.freighterApi.requestAccess();
      if (access) {
        userPublicKey = access;
        onWalletConnected(access);
        return;
      }
    } else {
      // Fallback: Prompt user to install Freighter or enter address manually
      const manualKey = prompt('Freighter extension not detected. Enter your Stellar Testnet public key (G...) to view your balance:');
      if (manualKey && manualKey.startsWith('G') && manualKey.length === 56) {
        userPublicKey = manualKey;
        onWalletConnected(manualKey);
        return;
      } else if (manualKey) {
        alert('Invalid Stellar address format.');
      }
    }
  } catch (err) {
    console.error('Wallet connection error:', err);
    showToast('Failed to connect wallet: ' + err.message);
  } finally {
    if (!userPublicKey) {
      btnConnect.disabled = false;
      btnConnect.textContent = 'Connect Wallet';
    }
  }
}

async function onWalletConnected(publicKey) {
  const btnConnect = document.getElementById('btn-connect');
  const shortKey = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
  btnConnect.textContent = shortKey;
  btnConnect.classList.remove('btn-primary');
  btnConnect.classList.add('btn-secondary');

  showToast(`Connected: ${shortKey}`);
  await loadUserBalances(publicKey);
}

async function loadUserBalances(publicKey) {
  try {
    const res = await fetch(`${CONFIG.horizonUrl}/accounts/${publicKey}`);
    if (!res.ok) {
      console.log('Account not funded or not created on Testnet yet.');
      return;
    }
    const data = await res.json();
    const elaraBalanceObj = data.balances.find(
      (b) => b.asset_code === CONFIG.assetCode && b.asset_issuer === CONFIG.issuerAddress
    );
    const elaraBalance = elaraBalanceObj ? parseFloat(elaraBalanceObj.balance) : 0;

    const userBalanceElem = document.getElementById('user-elara-balance');
    if (userBalanceElem) {
      userBalanceElem.textContent = `${elaraBalance.toLocaleString()} ELARA`;
    }

    // Pre-fill user balance into rewards calculator
    if (elaraBalance > 0) {
      const rewardInput = document.getElementById('reward-holdings');
      if (rewardInput && (!rewardInput.value || rewardInput.value === '1000000')) {
        rewardInput.value = elaraBalance;
        updateRewardsCalc();
      }
    }
  } catch (err) {
    console.error('Failed to fetch account balance:', err);
  }
}

// Presale Calculator
function updatePresaleCalc() {
  const xlmInput = document.getElementById('presale-xlm');
  const elaraOutput = document.getElementById('presale-elara');
  const xlmAmount = parseFloat(xlmInput ? xlmInput.value : '0') || 0;

  const elaraAmount = xlmAmount * CONFIG.xlmToElaraRate;
  if (elaraOutput) {
    elaraOutput.textContent = elaraAmount.toLocaleString();
  }
}

// Rewards Calculator
function updateRewardsCalc() {
  const holdingsInput = document.getElementById('reward-holdings');
  const holdings = parseFloat(holdingsInput ? holdingsInput.value : '0') || 0;

  const daily = holdings * CONFIG.dailyRewardRate;
  const monthly = daily * 30;
  const yearly = daily * 365;

  const dailyElem = document.getElementById('calc-daily');
  const monthlyElem = document.getElementById('calc-monthly');
  const yearlyElem = document.getElementById('calc-yearly');

  if (dailyElem) dailyElem.textContent = `${daily.toLocaleString(undefined, { maximumFractionDigits: 2 })} ELARA`;
  if (monthlyElem) monthlyElem.textContent = `${monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })} ELARA`;
  if (yearlyElem) yearlyElem.textContent = `${yearly.toLocaleString(undefined, { maximumFractionDigits: 2 })} ELARA`;
}

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy');
  });
}

// Toast notification
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
