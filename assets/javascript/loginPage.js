const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
container.classList.remove('right-panel-active'));

//fetching the signup and login 

//signup(register) fetch 

const submit = document.getElementById('signup-form');

submit.addEventListener('submit', async(e) => {
    e.preventDefault();

const name = document.getElementById('signup-name').value;
const email = document.getElementById('signup-email').value;
const password = document.getElementById('signup-password').value;


    //constructing object 
    const data = {
        name,email,password
    };
    try{

    const response = await fetch('http://localhost:6001/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
    }
    const result = await response.json();
    console.log(result);
    if (result.redirect) {
        window.location.href = `${result.redirect}?email=${email}`;
    }
}catch(err){
    console.log("failed to fetch",err.message);
}
});



//Login fetch 

const login = document.getElementById('login-form');
login.addEventListener('submit', async(e) => {
    e.preventDefault();

    //fetching values
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    //constructing object 
    const data = {
        email,
        password,
    };
    try{
    const response = await fetch('http://localhost:6001/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
    }
    const userData = await response.json();
    console.log(userData);

        Swal.fire({
        title: "Login successfully!",
        text: "User logged successfully",
        icon: "info",
        showConfirmButton: false,
        timer: 2000
      });
    
      setTimeout(() => {
          if (userData.message === 'Login successful') {
              window.location.href = '/';
          }
      }, 2200);

}catch(err){
    console.log(err,"failed to fetch");
    Swal.fire({
        title: "Login failed!",
        text: err.message,
        icon: 'warning',
        confirmButtonText: "ok",
      })
}
});