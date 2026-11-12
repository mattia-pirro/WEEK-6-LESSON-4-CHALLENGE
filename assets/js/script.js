const prodotti = [
    {
        id: 1,
        titolo: 'Sneaker Run',
        info: 'Scarpa per la corsa con suola in gomma traspirante.',
        prezzo: '€89,00',
        categoria: 'Scarpe',
    },
    {
        id: 2,
        titolo: 'T-shirt Basic',
        info: 'T-shirt in cotone, taglio regolare, 5 colori disponibili.',
        prezzo: '€19,00',
        categoria: 'Abbigliamento',
    },
    {
        id: 3,
        titolo: 'Borsa City',
        info: 'Borsa in tessuto con una tasca interna e cinghia regolabile.',
        prezzo: '€49,00',
        categoria: 'Valigeria',
    },
    {
        id: 4,
        titolo: 'Cintura in pelle',
        info: 'Cinture elegante in pelle di coccodrillo, fibbia satinata.',
        prezzo: '€59,00',
        categoria: 'Accessori',
    },
    {
        id: 5,
        titolo: 'Sandali Estate',
        info: 'Sandalo in pelle con plantare anatomico, ideali d\'estate.',
        prezzo: '€29,00',
        categoria: 'Scarpe',
    },
    {
        id: 6,
        titolo: 'Felpa Hoodie',
        info: 'Felpa con cappuccio, tessuto morbidoe, tasca a marsupio.',
        prezzo: '€39,00',
        categoria: 'Abbigliamento',
    },
    {
        id: 7,
        titolo: 'Trolley Rigidi',
        info: 'Trolley rigido in polipropilene con 4 ruote piroettanti.',
        prezzo: '€79,00',
        categoria: 'Valigeria',
    },
    {
        id: 8,
        titolo: 'Orologio in acciaio',
        info: 'Orologio con cronografo in acciaio e quadrante blu.',
        prezzo: '€109,00',
        categoria: 'Accessori',
    }
];

const carousel = [
    {
        id: 1,
        titolo: 'Saldi di primavera',
        info: 'Fino al 50% di sconto sui prodotti in evidenza',
        sfondo: 'bg-success',
        colore: 'text-light',
    },
    {
        id: 2,
        titolo: 'Nuova Collezione',
        info: 'Scopri tutti i nuovi prodotti del nostro shop',
        sfondo: 'bg-dark',
        colore: 'text-light',
    },
    {
        id: 3,
        titolo: 'Spedizioni Gratuite',
        info: 'Per gli acquisti sopra i 50€ su tutto il sito',
        sfondo: 'bg-light',
        colore: 'text-dark',
    }
];

const coloriCategorie = {
    'Scarpe': 'goldenrod',
    'Abbigliamento': 'cornflowerblue',
    'Valigeria': 'rebeccapurple',
    'Accessori': 'brown',
};

const carouselInner = document.querySelector('.carousel-inner');
const btnClose = document.getElementById('toggle-tema');
const products = document.getElementById('products');
const filtri = document.querySelectorAll('.filtri');
const bodyPage = document.body;
let categorySelected = 'Tutti';

const shuffledProducts = [...prodotti].sort(() => Math.random() - 0.5);

function renderCarousel() {
    carouselInner.textContent = '';
    const shuffledCarousel = [...carousel].sort(() => Math.random() - 0.5);

    shuffledCarousel.forEach((slide, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item', slide.sfondo, 'py-5');

        if (index === 0) {
            carouselItem.classList.add('active');
        }

        const container = document.createElement('div');
        container.classList.add('container', 'text-center');

        const h2 = document.createElement('h2');
        h2.classList.add(slide.colore, 'fs-1', 'fw-bold', 'mb-3');
        h2.textContent = slide.titolo;

        const paragraph = document.createElement('p');
        paragraph.classList.add(slide.colore, 'fs-5');
        paragraph.textContent = slide.info;

        container.appendChild(h2);
        container.appendChild(paragraph);
        carouselItem.appendChild(container);
        carouselInner.appendChild(carouselItem);
    });
};

renderCarousel();

function renderProducts() {
    products.textContent = '';
    let prodottiFiltrati = [];

    if (categorySelected === 'Tutti') {
        prodottiFiltrati = shuffledProducts;
    } else {
        prodottiFiltrati = shuffledProducts.filter(function (prod) {
            return prod.categoria === categorySelected;
        });
    }

    prodottiFiltrati.forEach(prodotto => {
        const article = document.createElement('article');
        article.classList.add('col-12', 'col-sm-6', 'col-xl-4', 'col-xxl-3');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'p-0', 'bg-light', 'rounded');
        cardDiv.style.borderTopWidth = '4px';
        cardDiv.style.borderTopStyle = 'solid';
        cardDiv.style.borderTopColor = coloriCategorie[prodotto.categoria];

        const img = document.createElement('img');
        img.classList.add('card-img-top', 'rounded-0', 'border-bottom');
        img.setAttribute('src', `https://placehold.co/300x180/F8F9FA/212529?text=${prodotto.titolo}`);
        img.setAttribute('alt', prodotto.titolo);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');

        const cardContent = document.createElement('div');

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title', 'fs-5');
        cardTitle.textContent = prodotto.titolo;
        cardTitle.style.color = coloriCategorie[prodotto.categoria];

        const cardInfo = document.createElement('p');
        cardInfo.classList.add('card-info', 'card-text', 'text-muted');
        cardInfo.textContent = prodotto.info;

        const cardPrice = document.createElement('p');
        cardPrice.classList.add('card-price', 'card-text', 'fs-5', 'fw-bold');
        cardPrice.textContent = prodotto.prezzo;

        const button = document.createElement('button');
        button.classList.add('dettagli', 'border-0', 'btn', 'btn-success', 'mt-4', 'w-100', 'text-white');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#myModal');
        button.textContent = 'Dettagli';

        button.addEventListener('click', () => {
            const modalImg = document.querySelector('.modal-img');
            const modalTitle = document.querySelector('.modal-title');
            const modalInfo = document.querySelector('.modal-info');
            const modalPrice = document.querySelector('.modal-price');

            modalImg.setAttribute('src', `https://placehold.co/600x300/F8F9FA/212529?text=${prodotto.titolo}`);
            modalImg.setAttribute('alt', prodotto.titolo);
            modalTitle.textContent = prodotto.titolo;
            modalInfo.textContent = prodotto.info;
            modalPrice.textContent = prodotto.prezzo;

            modalTitle.style.color = coloriCategorie[prodotto.categoria];
        });

        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardInfo);
        cardContent.appendChild(cardPrice);

        cardBody.appendChild(cardContent);
        cardBody.appendChild(button);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        article.appendChild(cardDiv);
        products.appendChild(article);
    });
};

renderProducts();

filtri.forEach(function (button) {
    button.addEventListener('click', function () {

        filtri.forEach(function (btn) {
            btn.classList.remove('selected');
        });

        button.classList.add('selected');
        categorySelected = button.textContent.trim();
        renderProducts();
    });
});

btnClose.addEventListener('click', () => {
    bodyPage.classList.toggle('dark');

    if (bodyPage.classList.contains('dark')) {
        btnClose.textContent = 'Tema chiaro';
    } else {
        btnClose.textContent = 'Tema scuro';
    }
});