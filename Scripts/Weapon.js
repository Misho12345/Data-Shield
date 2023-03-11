"use strict";

class Weapon extends GameObject {
    constructor(offset, scale, parent, image, stages, bulletScale, bulletImage, bulletStages, dmg, cooldown) {
        super(Vector2.zero, scale);

        this.offset = offset;
        this.parent = parent;

        this.animator = this.AddComponent(Animator);
        this.animator.stages = stages;
        this.animator.image = image;

        this.animator.playOnce = true;
        this.animator.Play(0, false);

        this.dmg = dmg;
        this.cooldown = cooldown;

        this.inCooldown = false;

        this.bulletScale = bulletScale;
        this.bulletImage = bulletImage;
        this.bulletStages = bulletStages;

        this.bullets = [];

        this.transform.LateUpdate = () => {
            this.transform.position.Set(this.parent.position);

            this.bullets.forEach(bullet => {
                enemies.forEach(enemy => {
                   if (areColliding(bullet.transform, enemy.transform)) {
                       this.DestroyBullet(bullet.bulletIdx)
                       enemy.hp -= this.dmg;
                   }
                });
            });

            let mouse = GetMousePos();
            let angle = angleCalc(this.transform.position.x, this.transform.position.y, mouse.x, mouse.y);
            this.offsetVec = new Vector2(Math.cos(angle), Math.sin(angle));
            this.offsetVec.Scale(this.transform.scale.x / 2);

            if (angle >= Math.PI * 0.5 && angle <= Math.PI * 1.5) {
                if (this.animator.stage !== 0) {
                    this.animator.Play(0, false);
                    this.animator.Update();
                }
            }
            else if (this.animator.stage !== 1) {
                this.animator.Play(1, false);
            }

            this.transform.position.Add(this.offsetVec.x / 4, this.offsetVec.y / 4 + 20)

            this.transform.rotation = angle;

            if (mouseClicked) this.Shoot();
        }
    }

    DestroyBullet(idx) {
        this.bullets[idx].Destroy();
        this.bullets.splice(idx, 1);
        for (let i = idx; i < this.bullets.length; i++) {
            this.bullets[i].bulletIdx = idx;
        }
    }

    Shoot() {
        if (this.inCooldown) return;
        this.inCooldown = true;
        setTimeout(() => this.inCooldown = false, this.cooldown);

        let bullet = new GameObject(this.transform.position, this.bulletScale);
        bullet.transform.position.Add(this.offsetVec);
        bullet.bulletIdx = this.bullets.length;
        this.bullets.push(bullet);

        let animator = bullet.AddComponent(Animator);
        animator.stages = this.bulletStages;
        animator.image = this.bulletImage;
        animator.Play(0);

        this.animator.Play();


        let direction = Vector2.Subtraction(GetMousePos(), this.transform.position).normalized;
        direction.Scale(5);

        bullet.direction = direction;

        bullet.transform.Update = () => {
            bullet.transform.position.Add(bullet.direction);
        }

        setTimeout(() => {if (bullet) this.DestroyBullet(bullet.bulletIdx)}, 10000);
    }
}
