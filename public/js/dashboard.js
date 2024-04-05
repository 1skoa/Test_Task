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

        const attributeInput = document.createElement("div");
        attributeInput.setAttribute("id", "attributeInput");
        attributeInput.style.display = "none";

        // Создаем контейнер для заголовка атрибутов
        const titleAtr = document.createElement("div");
        titleAtr.classList.add("titleAtr");

        // Создаем заголовки для атрибутов
        const attributeNameLabel = document.createElement("label");
        attributeNameLabel.setAttribute("for", "attributeName");
        attributeNameLabel.textContent = "Название:";
        titleAtr.appendChild(attributeNameLabel);

        const attributeValueLabel = document.createElement("label");
        attributeValueLabel.setAttribute("for", "attributeValue");
        attributeValueLabel.textContent = "Значение:";
        titleAtr.appendChild(attributeValueLabel);

        // Создаем контейнер для полей ввода атрибутов
        const inputAtr = document.createElement("div");
        inputAtr.classList.add("inputAtr");

        // Создаем поля ввода атрибутов
        const attributeNameInput = document.createElement("input");
        attributeNameInput.setAttribute("type", "text");
        attributeNameInput.setAttribute("id", "attributeName");
        attributeNameInput.setAttribute("name", "attributeName");
        attributeNameInput.style.width = "40%";
        attributeNameInput.style.marginRight = "4%";
        inputAtr.appendChild(attributeNameInput);

        const attributeValueInput = document.createElement("input");
        attributeValueInput.setAttribute("type", "text");
        attributeValueInput.setAttribute("id", "attributeValue");
        attributeValueInput.setAttribute("name", "attributeValue");
        attributeValueInput.style.width = "40%";
        inputAtr.appendChild(attributeValueInput);

        // Добавляем заголовок и поля ввода в контейнер атрибутов
        attributeInput.appendChild(titleAtr);
        attributeInput.appendChild(inputAtr);

        // Находим элемент с заголовком "Атрибуты"
        const attributesHeader = document.querySelector('h3');
        // Вставляем созданный контейнер атрибутов после заголовка "Атрибуты"
        attributesHeader.insertAdjacentElement('afterend', attributeInput);

        // Вызываем функцию для добавления атрибута
        addAttribute();
    });

    // Функция для добавления атрибута
    function addAttribute() {

        resizeModal();
    }

    // Функция для изменения размера модального окна
    function resizeModal() {
        var modalContent = document.querySelector('.modal-content');
        var modalHeight = modalContent.scrollHeight + 1;
        const attributeInput = document.getElementById('attributeInput');
        attributeInput.style.display = 'block';
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

            const statusMessage = product.status === 'available' ? 'Доступен' : '';
            let dataContent = '';
            for (const key in product.data) {
                if (Object.hasOwnProperty.call(product.data, key)) {
                    dataContent += `${key}: ${product.data[key]}<br>`;
                }
            }
            productElement.innerHTML = `
                <p>${product.article}</p>
                <p>${product.name}</p>
                <p>${statusMessage}</p>
                <p>${dataContent}</p>
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

            const attributeInputs = document.querySelectorAll('[name="attributeName"]');
            const attributes = {};
            attributeInputs.forEach(input => {
                const attributeName = input.value;
                const attributeValue = input.nextElementSibling.value; // Получаем значение следующего элемента (значения атрибута)
                if (attributeName.trim() !== '' && attributeValue.trim() !== '') {
                    attributes[attributeName] = attributeValue;
                }
            });

        const productData = {
            name: formData.get('name'),
            article: formData.get('article'),
            status: formData.get('status'),
            data: attributes
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
