<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="{{ asset('public/css/auth.css') }}">
    <script src="{{ asset('public/js/auth.js') }}"></script>
</head>
<body>
<div class="container">
    <div class="card">
        <h1 class="card_title">Админ-панель</h1>
        <br>
        <form class="card_form" action="{{route('login')}}" method="POST">
            <div class="input">
                <input type="email" class="input_field" id="email" name="email" required />
                <label class="input_label">Email</label>
            </div>
            <div class="input">
                <input type="password" class="input_field" id="password" name="password" required />
                <label class="input_label">Password</label>
            </div>
            <button type="submit"  class="card_button" >Авторизоваться</button>
        </form>

    </div>
</div>
</body>
</html>
