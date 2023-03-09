"use strict";

let GPU = new GameObject(new Vector2(2380 - memmory / 2, 2124 - memmory / 2), new Vector2(350, 192));
class GPUclass {
    constructor() {
        this.updates = 0;
    };
    Update() {
        GPUAnimator.framesDelay = - (1 / (batteryUpdate.charge/20))
        /*
        this.updates++;
        this.updates = this.updates % 100;
        if (this.updates  < 33) {
            GPURenderer.imageId = 'GPU1';
        } else if (this.updates > 33 && this.updates < 66) {
            GPURenderer.imageId = 'GPU2';
        } else if (this.updates > 66) {
            GPURenderer.imageId = 'GPU3';
        }
         console.log(this.updates);*/
    }
}
let GPUUpdate = GPU.AddComponent(GPUclass);
//let GPURenderer = GPU.AddComponent(Renderer);
//GPURenderer.imageId = 'GPU';
let GPUAnimator = GPU.AddComponent(Animator);
GPUAnimator.stages = [{delay:8,length:3}];
GPUAnimator.image = "GPUImage";
GPUAnimator.Play(0);

