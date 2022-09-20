import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector(".feedback-form input"),
    textarea: document.querySelector(".feedback-form textarea"),
};

refs.form.addEventListener('submit', onFormSubmit);
// refs.form.addEventListener('input', onFormInput);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.textarea.addEventListener('input', throttle(onMessageInput, 500));

function onEmailInput(e) {
    localStorage.setItem("email", e.target.value);
    console.log(e);
}

function onMessageInput(e) {
    localStorage.setItem("message", e.target.value);
    console.log(e);
}
console.log(localStorage);

function fillForm() {
    const emailValue = localStorage.getItem("email");
    const messageValue = localStorage.getItem("message");
    
    if (emailValue) {
        refs.email.value = emailValue;
    }
    if (messageValue) {
        refs.textarea.value = messageValue;
    }
}
fillForm();

function onFormSubmit(e) {
    e.preventDefault();
    console.log("send form");
    
    e.currentTarget.reset();
    localStorage.removeItem("email")
    localStorage.removeItem("message")
};