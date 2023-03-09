"use strict";

class Virus extends Enemy {
    constructor(waveN) {
        super('VirusImage', 1, randomInteger(memory) - memory / 2, randomInteger(2) * memory - memory / 2,150,150);
        //this.position = new Vector2(randomInteger(memory) - memory / 2, randomInteger(memory) - memory / 2)
        this.position = new Vector2(0, 0);
        this.dmg = waveN;
        this.hp = 10;
        this.zahapahCD = 0;
    }

    Update() {
        let vec = Vector2.Subtraction(this.transform.position, player.transform.position).normalized;
        vec.Scale(2);
        this.transform.position.Subtract(vec);

        for (let i = 0; i < enemies.length; i++) {
            if (!enemies[i].transform.position.Equals(this.transform.position.y)) {
                if (areColliding(this.transform, enemies[i].transform)) {
                    vec = Vector2.Subtraction(this.transform.position, enemies[i].transform.position).normalized;
                    vec.Scale(3);
                    this.transform.position.Add(vec);

                    break;
                }
            }
        }

        if (this.transform.position.DistanceFrom(player.transform.position) < 50 && this.zahapahCD < 0) {
            this.animator.stage = 1;
            // player.hp--;
            this.zahapahCD = 500;
            //this.hp=-1;
        } else if (this.zahapahCD<350) {
            
            this.animator.stage = 0;
        }
        this.zahapahCD--;
    }
}