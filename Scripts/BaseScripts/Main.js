"use strict";

let deltaTime;
let time;

let paused = false;
let pauseMenu = document.getElementById("pause-menu");

let shopOpened = false;
let shopMenu = document.getElementById("shop");

function PausePlay() {
    if (shopOpened) {
        shopOpened = false;
        shopMenu.style.display = "none";
        time = new Date();
        update();

        return;
    }

    paused = !paused;
    time = new Date();
    if (!paused) {
        pauseMenu.style.display = "none";
        update();
    } else pauseMenu.style.display = "flex";
}

function resizePage() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.translate(canvas.width / 2, canvas.height / 2);

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (component instanceof Renderer && typeof component.EarlyUpdate !== "undefined")
                component.EarlyUpdate()

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (component instanceof Renderer && typeof component.Update !== "undefined")
                component.Update();

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (component instanceof Renderer && typeof component.LateUpdate !== "undefined")
                component.LateUpdate();

    context.translate(-canvas.width / 2, -canvas.height / 2);
}


function StartAnimation(idx, text) {
    let el = document.getElementById("animation" + idx);
    el.innerText = text;
    el.className = "animation"

    el.innerText = text;

    let number = +text;
    if (isNaN(number) || number === 0) {
        el.style.color = "gray";
        el.innerText = "+" + number;
    }
    else if (number > 0) {
        el.style.color = "green";
        el.innerText = "+" + number;
    }
    else el.style.color = "red";

    el.addEventListener("animationend", _ => {
        el.classList.remove("animation");
        el.innerText = "";
    });
}

function init() {
    resizePage();
    time = new Date();

    window.onresize = resizePage;

    let shopItems = document.getElementsByClassName("shop-item");

    for (let i = 0 ; i < shopItems.length; i++) {
        shopItems[i].addEventListener("click", () => {
            shopItems[i].classList.add('animate-green-filter');
            console.log("in")
        });
        shopItems[i].addEventListener("animationend", () => {
            shopItems[i].classList.remove('animate-green-filter');
            console.log("out")
        });
    }

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.Awake !== "undefined")
                component.Awake();

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.Start !== "undefined")
                component.Start();

    update();
}

function areColliding(a, b) {
    return (b.position.x <= a.position.x + a.scale.x &&
        a.position.x <= b.position.x + b.scale.x &&
        b.position.y <= a.position.y + a.scale.y &&
        a.position.y <= b.position.y + b.scale.y)
}

function update() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();

    if (paused || shopOpened) return;

    context.globalAlpha = 1;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.EarlyUpdate !== "undefined")
                component.EarlyUpdate()

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.Update !== "undefined")
                component.Update();

    for (const gObj of gameObjects)
        for (const component of gObj.components)
            if (typeof component.LateUpdate !== "undefined")
                component.LateUpdate();

    context.translate(-canvas.width / 2, -canvas.height / 2);

    setTimeout(update, 10);
}

let memory = 5120;

let motherboard = new GameObject(Vector2.zero, new Vector2(memory));
let motherboardARenderer = motherboard.AddComponent(Renderer);
motherboardARenderer.imageId = "motherboard";
