import './bootstrap';
document.addEventListener("DOMContentLoaded", function() {
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Ошибка при загрузке продуктов:', error);
        });
});

function displayProducts(products) {

    const productContainer = document.querySelector('.dataData');

    // Очищаем содержимое блока перед добавлением новых данных
    productContainer.innerHTML = '';

    // Добавляем данные о каждом продукте в блок
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <p>Артикул: ${product.article}</p>
            <p>Название: ${product.name}</p>
            <p>Статус: ${product.status}</p>
            <p>Атрибуты: ${product.data}</p>
        `;
        productContainer.appendChild(productElement);
    });
}
