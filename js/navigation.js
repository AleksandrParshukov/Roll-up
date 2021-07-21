const mainNavLinks = document.querySelectorAll('.main-nav__link');
const mainNavBtn = document.querySelector('.main-nav__button');
const mainNav = mainNavBtn.parentElement;
const mainNavList = mainNav.querySelector('.main-nav__list');
const navigationContainer = mainNav.parentElement;
const navigationContacts = navigationContainer.querySelector('.navigation__contacts');

mainNavLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    const target = document.querySelector(link.getAttribute('href'));
    evt.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
    });
    closeMenu();
  })
})

mainNavBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  mainNavBtn.classList.toggle('main-nav__button--open');
  mainNavList.classList.toggle('main-nav__list--open');
  navigationContainer.classList.toggle('navigation__container--open');
  navigationContacts.classList.toggle('navigation__contacts--open');

  if (document.querySelector('.main-nav__button--open')) {
    document.addEventListener('click', documentClickHandler);
  }
})


function documentClickHandler(evt) {
  evt.preventDefault();
  if (!navigationContainer.contains(evt.target)) {
    closeMenu();
  }
}

function closeMenu() {
  mainNavBtn.classList.remove('main-nav__button--open');
  mainNavList.classList.remove('main-nav__list--open');
  navigationContainer.classList.remove('navigation__container--open');
  navigationContacts.classList.remove('navigation__contacts--open');
  document.removeEventListener('click', documentClickHandler);
}