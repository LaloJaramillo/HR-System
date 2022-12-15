class Menu extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <div class="header-menu">
        <img src="./img/logo-small.png" id="logo-top" onclick="window.location='index.html'"/>
        <img src="./img/off.png" id="turn-off-session" onclick="closeSession()">
    </div>
        `;
    }
}

function closeSession() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
    }
    window.location = "index.html";
}

window.customElements.define("top-menu", Menu);