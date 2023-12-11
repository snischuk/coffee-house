// function initModal(product) {

//     console.log('modasfsfsdfd', product);
//     const body = document.querySelector('body');
//     const backdrop = document.querySelector('.modal-backdrop');
//     const cards = document.querySelector('.menu__list-cards');

//     function createModalElement() {
//         return `

//         `;
//     }

//     function toggleModal(card) {
//         const { name, description, sizes, additives } = card
//         console.log(card, 'sdsdssdsdsa');
//     }



//     function clickedCardHandler(event) {

//         if (!backdrop.classList.contains('modal-backdrop--active')) return;
//         // if (event.target.tagName !== 'LI') return;

//         // body.classList.remove('js-lock');
//         // backdrop.classList.remove('modal-backdrop--active');
//         // cards.classList.remove('menu__list-cards--active');
//     }

//     function openModal(event) {
//         event.stopPropagation();

//         body.classList.add('js-lock');
//         backdrop.classList.add('modal-backdrop--active');
//         cards.classList.add('menu__list-cards--active');

//         // cards.addEventListener('click', clickedCardHandler, { once: true })
//         body.addEventListener('click', clickedCardHandler, { once: true })

//     }

//     // toggleModalHandler();
//     debugger;
//      if (product) openModal();
// }

// export default initModal;

function closeModal() {
    body.classList.remove('js-lock');
    backdrop.classList.remove('modal-backdrop--active');
}

function clickBodyHandler(event) {
    const targettedElement = event.target;

    if (targettedElement.matches('.modal__button-reset')) closeModal();
    if (targettedElement.matches('.modal-backdrop--active')) closeModal();
}
function createProductModal(product) {
    const imageNameWithHyphens = product.name.toLowerCase().replace(/\s+/g, '-');

    const sizeInputs = Object
        .entries(product.sizes)
        .map(([size, details]) => `
            <input class="modal__input-real visually-hidden" type="radio" name="size" value="${size}" id="size-${size}"${size === 's' ? ' checked' : ''}>
            <label class="modal__input-custom" for="size-${size}">
                <span class="modal__button-tag">${size.toUpperCase()}</span>${details.size}
            </label>
        `)
        .join('');

    const additiveInputs = product.additives
        .map((additive, index) => `
            <input class="modal__input-real visually-hidden" type="checkbox" name="additive" value="${additive.name}" id="additive-${index + 1}">
            <label class="modal__input-custom" for="additive-${index + 1}">
                <span class="modal__button-tag">${index + 1}</span>${additive.name}
            </label>
        `)
        .join('');

    return `
        <form class="modal">
            <div class="modal__image-wrapper">
                <img class="modal__image" src="./assets/images/menu/gallery/${imageNameWithHyphens}.jpeg" alt="${product.name}">
            </div>
            <div class="modal__content">
                <div class="modal__header">
                    <h3 class="modal__heading">${product.name}</h3>
                    <p class="modal__description">${product.description}</p>
                </div>
                <div class="modal__group">
                    <h4 class="modal__fieldset-name">Size</h4>
                    <fieldset class="modal__fieldset">
                        ${sizeInputs}
                    </fieldset>
                </div>
                <div class="modal__group">
                    <h4 class="modal__name">Additives</h4>
                    <fieldset class="modal__fieldset">
                        ${additiveInputs}
                    </fieldset>
                </div>
                <div class="modal__total">
                    <span class="modal__total__text">Total:</span>
                    <span class="modal__total__price">$${product.price}</span>
                </div>
                <span class="modal__info">
                    <svg class="modal__info-icon" width="40" height="16">
                        <use href="./assets/images/icons-sprite.svg#info"></use>
                    </svg>
                    <span class="modal__info-text">The cost is not final. Download our mobile app to see the final
                        price and place your order. Earn loyalty points and enjoy your favorite coffee with up to
                        20% discount.</span>
                </span>
                <button class="modal__button-reset" type="reset">Close</button>
            </div>
        </form>
    `;

}
function openModal(product) {
    clearContainer(backdrop);

    const productModal = createProductModal(product);
    backdrop.insertAdjacentHTML('afterBegin', productModal);

    body.classList.add('js-lock');
    backdrop.classList.add('modal-backdrop--active');

    body.addEventListener('click', clickBodyHandler)
}

export { openModal };