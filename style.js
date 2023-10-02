let nav = document.querySelector(".content");
let btn = document.querySelector(".toggle-btn");
let mask = document.querySelector("#mask");

btn.onclick = () => {
    nav.classList.toggle("touch");
}

mask.onclick = () => {
    nav.classList.toggle("touch");
}