function initMap() {
    var location = { lat: 45.3499, lng: -75.7549 }; // Replace with the actual latitude and longitude of your location
    var map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 15,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function validateForm() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Simple validation
    if (name.trim() === '' || phone.trim() === '' || message.trim() === '') {
        alert('Name, phone number, and message are required fields.');
        return false;
    }

    // Phone number validation
    var phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }

    // Email validation
    if (email.trim() !== '') {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
    }

    // If all validations pass, you can submit the form or take further actions
    alert('Form submitted successfully!');

    // Reload the page
    location.reload();

    return true;
}
