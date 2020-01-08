// Service worker registration
let newWorker;
function showUpdateBar() {
    let snackbar = document.getElementById('snackbar');
    snackbar.className = 'show';
}
// The click event on the notification
document.querySelector('#reload').addEventListener('click', () => {
    newWorker.postMessage({
        action: 'skipWaiting'
    });
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', event => {
        // Register the service worker
        navigator.serviceWorker.register('../sw.js')
            .then(reg => {
                reg.addEventListener('updatefound', () => {
                    // An updated service worker has appeared in reg.installing!
                    newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        // Has service worker state changed?
                        switch (newWorker.state) {
                            case 'installed':
                                // There is a new service worker available, show the notification
                                if (navigator.serviceWorker.controller) {
                                    let notification = document.getElementById(
                                        'notification ');
                                    notification.className = 'show';
                                }
                                break;
                        }
                    });
                });
                console.log('Service worker registered ', reg);
            })
            .catch(err => {
                console.log('Service worker registration failed', err);
            })
    })
}
let refreshing;
// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
});


// DOM selection
const url = 'https://randomuser.me/api';
const btn = document.querySelector('button');
const avatar = document.querySelector('#avatar');
const fullname = document.querySelector('#fullname');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const city = document.querySelector('#city');
const nationalty = document.querySelector('#nationalty');


// Errors handling and JSON parsing 
const handleErrors = res => {
    if (!res.ok) {
        throw Error(res.status);
    }

    return res.json();
};

// DOM manipulation
const updateProfile = data => {
    console.log(data);
    let userAvatar = (data.results[0].picture.medium);
    let name = (
        `${data.results[0].name.first} ${data.results[0].name.last}`
    );
    let loginUsername = (data.results[0].login.username);
    let userEmail = (data.results[0].email);
    let userCity = (data.results[0].location.city);
    let userNationalty = (data.results[0].nat);


    avatar.src = userAvatar;
    fullname.innerHTML = name;
    username.textContent = loginUsername;
    email.textContent = userEmail;
    city.textContent = userCity;
    nationalty.textContent = userNationalty;
};

// Displaying errors
const displayErr = err => {
    console.log(`You have a ${err} error`);

};

// Updating profile on button click
btn.addEventListener('click', function () {
    fetch(url)
        .then(handleErrors)
        .then(updateProfile)
        .catch(displayErr);
});



        // fetch(url)
        // .then(handleErrors)
        // .then(parseJSON)
        // .then(updateProfile)
        // .catch(printError)