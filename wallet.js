// wallet.js — minimal wallet integration (MetaMask)
const TOKEN_ADDRESS = "0xYOUR_DEPLOYED_TOKEN_ADDRESS"; // <- вставь адрес токена BO$
const TOKEN_ABI = [
  // минимальный фрагмент ABI для balanceOf и decimals и symbol
  {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
  {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},
  {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"}
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask не найден — установите расширение или мобильный кошелёк.");
    return;
  }
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    document.getElementById('address').innerText = address;
    await showTokenBalance(address);
  } catch (err) {
    console.error(err);
    alert("Ошибка подключения: " + (err.message || err));
  }
}

async function showTokenBalance(address) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const [decimals, symbol] = await Promise.all([ token.decimals(), token.symbol() ]);
    const raw = await token.balanceOf(address);
    const balance = Number(ethers.utils.formatUnits(raw, decimals));
    document.getElementById('balance').innerText = `${balance.toLocaleString()} ${symbol}`;
  } catch (err) {
    console.error(err);
    document.getElementById('balance').innerText = 'Ошибка получения баланса';
  }
}
