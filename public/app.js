async function processUserData(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/login', {
        method: 'POST',
        body: new URLSearchParams(formData),
    });
    const data = await response.json();

    if (data.userError) {
        const userError = document.getElementById('usernameError');
        userError.innerHTML = data.userError;
    }
    if (data.passwordError) {
        const passwordError = document.getElementById('passwordError');
        passwordError.innerHTML = data.passwordError;
    }
    if (data.success) {
        alert('Success');
    }
}