const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

const emailError = document.getElementById("email-message");
const passwordError = document.getElementById("password-message");

inputEmail.addEventListener("blur", function () {
  if (inputEmail.value.trim() === "") {
    emailError.classList.remove("active");
  }
});

inputPassword.addEventListener("blur", function () {
  if (inputPassword.value.trim() === "") {
    passwordError.classList.remove("active");
  }
});

function saveTokenAndCompleteAuth(response) {
    const token = response.headers.get("X-Token");

    if (!token) {
        throw new Error("Токен не найден");
    }

    localStorage.setItem("authToken", token);

    document.getElementById("popup-container").classList.add("complete");

    setTimeout(() => {                
        window.location.href = `https://www.dating.com/people/#token=${token}`;
    }, 1500);

    return;
}

function registerUser(data) {
    fetch("https://api.dating.com/identity", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            saveTokenAndCompleteAuth(response);
        }) 
        .catch(error => console.error("Ошибка регистрации:", error));

    return;
}

document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
    };

    let valid = true;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;

    // Валидация полей
    if (!emailPattern.test(email)) {
        emailError.classList.add("active");
        valid = false;
    } else {
        emailError.classList.remove("active");
    }
  
    if (password.length < 8) {
      passwordError.classList.add("active");
      valid = false;
    } else {
        passwordError.classList.remove("active");
    }
 
    if (!valid) return; 
    
    //Авторизация, регистрация    
    fetch("https://api.dating.com/identity", {
        method: "GET",
        headers: {
           "Authorization": "Basic " + btoa(email + ":" + password)
        }
    })
    .then(response => {
        if (response.ok) {
            saveTokenAndCompleteAuth(token);
        } else {
            registerUser(data);// Регистрируем пользователя
        }
    })
    .catch(error => {
        console.error("Ошибка авторизации:", error);
        registerUser(data);// Регистрируем пользователя
    });
});