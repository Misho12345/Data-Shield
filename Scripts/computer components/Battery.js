"use strict";

let battery = new GameObject(new Vector2(-180, -45)   , new Vector2(670, 351));

class Battery {
    constructor() {
        this.cap = 1000;
        this.charge = 1000;
        this.updatesLived = 0
    };
    Update() {
        if (this.updatesLived > 0) {
            if (this.charge / this.cap > 0.75) {
                batteryAnimator.stage = 0
            } else if (this.charge / this.cap < 0.75 && this.charge / this.cap > 0.5) {
                batteryAnimator.stage = 1
            } else if (this.charge / this.cap < 0.5 && this.charge / this.cap > 0.25) {
                batteryAnimator.stage = 2
            } else if (this.charge / this.cap < 0.25) {
                batteryAnimator.stage = 3
                
            }
            if (this.charge / this.cap < 0.01) {
                batteryAnimator.Play(4);
    
                //batteryAnimator.Pause();
            }
        }
        this.updatesLived++;
    }
}
let batteryUpdate = battery.AddComponent(Battery);
let batteryAnimator = battery.AddComponent(Animator);
batteryAnimator.stages = [  { delay: 0.2, length: 5 },
                            { delay: 0.2, length: 5 },
                            { delay: 0.2, length: 5 },
                            { delay: 0.2, length: 5 },
                            { delay: 0.2, length: 1 }];
//batteryAnimator.stages = [{ delay: Infinity, length: 5 }];
batteryAnimator.image = "batteryImage";
batteryAnimator.Play(0);

