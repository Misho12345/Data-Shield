"use strict";

let Shop = new GameObject(new Vector2(200, 300), new Vector2(200, 200));
class Shopclass {
    constructor() {
        this.updates = 0;
    };
    Update() {
        this.updates++;
    }
}
let ShopUpdate = Shop.AddComponent(Shopclass);
let ShopAnimator = Shop.AddComponent(Animator);
ShopAnimator.stages = [{ delay: 0.2, length: 1 }];
ShopAnimator.image = "ShopImage";
ShopAnimator.Play(0);