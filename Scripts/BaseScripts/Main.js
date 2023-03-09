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
function areColliding(a, b) {
    return (b.position.x <= a.position.x + a.scale.x &&
        a.position.x <= b.position.x + b.scale.x &&
        b.position.y <= a.position.y + a.scale.y &&
        a.position.y <= b.position.y + b.scale.y)
}
function angleCalc(cX, cY, x, y) {
    let angle = Math.atan2(y - cY, x - cX);
    if (y >= cY) return angle;
    else return Math.PI * 2 + angle;
}
function update() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].Update();
        if (enemies[i].hp <= 0) {
            enemies[i].Destroy();
           // delete enemies[i];
            
            /*enemies[i] = enemies[enemies.length - 1];
            enemies.pop();*/
            enemies.splice(i,1);
        }
    }
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
let enemies = [];
let memmory = 5120;
let motherboard = new GameObject(new Vector2(0 , 0), new Vector2(memmory,memmory));
let motherboardAnimator = motherboard.AddComponent(Animator);
motherboardAnimator.stages = [{ delay: Infinity, length: 1 }];
//batteryAnimator.stages = [{ delay: Infinity, length: 5 }];
motherboardAnimator.image = "motherboard";
motherboardAnimator.Play(0);
