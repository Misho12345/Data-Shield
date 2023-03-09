"use strict";

let GPU = new GameObject(new Vector2(200, 300), new Vector2(150, 200));
class GPUclass {
    constructor() {
        this.updates = 0;
    };
    Update() {
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
GPUAnimator.stages = [{delay:0.5,length:4}];
GPUAnimator.image = "GPUImage";
GPUAnimator.Play(0);
