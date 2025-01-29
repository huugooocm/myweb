async function processLog(event) {
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
        window.location.href = `/course/${data.user}`;
    }
}


async function processRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/register', {
        method: 'POST',
        body: new URLSearchParams(formData),
    });
    const data = await response.json();

    if (data.nameError) {
        const nameError = document.getElementById('nameError');
        nameError.innerHTML = data.nameError;
    }

    if (data.birthError) {
        const birthError = document.getElementById('birthError');
        birthError.innerHTML = data.birthError;
    }

    if (data.courseError) {
        const courseError = document.getElementById('courseError');
        courseError.innerHTML = data.courseError;
    }

    if (data.userError) {
        const userError = document.getElementById('usernameError');
        userError.innerHTML = data.userError;
        userError.style.color = 'red';
    }
    
    if (data.passwordError) {
        const passwordError = document.getElementById('passwordError');
        passwordError.innerHTML = data.passwordError;
    }

    if (data.repeatPasswordError) {
        const repeatPasswordError = document.getElementById('repeatPasswordError');
        repeatPasswordError.innerHTML = data.repeatPasswordError;
    }

    if (data.success) {
        window.location.href = '/';
    }
}

async function checkEmail(event) {
    const email = document.getElementById('username').value;
    console.log(email);
    const response = await fetch(`/checkEmail?email=${email}`);
    const data = await response.json();
    const userAlert = document.getElementById('usernameError');
    if(data.userError){
        userAlert.innerHTML = '';
        userAlert.innerHTML = data.userError;
        userAlert.style.color = 'red';
    }
    else if(!email){
        userAlert.innerHTML = '';
    }
    else{
        userAlert.innerHTML = '';
        userAlert.innerHTML = data.success;
        userAlert.style.color = 'green';
    }
}