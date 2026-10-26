console.log('Its, Alive!');

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
    Theme:
    <select>
    <option value="light dark">Automatic</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    </select>
    </label>
    `
);

let select = document.querySelector('.color-scheme select');

// Read the saved preference when the page loads
if ('colorScheme' in localStorage) {
  document.documentElement.style.colorScheme =
    localStorage.colorScheme;

  select.value = localStorage.colorScheme;
}

// Save the preference when the user changes the theme
select.addEventListener('input', (event) => {
  localStorage.colorScheme = event.target.value;

  document.documentElement.style.colorScheme =
    event.target.value;
});

let form = document.querySelector('form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  let data = new FormData(form);
  let url = form.action + '?';

  for (let [name, value] of data) {
    url += `${name}=${encodeURIComponent(value)}&`;
  }

  location.href = url;
});


/*let navlinks = $$("nav a");

let currentlink = navlinks.find(
    (a) => a.host === location.host && a.pathname === location.
    pathname, );

if (currentlink !== undefined) {

    currentlink?.classList.add('current');

}*/

const BASE_PATH = location.hostname === 'localhost' 
|| location.hostname === '127.0.0.1'
    ? '/' // Local server
    : '/lab1_portfolio/'; // GitHub Pages repo name

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact'},
  { url: 'resume/', title: 'Resume'},
  { url: 'https://github.com/neerajaupasani/lab1_portfolio', 
    title: 'GitHub'}
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Create link and add it to nav
  
  url = !url.startsWith('http') ? BASE_PATH + url : url;

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  let current =
  a.host === location.host &&
  a.pathname === location.pathname;

  a.classList.toggle('current', current);

  a.toggleAttribute('aria-current', current);


  if (a.host !== location.host) {
    a.target = '_blank';
  }

  nav.append(a);

}








