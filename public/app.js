async function processLog(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/login', {
        method: 'POST',
        body: new URLSearchParams(formData),
    });
    const data = await response.json();
    const userError = document.getElementById('usernameError');
    userError.innerHTML ="";
    const passwordError = document.getElementById('passwordError');
    passwordError.innerHTML = "";

    if (data.userError) {
        userError.innerHTML = data.userError;
    }
    if (data.passwordError) {
        passwordError.innerHTML = data.passwordError;
    }
    if (data.success) {
        window.location.href = `/course/${data.user}`;
    }
}

clearSignUpAlerts = () => {
    const nameError = document.getElementById('nameError');
    nameError.innerHTML = '';
    const birthError = document.getElementById('birthError');
    birthError.innerHTML = '';
    const courseError = document.getElementById('courseError');
    courseError.innerHTML = '';
    const userError = document.getElementById('usernameError');
    userError.innerHTML = '';
    const passwordError = document.getElementById('passwordError');
    passwordError.innerHTML = '';
    const repeatPasswordError = document.getElementById('repeatPasswordError');
    repeatPasswordError.innerHTML = '';
}

async function processRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/register', {
        method: 'POST',
        body: new URLSearchParams(formData),
    });
    const data = await response.json();
    clearSignUpAlerts();

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

async function checkEmail() {
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

function togglePasswordVisibility(){
    const password= document.getElementById('password');
    const button= document.getElementById('togglePasswordIcon');
    if(password.type==='password'){
        password.type='text';
        button.innerHTML=`<i class="bi bi-eye-fill text-muted" id="togglePasswordIcon"></i>`
    }
    else{
        password.type='password';
        button.innerHTML=`<i class="bi bi-eye-slash-fill text-muted" id="togglePasswordIcon"></i>`
    }
}

function toggleRepeatPasswordVisibility(){
    const password= document.getElementById('repeatPassword');
    const button= document.getElementById('toggleRepeatPasswordIcon');
    if(password.type==='password'){
        password.type='text';
        button.innerHTML=`<i class="bi bi-eye-fill text-muted" id="togglePasswordIcon"></i>`
    }
    else{
        password.type='password';
        button.innerHTML=`<i class="bi bi-eye-slash-fill text-muted" id="togglePasswordIcon"></i>`
    }
}

function clearUserAlert(){
    const userAlert = document.getElementById('usernameError');
    userAlert.innerHTML = '';
}