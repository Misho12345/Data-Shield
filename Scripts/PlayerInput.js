"use strict";

let screenOffset = new Vector2();

class PlayerInput {
    #velocity = new Vector2();
    #zoins;
    #parichki;
    speed = 40;
    hp = 10;

    #maxOffset = 100;
    coinsElement = document.getElementById('coins');
    parichkiElement = document.getElementById('parichki');
    set parichki(v) {
        this.#parichki = v;
        this.parichkiElement.innerText = v;
    }

    get parichki() {
        return this.#parichki;
    }
    set zoins(v) {
        this.#zoins = v;
        this.coinsElement.innerText = v;
    }

    get zoins() {
        return this.#zoins;
    }

    Awake() {
        this.zoins = 0;
        this.parichki = 0;

        input.AddAction("KeyW", undefined, _ => this.#velocity.y = -1, _ => this.#velocity.y = 0);
        input.AddAction("KeyA", undefined, _ => this.#velocity.x = -1, _ => this.#velocity.x = 0);
        input.AddAction("KeyS", undefined, _ => this.#velocity.y = 1, _ => this.#velocity.y = 0);
        input.AddAction("KeyD", undefined, _ => this.#velocity.x = 1, _ => this.#velocity.x = 0);

        input.AddAction("KeyE", _ => {
            if (this.inShopRange) {
                shopOpened = true;
                shopMenu.style.display = "flex";
            }
        });

        input.AddAction("Space", undefined, _ => this.Shoot());
    }

    Update() {
        if (this.#velocity.Equals(Vector2.zero)) return;

        this.#velocity.Normalize();
        this.#velocity.Scale(this.speed * deltaTime * 100);
        this.transform.position.Add(this.#velocity);

        if (Vector2.Subtraction(this.transform.position, screenOffset).magnitude >= this.#maxOffset)
            screenOffset.Add(this.#velocity);
    }

    LateUpdate() {
        let dist = player.transform.position.DistanceFrom(new Vector2(760, -400)) / 500;
        this.inShopRange = dist < 1;

        if (this.inShopRange) {
            let opacity = 1.2 - dist;
            if (opacity > 0.8) opacity = 0.8;

            context.fillStyle = `rgba(230, 230, 230, ${opacity})`;
            context.font = "50px Orbitron";

            let text = context.measureText("Press E to open the shop");
            context.fillText("Press E to open the shop", 760 - screenOffset.x - text.width / 2, -600 - screenOffset.y);
        }
    }

    Shoot() {
        console.log("pow");
    }
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

let player = new GameObject(Vector2.zero, new Vector2(100));

player.AddComponent(Renderer).color = "red";
let playerInput = player.AddComponent(PlayerInput);

