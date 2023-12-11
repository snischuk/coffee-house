import products from '../../assets/data/products.json' assert { type: "json" };
// import initModal from '../modal/modal.js'

function initTabs() {
    const tabsContainer = document.querySelector('.menu__buttons');
    const cardsContainer = document.querySelector('.menu__list-cards');
    const buttons = document.querySelectorAll('.menu__button');

    let filteredProducts;

    function clearContainer(container) {
        if (!container) return;
        container.innerHTML = '';
    }

    function createCardElement({ name, description, price }) {
        const imageNameWithHyphens = name.toLowerCase().replace(/\s+/g, '-');

        return `
            <li>
                <article class="menu__card card">
                    <div class="card__image-wrapper">
                        <img class="card__image" src="./assets/images/menu/gallery/${imageNameWithHyphens}.jpeg" alt="${name}">
                    </div>
                    <div class="card__info">
                        <h3 class="card__title">${name}</h3>
                        <p class="card__description">${description}</p>
                        <span class="card__price">$${price}</span>
                    </div>
                </article>
            </li>
        `;
    }

    function renderCards(container, cards) {
        clearContainer(container);

        const renderedCards = cards.map((card) => {
            const categoryCard = createCardElement(card);
            container.insertAdjacentHTML('beforeEnd', categoryCard);
            return categoryCard;
        });

        addLoadMoreBtn();

        return renderedCards;
    }

    function clickTabHandler(event) {
        const targetTab = event.target.closest('.menu__button');
        if (!targetTab) return;

        buttons.forEach((button) => {
            button.classList.remove('menu__button--active');
        });

        targetTab.classList.add('menu__button--active');

        const selectedCategory = targetTab.dataset.tab;
        filteredProducts = products.filter((product) => product.category === selectedCategory);

        renderCards(cardsContainer, filteredProducts);
    }

    const loadMoreBtn = document.querySelector('.menu__load-more-btn');

    function deleteLoadMoreBtn() {
        loadMoreBtn.style.display = 'none';
    }

    function clickLoadMoreBtnHandler() {
        const hiddenItems = document.querySelectorAll('.menu__list-cards li:nth-child(n + 5)');

        hiddenItems.forEach(item => {
            item.classList.add('show-more');
        });

        deleteLoadMoreBtn();
    }

    function addLoadMoreBtn() {
        const LIMIT_CARDS = 4;
        // проверить бедиа-видз Б 768 пикселей!
        if (filteredProducts.length > LIMIT_CARDS) {
            loadMoreBtn.style.display = 'flex';
        } else {
            loadMoreBtn.style.display = 'none';
        }

        loadMoreBtn.addEventListener('click', clickLoadMoreBtnHandler);

    }
    function clickCardHandler(event) {
        const targettedCard = event.target.closest('.menu__card');

        const titleElement = targettedCard.querySelector('.card__title');
        const titleText = titleElement.textContent;

        const findedProduct = filteredProducts.find((product) => product.name === titleText);

        openModal(findedProduct);
    }

    function setDefaultTab() {
        const defaultActiveTab = buttons[0];
        defaultActiveTab.classList.add('menu__button--active');

        const defaultCategory = defaultActiveTab.dataset.tab;
        filteredProducts = products.filter((product) => product.category === defaultCategory);

        renderCards(cardsContainer, filteredProducts);
    }
    //////////////////////////////////
    const body = document.querySelector('body');
    const backdrop = document.querySelector('.modal-backdrop');

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

    tabsContainer.addEventListener('click', clickTabHandler);
    cardsContainer.addEventListener('click', clickCardHandler);

    setDefaultTab();
}

document.addEventListener('DOMContentLoaded', initTabs);
