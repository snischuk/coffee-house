function initSlider() {
    const bars = document.querySelectorAll('.favorites__slider-progress-bar');
    const slideContainer = document.querySelector('.favorites__slider-window');
    const track = document.querySelector('.favorites__slider-track');
    const prevBtn = document.querySelector('[data-slider-btn="prev"]');
    const nextBtn = document.querySelector('[data-slider-btn="next"]');

    let startPointerX;
    let currentSlideIndex = 0;
    const slideWidth = slideContainer.offsetWidth;

    function rollSliderTrack() {
        track.style.transform = `translateX(${-currentSlideIndex * slideWidth}px)`;
    }

    function resetBarAnimation() {
        bars[currentSlideIndex].removeEventListener('animationend', animationEndHandler);
        bars[currentSlideIndex].classList.remove('favorites__slider-progress-bar--animated');
    }

    function startBarAnimation() {
        bars[currentSlideIndex].classList.add('favorites__slider-progress-bar--animated');
        rollSliderTrack();
        bars[currentSlideIndex].addEventListener('animationend', animationEndHandler);
    }

    function animationEndHandler() {
        resetBarAnimation();
        currentSlideIndex += 1;

        if (currentSlideIndex > bars.length - 1) {
            currentSlideIndex = 0;
        }

        startBarAnimation();
    }

    function prevBar() {
        resetBarAnimation();

        currentSlideIndex -= 1;
        if (currentSlideIndex < 0) {
            currentSlideIndex = bars.length - 1;
        }

        startBarAnimation();
    }

    function nextBar() {
        resetBarAnimation();

        currentSlideIndex += 1;
        if (currentSlideIndex > bars.length - 1) {
            currentSlideIndex = 0;
        }

        startBarAnimation();
    }

    function keydownHandler(event) {
        if (event.key === 'ArrowLeft') {
            prevBar();
        }

        if (event.key === 'ArrowRight') {
            nextBar();
        }
    }

    function pauseAnimationOnHover() {
        bars[currentSlideIndex].style.animationPlayState = 'paused';
    }

    function resumeAnimationOnLeave() {
        bars[currentSlideIndex].style.animationPlayState = 'running';
    }

    function touchDownHandler(event) {
        startPointerX = event.touches[0].screenX;
    }

    function touchUpHandler(event) {
        const minSwipingDistance = 20;
        const currentPointerX = event.changedTouches[0].screenX;
        const swipingLength = currentPointerX - startPointerX;

        if (swipingLength > minSwipingDistance) {
            prevBar();
        }

        if (swipingLength < -minSwipingDistance) {
            nextBar();
        }
    }

    prevBtn.addEventListener('click', prevBar);
    nextBtn.addEventListener('click', nextBar);

    slideContainer.addEventListener('touchstart', touchDownHandler);
    slideContainer.addEventListener('touchend', touchUpHandler);

    slideContainer.addEventListener('pointerenter', pauseAnimationOnHover);
    slideContainer.addEventListener('pointerleave', resumeAnimationOnLeave);

    document.addEventListener('keydown', keydownHandler);

    startBarAnimation();
}

document.addEventListener('DOMContentLoaded', initSlider);