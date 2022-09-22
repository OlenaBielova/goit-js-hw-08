'use strict';
import throttle from "lodash.throttle";
import { save, load, remove } from "./storage";

const formRef = document.querySelector(".feedback-form");
const LOCAL_STORAGE_KEY = 'feedback-form-state';


fillForm();

const onFormInput = (e) => {
    const { name, value } = e.target;

    let savedData = load(LOCAL_STORAGE_KEY);
    savedData = savedData ? savedData : {};

    savedData[name] = value;
        
    save(LOCAL_STORAGE_KEY, savedData);
}

const trottledOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', trottledOnFormInput);

function fillForm() {
    const savedData = load(LOCAL_STORAGE_KEY);
    console.log(savedData);
    if(!savedData) {
        return;
    }
Object.entries(savedData).forEach(([key, value]) => {
        formRef.elements[key].value = value;
    }); 
};

const onFormSubmit = e => {
    e.preventDefault();
    const {
        elements: { email, message }
    } = e.currentTarget;

    e.currentTarget.reset();
    remove(LOCAL_STORAGE_KEY);
}

formRef.addEventListener('submit', onFormSubmit);



// варіант рішення з окремим ключем для кожного інпута
// const refs = {
//     form: document.querySelector(".feedback-form"),
//     email: document.querySelector(".feedback-form input"),
//     textarea: document.querySelector(".feedback-form textarea"),
// };

// refs.form.addEventListener('submit', onFormSubmit);
// refs.email.addEventListener('input', throttle(onEmailInput, 500));
// refs.textarea.addEventListener('input', throttle(onMessageInput, 500));

// function onEmailInput(e) {
//     localStorage.setItem("email", e.target.value);
//     console.log(e);
// }

// function onMessageInput(e) {
//     localStorage.setItem("message", e.target.value);
//     console.log(e);
// }
// console.log(localStorage);

// function fillForm() {
//     const emailValue = localStorage.getItem("email");
//     const messageValue = localStorage.getItem("message");
    
//     if (emailValue) {
//         refs.email.value = emailValue;
//     }
//     if (messageValue) {
//         refs.textarea.value = messageValue;
//     }
// }
// fillForm();

// function onFormSubmit(e) {
//     e.preventDefault();
//     console.log("send form");
    
//     e.currentTarget.reset();
//     localStorage.removeItem("email")
//     localStorage.removeItem("message")
// };