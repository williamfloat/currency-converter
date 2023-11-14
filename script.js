document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    // Other initializations can be added here if needed
});

// API Headers
const apiHeaders = new Headers({
    "apikey": "59xJt3cWsHVuXKtJAgO9a2RgMDVC6Gwy"
});

// Populating Dropdowns with Currency Options
function populateDropdowns() {
    const currencies = ["CAD", "USD", "GBP",  "JPY", "EUR", "INR", "HNL", "BDT", "AUD", "CHF", "BRL", "PHP", "OMR", "ZAR", "QAR", "MXN", "AED", "KRW", "SAR"];
    const dropdown1 = document.getElementById('currency1');
    const dropdown2 = document.getElementById('currency2');
    currencies.forEach(currency => {
        dropdown1.add(new Option(currency, currency));
        dropdown2.add(new Option(currency, currency));
    });
}

// Function to Convert Currency Using the API
function convertCurrency() {
    const fromCurrency = document.getElementById('currency1').value;
    const toCurrency = document.getElementById('currency2').value;
    const amount = 1; // This can be dynamic based on user input

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: apiHeaders
    };

    fetch(`https://api.apilayer.com/currency_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result); // For debugging
            // Update the conversion result on the webpage
            const resultElement = document.getElementById('conversionResult');
            if (result.success) {
                resultElement.textContent = `1 ${fromCurrency} = ${result.result} ${toCurrency}`;
            } else {
                resultElement.textContent = 'Conversion failed. Please try again.';
            }
        })
        .catch(error => console.error('Error converting currency:', error));
}

//////////News feed/////////////////
// Replace 'YOUR_RSS_FEED_URL' with the actual RSS feed URL
const rssFeedUrl = 'http://feeds.bbci.co.uk/news/rss.xml';
const maxCount = 10;

// Fetch the RSS feed
fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`)
    .then(response => response.json())
    .then(data => {
        // Display the news feed
        const feedContainer = document.getElementById('newsFeed');
        data.items.slice(0, maxCount).forEach(item => {
            const article = document.createElement('div');
            article.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p id="dateFeed">${item.pubDate}</p>
                <a href="${item.link}" target="_blank">Read more</a><br>
                ------------------------------------
            `;
            feedContainer.appendChild(article);
        });
    })
    .catch(error => console.error('Error fetching RSS feed:', error));