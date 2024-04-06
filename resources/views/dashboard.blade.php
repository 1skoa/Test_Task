<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="{{ asset('/css/dashboard.css') }}">
    <script src="{{ asset('/js/dashboard.js') }}"></script>

</head>
<body>
<section class="bg-calypso-50 min-h-screen flex">
    <div class="min-h-full p-4 float-left flex flex-col justify-between w-72 bg-calypso-700">
        <h2>Продукты</h2>
        <ul>
        </ul>
    </div>
    <div class="content">
        <div class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Добавить продукт</h2>

                <form id="productForm" >
                    <div class ="form1" >
                    <label for="article">Артикул:</label><br>
                        <input type="text" id="article" name="article" required minlength="10"><br>

                    <label for="name">Название:</label><br>
                    <input type="text" id="name" name="name" required ><br>

                    <label for="status">Статус:</label><br>
                    <select id="status" name="status" required >
                        <option value="available">Доступен</option>
                        <option value="unavailable">Не доступен</option>
                    </select>
                    </div>
                    <div class="form2">
                    <h3>Атрибуты</h3>
{{--                        <div id="attributeInput" style="display: none;">--}}

{{--                            <div class="titleAtr">--}}
{{--                                <label for="attributeName">Название:</label>--}}
{{--                                <label for="attributeValue">Значение:</label>--}}
{{--                            </div>--}}
{{--                            <div class="inputAtr">--}}
{{--                                <input type="text" id="attributeName1" name="attributeName" style="width: 40%; margin-right: 4%;"><br>--}}
{{--                                <input type="text" id="attributeValue1" name="attributeValue" style="width: 40%;"><br>--}}
{{--                            </div>--}}
{{--                        </div>--}}

                <p id="addAttributeText" style="cursor: pointer;color: #0fc5ff;">+ Добавить атрибут</p>

                </div>
                    <button class = "submitPr" type="submit">Добавить</button>
                </form>
                <br>

            </div>
        </div>



        <div class="modalEdit">
            <div class="modal-contentEdit">
                <span class="closeEdit">&times;</span>
                <h2>Редактировать продукт</h2>
                <form id="editProductForm">
                    <div class ="editForm" >
                    <label for="editName">Название:</label>
                    <input type="text" id="editName" name="name">
                    <label for="editArticle">Артикул:</label>
                    <input type="text" id="editArticle" name="article">
                    <label for="editStatus">Статус:</label>
                    <select id="editStatus" name="status">
                        <option value="available">Доступен</option>
                        <option value="unavailable">Недоступен</option>
                    </select>
                    <h3>Атрибуты</h3>
                        <div class="form2">
                    <div id="editAttributeContainer">
                        <p id="addEditAttribute" style="cursor: pointer;color: #0fc5ff;">+ Добавить атрибут</p>
                    </div>
                    </div>
                        </div>
                    <button type="submit" class="submitPr">Сохранить</button>
                </form>
            </div>
        </div>

        <div class="modalInfo">

            <div class="modal-contentInfo">
                <span class="close2">&times;</span>
                <br>
            </div>
        </div>
        <div class="column columnName">
            <h2 class="activeText">ПРОДУКТЫ</h2>
{{--            <span class="activeText">ПРОДУКТЫ</span>--}}
{{--            <h2 class="adminName">{{ Auth::user()->name }}</h2>--}}
        </div>
        <button class="btn">Добавить</button>
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
        <div class="column columnData">
            <div class ="dataData">
            <div class ="data">
                <div class="product">

                </div>
                </div>
                </div>
            </div>
        </div>
</section>
</body>
</html>
