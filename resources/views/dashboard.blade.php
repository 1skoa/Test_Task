<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <script src="{{ asset('js/dashboard.js') }}"></script>
</head>
<body>
<!-- Общая секция -->
<section class="bg-calypso-50 min-h-screen flex">
    <!-- Боковое меню -->
    <div class="min-h-full p-4 float-left flex flex-col justify-between w-72 bg-calypso-700">
        <!-- Здесь вы можете добавить элементы вашего бокового меню, например, ссылки на разделы -->
        <h2>Продукты</h2>
        <ul>
        </ul>
    </div>

    <!-- Содержимое -->
    <div class="content">
        <div class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Добавить продукт</h2>

                <form id="productForm">
                    <div class ="form1" >
                    <!-- Поле ввода для артикула -->
                    <label for="article">Артикул:</label><br>
                    <input type="text" id="article" name="article" required><br>

                    <!-- Поле ввода для названия -->
                    <label for="name">Название:</label><br>
                    <input type="text" id="name" name="name" required ><br>

                    <!-- Поле для выбора статуса -->
                    <label for="status">Статус:</label><br>
                    <select id="status" name="status" required >
                        <option value="available">Доступен</option>
                        <option value="unavailable">Не доступен</option>
                    </select>
                    </div>
                    <div class="form2">
                    <h3>Атрибуты</h3>
                        <div id="attributeInput" style="display: none;">

                            <div class="titleAtr">
                                <label for="attributeName">Название:</label>
                                <label for="attributeValue">Значение:</label>
                            </div>
                            <div class="inputAtr">
                                <input type="text" id="attributeName1" name="attributeName" style="width: 40%; margin-right: 4%;"><br>
                                <input type="text" id="attributeValue1" name="attributeValue" style="width: 40%;"><br>
                            </div>
                        </div>

                <p id="addAttributeText" style="cursor: pointer;color: #0fc5ff;">+ Добавить атрибут</p>

                </div>
                    <button class = "submitPr" type="submit">Добавить</button>
                </form>
                <br>

            </div>
        </div>
        <!-- Первая колонка -->
        <div class="column columnName">
            <h2 class="activeText">ПРОДУКТЫ</h2>
{{--            <span class="activeText">ПРОДУКТЫ</span>--}}
            <h2 class="adminName">{{ Auth::user()->name }}</h2>
        </div>
        <button class="btn">Добавить</button>
        <!-- Вторая колонка -->
        <div class="column columnTitle">
            <div class ="nameData">
                <div class="titles">
            <p>АРТИКУЛ</p>
            <p>НАЗВАНИЕ</p>
            <p>СТАТУС</p>
            <p>АТРИБУТЫ</p>
            </div>

        </div>
        </div>

        <!-- Третья колонка -->
        <div class="column columnData">
            <div class ="dataData">
                <div class="product">
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                </div>
                </div>
            </div>
        </div>
</section>

</body>
</html>
