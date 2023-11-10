document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    // Placeholder for fetching news
});

function populateDropdowns() {
    const currencies = ["CAD", "USD", "GBP", "CNH", "JPY", "EUR", "INR", "HNL", "BDT", "AUD", "CHF", "BRL", "PHP", "OMR", "ZAR", "QAR", "MXN", "AED", "KRW", "SAR"];
    const dropdown1 = document.getElementById('currency1');
    const dropdown2 = document.getElementById('currency2');
    currencies.forEach(currency => {
        dropdown1.add(new Option(currency, currency));
        dropdown2.add(new Option(currency, currency));
    });
}

function convertCurrency() {
    // Placeholder for conversion functionality
    const conversionResult = document.getElementById('conversionResult');
    conversionResult.textContent = 'Conversion result will be displayed here.';
}
