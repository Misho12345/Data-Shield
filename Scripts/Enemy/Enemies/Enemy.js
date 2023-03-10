"use strict";



class Enemy extends GameObject {
    constructor(imageID, typeEnemy,x,y,sizeX,sizeY) {
        super(new Vector2(x, y), new Vector2(sizeX, sizeY));
        this.imageID = imageID;
        this.typeEnemy = typeEnemy;

        this.enemyIdx = enemies.length;
        enemies.push(this);

        this.transform.Update = () => {
            if (typeof this.Update !== "undefined") this.Update();

            if (this.hp <= 0) {
                playerInput.zoins = playerInput.zoins + this.typeEnemy;
                enemies.splice(this.enemyIdx,1);
                for (let i = this.enemyIdx; i < enemies.length; i++) {
                    enemies[i].enemyIdx = i;
                }

                this.Destroy();
            }
        }

        this.animator = this.AddComponent(Animator);
        this.animator.stages = [{ delay: 0.1, length: 4 }, { delay: 0.3, length: 4 }];
        this.animator.image = this.imageID;
        
        this.animator.Play(0);
    }

}