"use strict";

class PlayerMovement extends Component {
    #velocity = Vector2.zero;
    speed = 5;

    Awake() {
        let input = this.gameObject.AddComponent(Input);

        input.AddAction("KeyW", undefined, _ => this.#velocity.y = -1, _ => this.#velocity.y = 0);
        input.AddAction("KeyA", undefined, _ => this.#velocity.x = -1, _ => this.#velocity.x = 0);
        input.AddAction("KeyS", undefined, _ => this.#velocity.y =  1, _ => this.#velocity.y = 0);
        input.AddAction("KeyD", undefined, _ => this.#velocity.x =  1, _ => this.#velocity.x = 0);
    }

    Update() {
        this.#velocity.Normalize();
        this.#velocity.Scale(this.speed);

        this.transform.position.Add(this.#velocity);
    }
}

let player = new GameObject(Vector2.zero, new Vector2(200));
player.AddComponent(Renderer).color = "red";
player.AddComponent(PlayerMovement);
