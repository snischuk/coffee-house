const burger = document.querySelector('.header__burger');
const links = document.querySelector('.header__links-wrapper');
const body = document.querySelector('body');


function clickBurgerHandler() {
    burger.classList.toggle('header__burger--active');
    links.classList.toggle('header__links-wrapper--active');
    body.classList.toggle('js-lock');

}

burger.addEventListener('click', clickBurgerHandler);