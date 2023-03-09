class Virus extends EnemyGlavenClass {
    constructor(waveN) {
        super('VirusImage', 'Virus', randomInteger(memmory) - memmory / 2, randomInteger(2) * memmory - memmory / 2,150,150);
        //this.position = new Vector2(randomInteger(memmory) - memmory / 2, randomInteger(memmory) - memmory / 2)
        this.position = new Vector2(0, 0);
        this.dmg = waveN;
        this.hp = 10;
        this.zahapahCD = 0;
    }
    Update() {

        let angle = angleCalc(player.transform.position.x, player.transform.position.y,
        this.transform.position.x, this.transform.position.y);
        this.transform.position.x -= Math.cos(angle)*2;
        this.transform.position.y -= Math.sin(angle) * 2;
        for (let i = 0; i < enemies.length; i++) {
            if (!(enemies[i].transform.position.x == this.transform.position.x &&
                enemies[i].transform.position.y == this.transform.position.y)) {
                if (areColliding(this.transform, enemies[i].transform)) {
                    let anglesbtwe = angleCalc(enemies[i].transform.position.x, enemies[i].transform.position.y,
                        this.transform.position.x, this.transform.position.y);
                    this.transform.position.x += Math.cos(anglesbtwe) * 3;
                    this.transform.position.y += Math.sin(anglesbtwe) * 3;
                    break;
                }
            }
        }
        if (this.transform.position.DistanceFrom(player.transform.position) < 50 && this.zahapahCD < 0) {
            this.animator.stage = 1;
            player.hp--;
            this.zahapahCD = 500;
        } else if (this.zahapahCD<350) {
            
            this.animator.stage = 0;
        }
        this.zahapahCD--;
    }
}