const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validateInput = (email, name, surname, birthday) =>
    validateRequired(email, name, surname, birthday) && validateEmail(email) && validateBirthday(birthday);

const validateRequired = (email, name, surname, birthday) => email && name && surname && birthday;
const validateEmail = (email) => emailPattern.test(email);

const validateBirthday = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();

    return isValidBirthDateFormat(birthDate) && isAdult(birthDate, today);
}

const isValidBirthDateFormat = (birthDate) => {
    return !isNaN(birthDate);
}

const isAdult = (birthDate, today) => {
    const age = today.getFullYear() - birthDate.getFullYear() -
        (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);
    return age >= 18;
}

module.exports = { validateInput };