// Wallet UI: basic MetaMask connection (works in browser with MetaMask)
async function connect() {
  const status = document.getElementById('status');
  const addrEl = document.getElementById('addr');
  const boEl = document.getElementById('boBalance');
  const walletInfo = document.getElementById('walletInfo');

  if (!window.ethereum) {
    status.innerText = "MetaMask not found";
    alert("MetaMask не найден. Установите расширение/мобильный кошелек.");
    return;
  }
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const addr = accounts[0];
    addrEl.innerText = addr;
    status.innerText = "Connected";
    walletInfo.style.display = "block";
    // BO balance retrieval would require ABI + token address (to be added after deploy)
    boEl.innerText = "—";
  } catch(e) {
    status.innerText = "Connection failed";
    console.error(e);
  }
}
document.getElementById('connectBtn').addEventListener('click', connect);
