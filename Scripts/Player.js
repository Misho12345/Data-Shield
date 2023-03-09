"use strict";

let screenOffset = new Vector2();

class PlayerInput extends Component {
    #velocity = new Vector2();
    speed = 5;

    #maxOffset = 100;

    Awake() {
        this.input = this.gameObject.AddComponent(Input);

        this.input.AddAction("KeyW", undefined, _ => this.#velocity.y = -1, _ => this.#velocity.y = 0);
        this.input.AddAction("KeyA", undefined, _ => this.#velocity.x = -1, _ => this.#velocity.x = 0);
        this.input.AddAction("KeyS", undefined, _ => this.#velocity.y =  1, _ => this.#velocity.y = 0);
        this.input.AddAction("KeyD", undefined, _ => this.#velocity.x =  1, _ => this.#velocity.x = 0);

        this.input.AddAction("Escape", PausePlay)
    }

    Update() {
        if (this.#velocity.Equals(Vector2.zero)) return;

        this.#velocity.Normalize();
        this.#velocity.Scale(this.speed);
        this.transform.position.Add(this.#velocity);

        if (Vector2.Subtraction(this.transform.position, screenOffset).magnitude >= this.#maxOffset)
            screenOffset.Add(this.#velocity);
    }
}

function StopAnimation(el) {
}

function StartAnimation(idx, text) {
    let el = document.getElementById("animation" + idx);
    StopAnimation(el);
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
    })
}

let player = new GameObject(Vector2.zero, new Vector2(100));
player.AddComponent(Renderer).color = "red";
player.AddComponent(PlayerInput);
