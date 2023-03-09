"use strict";

class Animator extends Renderer {
    #cooldown;
    #paused = true;

    #framesCount;
    framesDelay;

    #stages = [];
    #maxLength;

    stage;
    frame;

    Update() {
        if (this.#paused) return;

        if (this.#cooldown >= 0) {
            this.#cooldown -= deltaTime;
            return;
        }

        this.#cooldown = this.framesDelay;
        this.frame++;

        if (this.frame >= this.#framesCount)
            this.frame = 0;

        this.offset.Set(this.size.x * this.frame, this.size.y * this.stage + 1);
        super.LateUpdate()
    }

    set stages(v) {
        this.#stages = v;
        this.#maxLength = 1;

        for (const stage of v)
            this.#maxLength = Math.max(stage.length, this.#maxLength)
    }

    set image(v) {
        this.imageId = v;

        let image = document.getElementById(v);
        this.size.Set(
            image.naturalWidth  / this.#maxLength,
            image.naturalHeight / this.#stages.length);
    }

    Play(stage) {
        this.#paused = false;

        if (typeof stage === "undefined")
            return;

        this.#framesCount = this.#stages[stage].length;
        this.framesDelay = this.#stages[stage].delay;
        this.#cooldown = -1;

        this.stage = stage;
        this.frame = -1;
    }

    Pause() {
        this.#paused = true;
    }
}
