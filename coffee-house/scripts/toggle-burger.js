const burger = document.querySelector(".header__burger");
const links = document.querySelector('.header__links-wrapper')

function clickBurgerHandler() {
    burger.classList.toggle("header__burger--active");
    links.classList.toggle('header__links-wrapper--active');
}

burger.addEventListener('click', clickBurgerHandler);