const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const createUserButton = document.getElementById('createUser');
const login = document.getElementById('login');
const title = document.getElementById('title');
const firstPage = document.getElementById('first-page');
const finalPage = document.getElementById('final');
const container = document.getElementById('container');
const finalText = document.getElementById('final-text');

// URL DO AMIGO
// GET http://52.201.243.86/?pad=bm90ZXMtMS50eHQ=

const verifyToken = () => {
    if (localStorage.token) {
        firstPage.style.display = "none";
        finalPage.style.display = "initial";

        (async () => {
            const rawResponse = await fetch("http://35.173.133.80/api/mensagem_final", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.token}`
                }),
            });
            const response = await rawResponse.json();
            console.log(response.message);
            finalText.textContent = response.message;
        })();

        // CSS
        document.getElementsByTagName("BODY")[0].style.background = "black"

        const oldlink = document.getElementsByTagName("link").item(1);
        const newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "./star.css");
        document.getElementsByTagName("head")[0].replaceChild(newlink, oldlink);    
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    if (verifyToken()) {
    }
});

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

createUserButton.addEventListener('click', () => {
    const initialText = title.innerText;
    title.innerText = "Achou que iria conseguir um usuário facil, achou errado!!!";
    title.style.color = "red";
    setTimeout(() => { 
        title.style.color = "black";
        title.innerText = initialText
    }, 5000);
});

login.addEventListener('submit', event => {
    event.preventDefault();
    const reqbody = {
        email: login.elements["email"].value,
        password: login.elements["password"].value
    };
    (async () => {
        const rawResponse = await fetch("http://35.173.133.80/api/login", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            }),
            body: JSON.stringify(reqbody)
        });
        const response = await rawResponse.json();
        if (response.auth) {
            localStorage.setItem("token", response.token);
            verifyToken();
        }
    })();
});
