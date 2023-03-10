"use strict";

let isKeyDown = {};
let isKeyPressed = {};
let isKeyUp = {};

let mousePos = new Vector2();
let mouseClicked = false;

window.addEventListener("mousemove", ev => {
    let bounds = canvas.getBoundingClientRect();
    let scaleX = canvas.width / bounds.width;
    let scaleY = canvas.height / bounds.height;

    mousePos.x = (ev.clientX - bounds.left) * scaleX - canvas.width / 2;
    mousePos.y = (ev.clientY - bounds.top) * scaleY - canvas.height / 2;
});

function GetMousePos() {
    return Vector2.Sum(mousePos, screenOffset);
}

window.addEventListener("mousedown", ev => mouseClicked = true);
window.addEventListener("mouseup", ev => mouseClicked = false);

window.addEventListener("keydown", key => {
    isKeyDown[key.code] = !isKeyPressed[key.code];
    isKeyPressed[key.code] = true;

    if (key.code === "Escape") PausePlay();
});

window.addEventListener("keyup", key => isKeyUp[key.code] = true);


class Action {
    input;
    bind;
    idx;

    onDown;
    onPressed;
    onUp;

    constructor(input, bind, onDown, onPressed, onUp) {
        this.idx = input.actions.length;
        this.bind = bind;

        this.onDown = onDown;
        this.onPressed = onPressed;
        this.onUp = onUp;

        this.input = input;

        this.input.actions.push(this);
    }
}

class Input {

    actions = [];

    EarlyUpdate() {
        for (const action of this.actions) {
            if (isKeyUp[action.bind]) {
                isKeyDown[action.bind] = false;
                isKeyPressed[action.bind] = false;
                isKeyUp[action.bind] = false;

                if (typeof action.onUp !== "undefined") {
                    action.onUp(this.gameObject);
                }
            } else if (isKeyDown[action.bind]) {
                isKeyDown[action.bind] = false;

                if (typeof action.onDown !== "undefined") {
                    action.onDown(this.gameObject);
                }
            } else if (isKeyPressed[action.bind]) {
                if (typeof action.onPressed !== "undefined") {
                    action.onPressed(this.gameObject);
                }
            }
        }
    }

    UpdateActions(idx) {
        for (let i = idx; i < this.actions.length; i++) {
            this.actions[i].idx = i;
        }
    }

    AddAction(bind, onDown, onPressed, onUp) {
        const action = new Action(this, bind, onDown, onPressed, onUp);
        this.actions.push(action);

        action.idx = this.actions.length - 1;
        action.gameObject = this;
        action.transform = this.transform;

        return action;
    }

    FindActionIdx(bind) {
        let found;

        for (const action of this.actions) {
            if (action.bind === bind) {
                found = action.idx;
                break;
            }
        }

        return typeof found !== "undefined" ? found : undefined;
    }

    GetAction(type) {
        return this.actions[this.FindActionIdx(type)];
    }

    RemoveAction(bind) {
        const foundIdx = this.GetAction(bind);

        if (typeof foundIdx !== "undefined") {
            this.actions.splice(foundIdx);
            this.UpdateActions(foundIdx);
        }
    }
}

let input = new GameObject().AddComponent(Input);
