"use strict";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

class Renderer {
    color;
    imageId;

    size = new Vector2();
    offset = new Vector2();

    LateUpdate() {
        const centerPos = Vector2.Subtraction(this.transform.centerPos, screenOffset);

        let a = Math.max(this.transform.scale.x, this.transform.scale.y);
        if (centerPos.x + a < -canvas.width  / 2 ||
            centerPos.x - a >  canvas.width  / 2 ||
            centerPos.y + a < -canvas.height / 2 ||
            centerPos.y - a >  canvas.height / 2) return;

        context.save();

        context.translate(this.transform.position.x, this.transform.position.y);
        context.rotate(this.transform.rotation);
        context.translate(-this.transform.position.x, -this.transform.position.y);

        let image = document.getElementById(this.imageId)
        if (image !== null) {
            if (this.offset.Equals(Vector2.zero)) {
                context.drawImage(image, centerPos.x, centerPos.y, this.transform.scale.x, this.transform.scale.y);
            } else {
                context.drawImage(image, this.offset.x, this.offset.y, this.size.x, this.size.y,
                    centerPos.x, centerPos.y, this.transform.scale.x, this.transform.scale.y);
            }
        } else {
            context.fillStyle = this.color;
            context.fillRect(centerPos.x, centerPos.y, this.transform.scale.x, this.transform.scale.y);
        }

        context.restore();
    }
}
