// DOM selection
const url = 'https://randomuser.me/api';
const btn = document.querySelector('button');
const avatar = document.querySelector('#avatar');
const fullname = document.querySelector('#fullname');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const city = document.querySelector('#city');
const nationalty = document.querySelector('#nationalty');



const handleErrors = res => {
    if (!res.ok) {
        throw Error(res.status);
    }

    return res.json();
};

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

const displayErr = err => {
    console.log(`You have a ${err} error`);

}


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