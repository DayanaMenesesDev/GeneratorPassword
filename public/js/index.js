const generatedPassword = document.getElementById('generatedPassword')
const btnGerenatePassword = document.getElementById('btnGerenatePassword');
const configGeneratePassword = document.getElementById('configGeneratePassword');
const container__pwLength = document.getElementById('container__pwLength')
const pwLength = document.getElementById('pwLength');
const btnMinimize = document.getElementById('btnMinimize'); 
const btnMaximize = document.getElementById('btnMiximize');
const btnGeneratedPW = document.querySelectorAll('.btnGeneratedPW')
const formGeneratedPassword = document.getElementById('formGeneratedPassword')

const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?';

const letterMay = document.getElementById('letterMay')
const letterMin = document.getElementById('letterMin')
const numbers = document.getElementById('numbers')
const signs = document.getElementById('signs')

let characters = '';

const checkboxVerify = (e) => {
    const newCharacters = new Set();

    const verifyCheck = ()=> {
        if (characters == '') {
            switch (e.target.id) {
                case 'letterMay':
                    characters = letrasMayusculas;
                    letterMay.checked = true;
                    letrasMayusculas.split('').forEach(c => newCharacters.add(c)); 
                    break;
                case 'letterMin':
                    characters = letrasMinusculas;
                    letterMin.checked = true;
                    letrasMinusculas.split('').forEach(c => newCharacters.add(c)); 
                    break;
                case 'numbers':
                    characters = numeros;
                    numbers.checked = true;
                    numbers.split('').forEach(c => newCharacters.add(c)); 
                    break;
                case 'signs':
                    characters = simbolos;
                    signs.checked = true;
                    signs.split('').forEach(c => newCharacters.add(c)); 
                    break;
            }
        }
    }
    letterMay.checked ? letrasMayusculas.split('').forEach(c => newCharacters.add(c)) : verifyCheck()
    letterMin.checked ? letrasMinusculas.split('').forEach(c => newCharacters.add(c)) : verifyCheck
    numbers.checked ? numeros.split('').forEach(c => newCharacters.add(c)) : verifyCheck
    signs.checked ? simbolos.split('').forEach(c => newCharacters.add(c)) : verifyCheck
    characters = Array.from(newCharacters).join('');
    verifyCheck()
}

[letterMay, letterMin, numbers, signs].forEach(check => {
    check.addEventListener('change', checkboxVerify);
});

const generatePassword = (e) => {
    e.preventDefault()
    const passwordLength = pwLength.value;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        let random = Math.floor( Math.random() * characters.length );
        password += characters[random];
    }
    generatedPassword.value = password;
}

const updateLength = () => {
    pwLength.value = container__pwLength.value;
}

pwLength.addEventListener('mousemove', ()=> {
    container__pwLength.value = pwLength.value;
})

container__pwLength.addEventListener('input', ()=> {
    updateLength()
    const value = parseInt(container__pwLength.value, 10);
    if (value <= 1) {
        container__pwLength.value = `0${value}`;
    } else if (value > 50) {
        container__pwLength.value = 50;
    } else {
        container__pwLength.value = value;
    }
})

btnMinimize.addEventListener('click', (e)=> {
    e.preventDefault();
    container__pwLength.value--;
    updateLength()
})

btnMaximize.addEventListener('click', (e)=> {
    e.preventDefault();
    container__pwLength.value++;
    updateLength()
})

btnGeneratedPW.forEach(btn => {
    btn.style.cursor = 'pointer'
    btn.addEventListener('click',(e) => { 
        e.preventDefault();
        if (e.target.id == 'regeneratePW') {
            generatePassword(e);
        } else {
            navigator.clipboard.writeText(generatedPassword.value);
            const div = document.createElement('div');
            div.setAttribute('id','msgCopy');
            div.innerHTML = `<p>Copiado!</p>`;
            div.style.backgroundColor = 'rgba(144, 144, 144, 0.337)';
            div.style.backdropFilter = 'blur(4px)';
            div.style.position = 'absolute';
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.borderRadius = '20px';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            formGeneratedPassword.insertBefore(div,generatedPassword);
            setTimeout(() => {
                const msgCopy = document.getElementById('msgCopy')
                msgCopy.parentNode.removeChild(msgCopy)
            }, 1000);
        }
    });
});

document.addEventListener('DOMContentLoaded', (e)=> {
    checkboxVerify(e);
});

const eventForGeneratePW = {
    input: [pwLength, container__pwLength],
    click: [btnMinimize, btnMaximize],
    change: [letterMay, letterMin, numbers, signs],
    DOMContentLoaded: [document]
}

Object.entries(eventForGeneratePW).forEach(([event, element]) => { 
    element.forEach(e => e.addEventListener(event, generatePassword)) 
})










