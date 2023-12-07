function initBurgerMenu() {
    const burger = document.querySelector('.header__burger');
    const links = document.querySelector('.header__links-wrapper');
    const body = document.querySelector('body');

    function clickedLinkHandler(event){
        if(!burger.classList.contains('header__burger--active')) return;
        if (event.target.tagName !== 'A') return;

        burger.classList.remove('header__burger--active');
        body.classList.remove('js-lock');
        links.classList.remove('header__links-wrapper--active');
    }

    function toggleBurgerHandler() {
        burger.classList.toggle('header__burger--active');
        links.classList.toggle('header__links-wrapper--active');
        body.classList.toggle('js-lock');

        links.addEventListener('click', clickedLinkHandler, { once: true })
    }
    
    burger.addEventListener('click', toggleBurgerHandler);
}

document.addEventListener('DOMContentLoaded', initBurgerMenu)