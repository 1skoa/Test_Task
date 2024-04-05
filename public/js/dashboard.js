document.addEventListener("DOMContentLoaded", function() {
    // Получаем модальное окно
    const modal = document.querySelector('.modal');
    // Получаем кнопку "Добавить продукт"
    const addButton = document.querySelector('.btn');
    // Получаем кнопку закрытия модального окна
    const closeButton = document.querySelector('.close');
    // Получаем кнопку "Добавить атрибут"
    const addAttributeText = document.getElementById('addAttributeText');

    // Загрузка списка продуктов при загрузке страницы
    loadProducts();

    // Добавляем обработчик события клика на кнопку "Добавить продукт"
    addButton.addEventListener('click', function() {
        // Отображаем модальное окно
        modal.style.display = 'flex';
    });

    // Добавляем обработчик события клика на кнопку закрытия модального окна
    closeButton.addEventListener('click', function() {
        // Скрываем модальное окно
        modal.style.display = 'none';
    });

    // Добавляем обработчик события клика за пределами модального окна, чтобы закрыть его
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Добавляем обработчик события клика на кнопку "Добавить атрибут"
    addAttributeText.addEventListener("click", function() {
        // Вызываем функцию для добавления атрибута
        addAttribute();
    });

    // Функция для добавления атрибута
    function addAttribute() {
        // Ваш код для добавления атрибута
        resizeModal();
    }

    // Функция для изменения размера модального окна
    function resizeModal() {
        var modalContent = document.querySelector('.modal-content');
        var modalHeight = modalContent.scrollHeight + 1;

        modalContent.style.height = modalHeight + 'px';
    }

    // Функция для загрузки списка продуктов
    function loadProducts() {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Отобразить данные в консоли
                displayProducts(data); // Отобразить продукты на странице
            })
            .catch(error => {
                console.error('Ошибка при загрузке продуктов:', error);
            });
    }

    // Функция для отображения продуктов на странице
    function displayProducts(products) {
        const productContainer = document.querySelector('.dataData');

        // Очищаем содержимое блока перед добавлением новых данных
        productContainer.innerHTML = '';

        // Добавляем данные о каждом продукте в отдельный блок внизу друг друга
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            const dataMessage = product.data ? (product.data.color ? 'Цвет: ' + product.data.color : (product.data.size ? 'Размер: ' + product.data.size : 'Данные')) : 'Нет данных';

            // Если есть цвет, заменяем "color" на "Цвет"
            const colorMessage = product.data && product.data.color ? 'Цвет: ' + product.data.color : '';
            const sizeMessage = product.data && product.data.size ? 'Размер: ' + product.data.size : '';
            const statusMessage = product.status === 'available' ? 'Доступен' : '';
            productElement.innerHTML = `
                <p>${product.article}</p>
                <p>${product.name}</p>
                <p>${statusMessage}</p>
                <p>${colorMessage}<br>${sizeMessage}</p>
            `;
            productContainer.appendChild(productElement);
        });
    }

    // Добавляем обработчик события клика на кнопку "Добавить продукт"
    const submitButton = document.querySelector('.submitPr');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвратить стандартное действие кнопки

        const productForm = document.getElementById('productForm');

        // Собираем данные из формы
        const formData = new FormData(productForm);

        const productData = {
            name: formData.get('name'),
            article: formData.get('article'),
            status: formData.get('status'),
            data: {
                color: formData.get('color'), // Здесь нужно получить значение цвета из формы, если есть
                size: formData.get('size') // Здесь нужно получить значение размера из формы, если есть
            }
        };
        const token = localStorage.getItem('token');
        // Отправляем данные на сервер
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа от сервера (если необходимо)
                console.log(data);
                // Скрыть модальное окно
                modal.style.display = 'none';
                // Обновить список продуктов
                loadProducts();
            })
            .catch(error => {
                console.error('There was a problem adding the product:', error);
            });
    });
});
