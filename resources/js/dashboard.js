document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    loadProducts();


    function loadProducts() {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayProducts(data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке продуктов:', error);
            });
    }


    function displayProducts(products) {
        const productContainer = document.querySelector('.dataData');


        productContainer.innerHTML = '';


        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.dataset.productId = product.id;

            const statusMessage = product.status === 'available' ? 'Доступен' : '';
            let dataContent = '';
            for (const key in product.data) {
                if (Object.hasOwnProperty.call(product.data, key)) {
                    dataContent += `${key}: ${product.data[key]}<br>`;
                }
            }
            productElement.innerHTML = `
                <p class="productArticle">${product.article}</p>
                <p class="productName">${product.name}</p>
                <p class="productStatus">${statusMessage}</p>
                <p class="productAttribute">${dataContent}</p>
            `;
            productContainer.appendChild(productElement);
        });
        addClickHandlersToProducts();
    }


    const modal = document.querySelector('.modal');
    const addButton = document.querySelector('.btn');

    const closeButton = document.querySelector('.close');

    const addAttributeText = document.getElementById('addAttributeText');


    addButton.addEventListener('click', function() {

        modal.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {

        modal.style.display = 'none';
    });


    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });


    addAttributeText.addEventListener("click", function() {

        const attributeInput = document.createElement("div");
        attributeInput.setAttribute("id", "attributeInput");
        attributeInput.style.display = "none";


        const titleAtr = document.createElement("div");
        titleAtr.classList.add("titleAtr");


        const attributeNameLabel = document.createElement("label");
        attributeNameLabel.setAttribute("for", "attributeName");
        attributeNameLabel.textContent = "Название:";
        titleAtr.appendChild(attributeNameLabel);

        const attributeValueLabel = document.createElement("label");
        attributeValueLabel.setAttribute("for", "attributeValue");
        attributeValueLabel.textContent = "Значение:";
        titleAtr.appendChild(attributeValueLabel);


        const inputAtr = document.createElement("div");
        inputAtr.classList.add("inputAtr");


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


        attributeInput.appendChild(titleAtr);

        const deleteIcon = document.createElement("span");
        deleteIcon.textContent = "❌";
        deleteIcon.classList.add("deleteIcon");
        deleteIcon.addEventListener("click", function() {

            attributeInput.remove();
        });
        inputAtr.appendChild(deleteIcon);
        attributeInput.appendChild(inputAtr);

        const attributesHeader = document.querySelector('h3');

        attributesHeader.insertAdjacentElement('afterend', attributeInput);


        addAttribute();
    });


    function addAttribute() {
        var modalContent = document.querySelector('.modal-content');
        var modalHeight = modalContent.scrollHeight + 1;
        const attributeInput = document.getElementById('attributeInput');
        attributeInput.style.display = 'block';
    }


    const submitButton = document.querySelector('.submitPr');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const productForm = document.getElementById('productForm');
        const articleInput = document.getElementById('article');
        const nameInput = document.getElementById('name');


        const formData = new FormData(productForm);

        const attributeInputs = document.querySelectorAll('[name="attributeName"]');
        const attributes = {};
        attributeInputs.forEach(input => {
            const attributeName = input.value;
            const attributeValue = input.nextElementSibling.value;
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

                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                alert('Продукт успешно добавлен!');
                modal.style.display = 'none';
                articleInput.value = '';
                nameInput.value = '';
                loadProducts();
            })
            .catch(error => {
                alert(error.message);
            });
    });

    function addClickHandlersToProducts() {
        const productElements = document.querySelectorAll('.product');
        productElements.forEach(productElement => {
            productElement.removeEventListener('click', handleProductClick);
            productElement.addEventListener('click', handleProductClick);
        });
    }

    function handleProductClick() {
        console.log('Нажатие на продукт:', this);

        const productName = this.querySelector('.productName');
        const productArticle = this.querySelector('.productArticle');
        const productStatus = this.querySelector('.productStatus');
        const productAttribute = this.querySelector('.productAttribute');


        if (productName && productArticle && productStatus && productAttribute) {

            const modal = document.querySelector('.modalInfo');
            const modalContent = modal.querySelector('.modal-contentInfo');


            modalContent.innerHTML = '<span class="close2">&times;</span>';


            const titleContainer = document.createElement('div');
            titleContainer.classList.add('titleContainer');


            const titleElement = document.createElement('h1');
            titleElement.textContent = `${productName.textContent}`;
            titleContainer.appendChild(titleElement);


            const iconContainer = document.createElement('div');
            iconContainer.classList.add('iconContainer');


            const editIcon = document.createElement('span');
            editIcon.textContent = "✏️";
            editIcon.classList.add("editIcon");

            editIcon.addEventListener('click', function() {

                const modalEdit = document.querySelector('.modalEdit');
                modal.style.display ='none';
                modalEdit.style.display = 'block';
                window.addEventListener('click', function(event) {
                    if (event.target === modalEdit) {
                        modalEdit.style.display = 'none';
                    }
                });

                const editForm = document.getElementById('editProductForm');
                const editNameInput = document.getElementById('editName');
                const editArticleInput = document.getElementById('editArticle');
                const editStatusSelect = document.getElementById('editStatus');



                editNameInput.value = productName.textContent;
                editArticleInput.value = productArticle.textContent;
                editStatusSelect.value = productStatus.textContent.toLowerCase();


                const editAttributeContainer = document.getElementById('editAttributeContainer');



                for (const attributeName in productAttribute.dataset) {
                    const attributeValue = productAttribute.dataset[attributeName];
                    const attributeInput = document.createElement('div');
                    attributeInput.innerHTML = `
            <label for="edit${attributeName}">${attributeName}:</label>
            <input type="text" id="edit${attributeName}" name="edit${attributeName}" value="${attributeValue}">
        `;
                    editAttributeContainer.appendChild(attributeInput);
                }
            });
            iconContainer.appendChild(editIcon);


            const closeEditButton = document.querySelector('.closeEdit');
            closeEditButton.addEventListener('click', function() {
                const modalEdit = document.querySelector('.modalEdit');
                modalEdit.style.display = 'none';
            });




            const addEditAttributeButton = document.getElementById('addEditAttribute');
            addEditAttributeButton.addEventListener('click', function() {
                const editAttributeContainer = document.getElementById('editAttributeContainer');
                const newAttributeInput = document.createElement('div');
                newAttributeInput.classList.add('inputAtr');
                newAttributeInput.innerHTML = `
        <label for="editNewAttributeName">Название:</label>
        <input type="text" id="editNewAttributeName" name="editNewAttributeName" style="width: 40%;">
        <label for="editNewAttributeValue">Значение:</label>
        <input type="text" id="editNewAttributeValue" name="editNewAttributeValue" style="width: 40%;">
    `;
                editAttributeContainer.appendChild(newAttributeInput);
            });


            const editForm = document.getElementById('editProductForm');
            editForm.addEventListener('submit', function(event) {
                event.preventDefault();



                const formData = new FormData(editForm);
                const editData = {
                    data: {}
                };

                formData.forEach((value, key) => {

                    if (key.startsWith('edit') && (key.endsWith('Name') || key.endsWith('Value'))) {
                        const attributeName = key.slice(4, -4);
                        if (!editData.data[attributeName]) {
                            editData.data[attributeName] = '';
                        }
                        editData.data[attributeName] = value;
                    }

                    else {
                        if (value.trim() !== '') {
                            editData[key] = value;
                        }
                    }

                });




                if (Object.keys(editData).length > 0) {
                    fetch(`/api/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(editData)
                    })
                        .then(response => {
                            if (!response.ok) {
                                return response.json().then(data => {
                                    throw new Error(data.message);
                            })
                            }
                        })
                        .then(data => {
                            alert('Продукт успешно обновлен!');

                            const modalEdit = document.querySelector('.modalEdit');
                            modalEdit.style.display = 'none';

                            loadProducts();
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                } else {

                    alert('Заполните хотя бы одно поле для обновления продукта.');
                }
            });



            const closeIcon = document.createElement('span');
            closeIcon.textContent = "❌";
            closeIcon.classList.add("closeIcon");
            const productId = this.dataset.productId;
            closeIcon.dataset.id = productId;
            closeIcon.addEventListener('click', function() {
                const confirmDelete = confirm("Вы уверены, что хотите удалить этот продукт?");
                if (confirmDelete) {

                    fetch(`/api/products/${productId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            if (response.status === 204) {


                                alert('Продукт успешно удален!');
                                loadProducts();
                                modal.style.display = 'none';
                            } else {

                                throw new Error('Network response was not ok');
                            }
                        })
                        .catch(error => {
                            console.error('There was a problem deleting the product:', error);
                        });
                }
            });
            iconContainer.appendChild(closeIcon);


            titleContainer.appendChild(iconContainer);


            modalContent.appendChild(titleContainer);

            const nameElement = document.createElement('p');
            nameElement.textContent = `Название: ${productName.textContent}`;
            modalContent.appendChild(nameElement);

            const articleElement = document.createElement('p');
            articleElement.textContent = `Артикул: ${productArticle.textContent}`;
            modalContent.appendChild(articleElement);

            const statusElement = document.createElement('p');
            statusElement.textContent = `Cтатус: ${productStatus.textContent}`;
            modalContent.appendChild(statusElement);

            const attributeElement = document.createElement('p');
            attributeElement.textContent = `Атрибут: ${productAttribute.textContent}`;
            modalContent.appendChild(attributeElement);
            const closeButton2 = document.querySelector('.close2');

            modal.style.display = 'block';


            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

            closeButton2.addEventListener('click', function() {
                console.log('Нажатие на кнопку закрытия модального окна');
                modal.style.display = 'none';
            });
        }

    }
});
