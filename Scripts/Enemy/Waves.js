
class Worm {}
class TrojanHorse {}
class Bugs {}
class NormalEnemy { }

let enemyTypes = [Worm, TrojanHorse, Bugs, NormalEnemy, Virus];

function randomInteger(x) {
    return Math.floor(Math.random() * x);
}
class Wave {
    makeWave(stage, TimeInSeconds, isItBoss) {
        this.stage = stage;
        this.TimeInSeconds = TimeInSeconds;
        this.isItBoss = isItBoss;
        this.updates = 0;
        this.enemyCount = stage * stage;
        this.enemyCD = Math.floor(TimeInSeconds*100 / this.enemyCount);
    }
    Update() {
        
        this.updates++;
        //console.log(this.updates);
        if (this.updates % this.enemyCD == 0 && this.updates < this.TimeInSeconds * 100) {
            
            this.MakeEnemy(4);
            //this.MakeEnemy(randomInteger(enemyTypes.length));
        }
    }
    MakeEnemy(type) {
        enemies.push(new enemyTypes[type]);
    }

}
let wave = battery.AddComponent(Wave);