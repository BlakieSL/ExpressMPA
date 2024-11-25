document.addEventListener("DOMContentLoaded", async() => {
    document.querySelector("form").addEventListener("submit", async (event) => {
        await validateForm(event);
    })
})

const validateForm = async (event) => {
    console.log("here1");
    event.preventDefault();
    document.getElementById("errorMessage").textContent = "";

    let isValid = true;
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const birthday = document.getElementById("birthday").value;

    if(!validateNameLength(name)) {
        isValid = false;
        showError("Please enter a valid name >=2 && <=50");
    }

    if(!validateSurnameLength(surname)) {
        isValid = false;
        showError("Please enter a valid surname >=2 && <=50");
    }

    if (isValid) {
        await add(email, name, surname, birthday);
    }

}

const validateNameLength = (name) => {
    return name.length >= 2 && name.length <= 50;
}

const validateSurnameLength = (surname) => {
    return surname.length >= 2 && surname.length <= 50;
}

const showError = (message) => {
    document.getElementById("errorMessage").textContent = message;
}

const add = async (email, name, surname, birthday) => {
    try {
        const response = await axios.post('/actions/add', {
            email, name, surname, birthday
        });

        document.getElementById("email-output").textContent = email;
        document.getElementById("name-output").textContent = name;
        document.getElementById("surname-output").textContent = surname;
        document.getElementById("birthday-output").textContent = birthday;

    } catch (err) {
        showError(err.response?.data || "default error");
    }
}


