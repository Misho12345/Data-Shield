"use strict";

let enemies = [];

class Enemy extends GameObject {
    constructor(imageID, typeEnemy,x,y,sizeX,sizeY) {
        super(new Vector2(x, y), new Vector2(sizeX, sizeY));
        this.imageID = imageID;
        this.typeEnemy = typeEnemy;
        this.animator = this.AddComponent(Animator);
        this.animator.stages = [{ delay: 0.3, length: 4 }, { delay: 0.3, length: 4 }];
        this.animator.image = this.imageID;
        
        this.animator.Play(0);
    }
    // OnDestroyed() {
    //     playerInput.coins = +playerInput.zoins + (this.typeEnemy + 1);
    // }
}