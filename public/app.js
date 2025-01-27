async function processUserData(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    let response = await fetch('/login', {
        method: 'POST',
        body: URLSearchParams(formData)m
    });
    const data = await response.json();
    
    if(data.userError){
        const userError = document.getElementById('userError');
        userError.innerHTML= data.userError;
    }
    if(data.passwordError){
        const passwordError = document.getElementById('passwordError');
        passwordError.innerHTML= data.passwordError;
    }
    if(data.success){
        window.location.href = '/home';
    }
}