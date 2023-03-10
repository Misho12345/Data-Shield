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
    }

    Update() {
        if (this.#velocity.Equals(Vector2.zero)) return;

        if (playerAnimator.paused) playerAnimator.Play();
        // playerAnimator.stage = this.lookingDir;

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
}

let player = new GameObject(Vector2.zero, new Vector2(100));
let playerAnimator = player.AddComponent(Animator);

playerAnimator.stages = [
    {delay: 0.15, length: 4}
];
playerAnimator.image = "player";
playerAnimator.Play(0);

player.AddComponent(PlayerInput);

let weapon = new Weapon(
    new Vector2(0, 0), new Vector2(0, 0), new Vector2(320, 95), player.transform, "magnum", [{delay: 0.05, length: 4}],
    new Vector2(20), "magnumBullet", [{delay: 0.03, length: 5}]);
