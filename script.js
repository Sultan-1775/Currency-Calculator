const convertButton = document.getElementById('convertButton');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const conversionResult = document.getElementById('conversionResult');

// API key from ExchangeRate-API or Fixer.io
const apiKey = 'e500c361b06d245907dacbb1';  // Replace with your API key

convertButton.addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert('Error retrieving currency data.');
            return;
        }

        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        conversionResult.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        alert('Error fetching data from the API.');
    }
}
