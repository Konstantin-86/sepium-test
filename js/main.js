/**
 * main.js - с выбором материала и динамическими ценами
 */

document.addEventListener('DOMContentLoaded', () => {
    renderCards(products);
});

function renderCards(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = products.map(createCard).join('');

    initSliders();
    initModifications(); // добавляем инициализацию модификаций
}

function createCard(product) {
    // Находим активную модификацию для отображения цены
    const activeMod = product.modifications.find(m => m.isActive);

    const slides = product.images.map(img =>
        `<div class="swiper-slide"><img src="${img}" class="card__image"></div>`
    ).join('');

    const mods = product.modifications.map(m =>
        `<button class="card__mod-item ${m.isActive ? 'card__mod-item--active' : ''}" 
                data-price="${m.price}" 
                data-meter="${m.meter}">${m.name}</button>`
    ).join('');

    return `
        <div class="card" data-id="${product.id}">
            <div class="card__slider swiper">
                <div class="swiper-wrapper">${slides}</div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            
            <div class="card__content">
                <div class="card__header">
                    <span class="card__article">Арт. ${product.article}</span>
                    <button class="card__like">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ccc"/>
                        </svg>
                        <span>${product.likes}</span>
                    </button>
                </div>
                
                <h3 class="card__title">${product.title}</h3>
                
                <div class="card__mods">
                    <div class="card__mod-list">${mods}</div>
                </div>
                
                <div class="card__price">${activeMod.price}</div>
                <div class="card__price-meter">от ${activeMod.meter}</div>
                
                <a href="/calc" class="card__calc" target="_blank">Рассчитать стоимость</a>
                <button class="card__buy">Купить</button>
            </div>
        </div>
    `;
}

function initSliders() {
    if (!window.Swiper) return;

    const isMobile = window.innerWidth < 768;

    document.querySelectorAll('.card__slider').forEach(slider => {
        new Swiper(slider, {
            loop: true,
            autoplay: isMobile ? { delay: 3000 } : false,
            pagination: { el: slider.querySelector('.swiper-pagination'), clickable: true },
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev')
            }
        });
    });
}

function initModifications() {
    document.querySelectorAll('.card__mod-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            const card = btn.closest('.card');
            const modList = btn.closest('.card__mod-list');

            // Убираем активный класс у всех
            modList.querySelectorAll('.card__mod-item').forEach(b => {
                b.classList.remove('card__mod-item--active');
            });

            // Добавляем активный класс нажатой кнопке
            btn.classList.add('card__mod-item--active');

            // Обновляем цены
            const price = btn.dataset.price;
            const meter = btn.dataset.meter;

            card.querySelector('.card__price').textContent = price;
            card.querySelector('.card__price-meter').textContent = `от ${meter}`;
        });
    });
}

// Обновляем слайдеры при ресайзе
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(initSliders, 300);
});