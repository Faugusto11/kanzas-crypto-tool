// Elements
const coin1Select = document.querySelector('.coin-1 select');
const coin2Select = document.querySelector('.coin-2 select');
const coin1Input = document.getElementById('price-coin');
const coin2Input = document.getElementById('price-coin-2');
const resultInput = document.getElementById('result-convert');

async function loadAvailableCoins() {
    try {
        // Show loading GIF
        document.querySelector('.loading').classList.remove('hidden');
        const response = await fetch('backend/get/getAvailableCoins.php');
        const data = await response.json();
        // Hide loading GIF and show calculator after loading coins
        document.getElementById('loadingGif').classList.add('hidden');
        document.querySelector('.calculator').classList.remove('hidden');

        if (data.success) {
            // Store data globally
            allCoins = data.coins.sort((a, b) => a.name.localeCompare(b.name)); // Sort coins by name
            tradingPairs = data.tradingPairs;
            coin1Select.innerHTML = allCoins.map(coin => `<option value="${coin.symbol}">${coin.name}</option>`).join('');
            coin1Select.value = 'BTC';
            coin1Input.value = '1.00';
            updateSecondSelect();
        }
    } catch (error) {
        console.error('Error loading coins:', error);
        resultInput.textContent = 'Error loading available coins.';
    }
}

function updateSecondSelect() {
    const validPairs = tradingPairs[coin1Select.value] || [];
    const sortedCoins = validPairs.map(symbol => {
        return allCoins.find(c => c.symbol === symbol);
    }).sort((a, b) => a.name.localeCompare(b.name)); // Sort pairs by name

    coin2Select.innerHTML = sortedCoins.map(coin => {
        return `<option value="${coin.symbol}">${coin.name}</option>`;
    }).join('');

    coin2Select.value = sortedCoins[0]?.symbol || ''; // Select the first pair or empty
    convertCurrency();
}

async function convertCurrency() {
    const coin1 = coin1Select.value;
    const coin2 = coin2Select.value;
    const amount = parseFloat(coin1Input.value) || 0;

    if (!coin2) {
        resultInput.textContent = 'Select a valid currency';
        coin2Input.value = '0.00';
        return;
    }

    try {
        const response = await fetch(`backend/get/getPrices.php?coin1=${coin1}&coin2=${coin2}`);
        const data = await response.json();

        if (data.success) {
            const total = (parseFloat(data.price) * amount).toFixed(2);
            coin2Input.value = total.toLocaleString(); // Add thousand separators
            resultInput.textContent = `${amount.toLocaleString()} ${coin1} = ${total.toLocaleString()} ${coin2}`; // Add thousand separators
        } else {
            resultInput.textContent = data.error;
            coin2Input.value = '0.00';
        }
    } catch (error) {
        console.error('Error:', error);
        resultInput.textContent = 'Error converting currencies. Try again.';
        coin2Input.value = '0.00';
    }
}

coin1Input.addEventListener('input', convertCurrency);
coin1Select.addEventListener('change', updateSecondSelect);
coin2Select.addEventListener('change', convertCurrency);

loadAvailableCoins();