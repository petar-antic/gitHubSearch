let body = document.querySelector('body');
let toggle = document.querySelector('.toggle');
let toggleImg = document.querySelector('.toggleImg');
let modeName = document.querySelector('.modeName');
let form = document.querySelector('.searchForm');
let input = document.querySelector('input');
let error = document.querySelector('.error');

let profilePicture = document.querySelector('.profilePicture');
let profileName = document.querySelector('.profileName');
let profileUrl = document.querySelector('.profileUrl');
let joinDate = document.querySelector('.joinDate');

let biography = document.querySelector('.biography');

let repos = document.querySelector('.reposNum');
let followers = document.querySelector('.followersNum');
let following = document.querySelector('.followingNum');

let place = document.querySelector('.place');
let website = document.querySelector('.website');
let twitter = document.querySelector('.twitter');
let firm = document.querySelector('.company');

let placeSvg = document.querySelector('.placeSvg');
let websiteSvg = document.querySelector('.websiteSvg');
let twitterSvg = document.querySelector('.twitterSvg');
let firmSvg = document.querySelector('.companySvg');

toggle.addEventListener('click', (e) => {
    if (body.classList.value === 'dark') {
        body.classList.remove('dark');
        modeName.innerHTML = 'Dark';
        toggleImg.innerHTML =
            '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill="#697C9A" fill-rule="nonzero"/></svg>';
    } else {
        body.classList.add('dark');
        modeName.innerHTML = 'Light';
        toggleImg.innerHTML =
            '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/></g></svg>';
    }
});

document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
        error.innerHTML = '&nbsp;';
        input.value = '';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${input.value}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data.login) {
                error.innerHTML = 'No results';
            } else {
                profilePicture.src = data.avatar_url;
                if (!data.name) {
                    profileName.innerHTML = data.login;
                } else {
                    profileName.innerHTML = data.name;
                }
                profileUrl.innerHTML = data.html_url;
                joinDate.innerHTML = `${showDate(data.created_at)}`;

                if (data.bio === null) {
                    biography.innerHTML = 'Not Available';
                } else {
                    biography.innerHTML = data.bio;
                }

                repos.innerHTML = data.public_repos;
                followers.innerHTML = data.followers;
                following.innerHTML = data.following;

                if (data.location === null) {
                    place.innerHTML = 'Not Available';
                    place.classList.add('notAvailable');
                    placeSvg.classList.add('notAvailable');
                } else {
                    placeSvg.classList.remove('notAvailable');
                    place.classList.remove('notAvailable');
                    place.innerHTML = data.location;
                }

                if (data.blog === '') {
                    website.innerHTML = 'Not Available';
                    website.classList.add('notAvailable');
                    websiteSvg.classList.add('notAvailable');
                } else {
                    websiteSvg.classList.remove('notAvailable');
                    website.classList.remove('notAvailable');
                    website.innerHTML = data.blog;
                }

                if (data.twitter_username === null) {
                    twitter.innerHTML = 'Not Available';
                    twitter.classList.add('notAvailable');
                    twitterSvg.classList.add('notAvailable');
                } else {
                    twitterSvg.classList.remove('notAvailable');
                    twitter.classList.remove('notAvailable');
                    twitter.innerHTML = data.twitter_username;
                }

                if (data.company === null) {
                    firm.innerHTML = 'Not Available';
                    firm.classList.add('notAvailable');
                    firmSvg.classList.add('notAvailable');
                } else {
                    firmSvg.classList.remove('notAvailable');
                    firm.classList.remove('notAvailable');
                    firm.innerHTML = data.company;
                }
            }
        });
});

const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

let showDate = function (date) {
    let newDate = new Date(date);
    let mon = months[newDate.getMonth()];

    return `Joined: ${newDate.getDate()} ${mon} ${newDate.getUTCFullYear()}`;
};
