document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(loginForm);

        fetch('/api/auth/login', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Save token to local storage
                localStorage.setItem('token', data.token);

                // Redirect to dashboard
                window.location.href = '/dashboard';
            })
            .catch(error => {
                console.error('There was a problem with the login:', error);
                document.getElementById('errors').innerHTML = '<div class="alert alert-danger">There was a problem with the login. Please try again.</div>';
            });
    });
});
