"use strict";

let deltaTime;
let time;

let paused = false;

function PausePlay() {
    paused = !paused;
    time = new Date();
    update();
}

function resizePage() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function init() {
    resizePage();
    time = new Date();

    window.onresize = resizePage;

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

function update() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();

    if (paused) return;

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
