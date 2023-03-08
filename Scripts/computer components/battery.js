"use strict";

class Battery extends GameObject {
    constructor(a,b) {
        super(a,b);
        this.cap = 1000;
        this.charge = this.cap;

    }
}
let battery = new Battery(Vector2.zero, new Vector2(150, 200));

let batteryRenderer = battery.AddComponent(Renderer);
batteryRenderer.imageId = 'batteryImage';

/*class Battery extends GameObject {
    constructor(position, scale, rotation) {
        super(position, scale, rotation);
    }
}*/