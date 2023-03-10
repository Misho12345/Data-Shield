"use strict";

class Weapon extends GameObject {
    constructor(position, shootingPos, scale, parent, image, stages, bulletScale, bulletImage, bulletStages) {
        super(Vector2.zero, scale);

        this.position = position;
        this.shootingPos = shootingPos;
        this.parent = parent;

        this.animator = this.AddComponent(Animator);
        this.animator.stages = stages;
        this.animator.image = image;
        this.animator.Play(0);

        this.bulletScale = bulletScale;
        this.bulletImage = bulletImage;
        this.bulletStages = bulletStages;

        this.bullets = [];

        this.transform.EarlyUpdate = () => {
            this.transform.position.Set(this.parent.position);
            this.transform.position.Add(this.position);
        }
    }

    Shoot() {
        let bullet = new GameObject(this.transform.position, this.bulletScale);
        this.bullets.push(bullet);
        bullet.transform.position.Add(this.shootingPos);

        let animator = bullet.AddComponent(Animator);
        animator.stages = this.bulletStages;
        animator.image = this.bulletImage;
        animator.Play(0);

        let mouse = Vector2.Sum(mousePos, screenOffset);
        mouse.Subtract(canvas.width / 2, canvas.height / 2);

        let direction = Vector2.Subtraction(mouse, this.transform.position).normalized;
        direction.Scale(5);

        bullet.direction = direction;

        bullet.transform.Update = () => {
            bullet.transform.position.x += bullet.direction.x;
            bullet.transform.position.y += bullet.direction.y;
        }

        // setInterval(bullet.Destroy, 5000);
    }
}
