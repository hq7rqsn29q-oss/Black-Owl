document.getElementById('search').addEventListener('click', ()=> {
  const tx = document.getElementById('tx').value.trim();
  document.getElementById('result').innerText = "Demo: search for " + tx;
});