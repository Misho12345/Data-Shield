"use strict";

let CPU = new GameObject(new Vector2(2375 - memmory / 2, 2864.5 - memmory / 2), new Vector2(190, 191));
class CPUclass {
    constructor() {
        this.updates = 0;
    };
    Update() {
        this.updates++;
        if (CPUAnimator.frame==0) {
            CPUAnimator.Pause();
            setInterval(() => CPUAnimator.Play(), Math.random()*30000);
            CPUAnimator.frame = 1;
        }
    }
}
let CPUUpdate = CPU.AddComponent(CPUclass);
let CPUAnimator = CPU.AddComponent(Animator);
CPUAnimator.stages = [{ delay: 0.2, length: 5 }];
CPUAnimator.image = "CPUImage";
CPUAnimator.Play(0);