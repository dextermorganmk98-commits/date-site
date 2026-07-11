// ===== Переменные =====

let selectedPlace = "";
let selectedDate = "";
let selectedTime = "";

const pages = document.querySelectorAll(".page");

function showPage(id){
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ===== Кнопка "Начать" =====

document.getElementById("startBtn").addEventListener("click", () => {
    showPage("loginPage");
});

// ===== Проверка входа =====

document.getElementById("loginBtn").addEventListener("click", () => {

    const name = document.getElementById("name").value.trim().toLowerCase();
    const surname = document.getElementById("surname").value.trim().toLowerCase();
    const father = document.getElementById("father").value.trim().toLowerCase();

    if(
        name === "Aygerim" &&
        surname === "Smailova" &&
        father === "Rashid qizi"
    ){
        document.getElementById("error").innerHTML = "";
        showPage("questionPage");
    }else{
        document.getElementById("error").innerHTML = "❌ Неверный код доступа";
    }

});

// ===== Кнопка "Да" =====

document.getElementById("yesBtn").addEventListener("click", () => {
    showPage("placePage");
});

// ===== Убегающая кнопка "Нет" =====

const noBtn = document.getElementById("noBtn");

function moveNoButton(){

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", (e)=>{
    e.preventDefault();
    moveNoButton();
});

// ===== Выбор места =====

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        cards.forEach(c=>c.classList.remove("selected"));

        card.classList.add("selected");

        selectedPlace = card.dataset.place;

        setTimeout(()=>{

            showPage("datePage");

        },500);

    });

});

// ===== Выбор даты =====

document.getElementById("dateBtn").addEventListener("click", () => {

    selectedDate = document.getElementById("date").value;

    if(selectedDate === ""){
        alert("Выбери дату ❤️");
        return;
    }

    showPage("timePage");

});

// ===== Выбор времени =====

document.getElementById("timeBtn").addEventListener("click", () => {

    selectedTime = document.getElementById("time").value;

    if(selectedTime === ""){
        alert("Выбери время ❤️");
        return;
    }

    const text = `
<h2>❤️ Я очень счастлив ❤️</h2>

        <p>
        Честно говоря, пока я делал этот сайт,
        я очень переживал...

        Но теперь, когда ты согласилась,
        я стал очень счастлив ❤️
        </p>

        <hr>

        <p><b>📍 Место:</b> ${selectedPlace}</p>

        <p><b>📅 День:</b> ${selectedDate}</p>

        <p><b>🕒 Время:</b> ${selectedTime}</p>
`;

document.getElementById("finalText").innerHTML = text;

showPage("finishPage");

});

document.getElementById("sendBtn").addEventListener("click", () => {

    const message = `
❤️ Я согласна!

📍 Место: ${selectedPlace}
📅 День: ${selectedDate}
🕒 Время: ${selectedTime}
`;

    fetch("https://api.telegram.org/bot8941090941:AAHwxIMYdiYoK4CzmA-yZ9AfrQvpl-Fmikw/sendMessage", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        chat_id: "8517345540",
        text: message
    })
});

alert("Ответ отправлен ❤️");

});