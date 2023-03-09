
class Worm {}
class TrojanHorse {}
class Bugs {}
class NormalEnemy { }



let enemyTypes = [Worm, TrojanHorse, Bugs, NormalEnemy, Virus];
let whatwaveamion = 1;
function randomInteger(x) {
    return Math.floor(Math.random() * x);
}
class Wave {
    timeToNextWave = 15;
    
    makeWave(stage, TimeInSeconds, isItBoss) {
        this.stage = stage;
        this.TimeInSeconds = TimeInSeconds;
        this.isItBoss = isItBoss;
        this.updates = 0;
        this.enemyCount = stage * stage;
        this.enemyCD = Math.floor(TimeInSeconds * 100 / this.enemyCount);
        this.timeToNextWave = 15 + whatwaveamion * 3;
        whatwaveamion++;
    }
    Update() {
        playerInput.input.AddAction("Enter", _ => this.timeToNextWave = -1, undefined, undefined);
        this.updates++;
        
        //console.log(this.updates);
        if (this.timeToNextWave < 0) {
            this.makeWave(whatwaveamion, whatwaveamion * 3);
        }
        if (this.updates % this.enemyCD == 0 && this.updates < this.TimeInSeconds * 100) {

            this.MakeEnemy(4);
            //this.MakeEnemy(randomInteger(enemyTypes.length));
        } else {
            this.timeToNextWave -= 0.01;
        }
    }
    MakeEnemy(type) {
        enemies.push(new enemyTypes[type]);
    }

}
let wave = battery.AddComponent(Wave);