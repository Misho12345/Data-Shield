
class Worm {}
class TrojanHorse {}
class Bugs {}
class NormalEnemy { }

let barText = document.getElementById("text-under-progress-bar");
let barLen = document.getElementById("progress-bar");
function fibonacci(x) {
    if (x == 0){
        return 0;
    } else if (x == 1) {
        return 1;
    } else {
        return fibonacci(x - 1) + fibonacci(x - 2);
    }
}


let enemyTypes = [Worm, TrojanHorse, Bugs, NormalEnemy, Virus];
let whatwaveamion = 1;
function randomInteger(x) {
    return Math.floor(Math.random() * x);
}
class Wave {
    timeToNextWave = 30;
    timeToNextWaveMax = 30;
    makeWave(stage, TimeInSeconds, isItBoss) {
        this.stage = stage;
        this.TimeInSeconds = TimeInSeconds;
        this.isItBoss = isItBoss;
        this.updates = 0;
        this.enemyCount = fibonacci(stage+1);
        this.enemyCD = Math.floor(TimeInSeconds * 100 / this.enemyCount);
        this.timeToNextWave = 15 + whatwaveamion * 3;
        this.timeToNextWaveMax = 15 + whatwaveamion * 3;
        whatwaveamion++;
    }
    Update() {
        playerInput.input.AddAction("Enter", _ => this.timeToNextWave = -1, undefined, undefined);
        this.updates++;
        
        //console.log(this.updates);
        if (this.timeToNextWave < 0) {
            this.makeWave(whatwaveamion, whatwaveamion * 3,false);
        }
        if ((this.updates > this.TimeInSeconds * 100) && enemies.length > 0) {
            barLen.style.width = '' + (enemies.length / this.enemyCount) * 100 + '%';
            barText.innerText = 'smt milicioun is cooking go and kill it';

        } else {
            barLen.style.width = '' + (this.timeToNextWave / this.timeToNextWaveMax) * 100 + '%';
            barText.innerText = 'next wave in';
        }
        if (this.updates < this.TimeInSeconds * 100) {

            barLen.style.width = '' + (this.updates / (this.TimeInSeconds * 100)) * 100 + '%';
            barText.innerText = 'pechem enemita v momenta';
        }
        if (this.updates % this.enemyCD == 0 && this.updates < this.TimeInSeconds * 100) {
            //console.log("dsa323232dsa");
            this.MakeEnemy(4);
            //this.MakeEnemy(randomInteger(enemyTypes.length));
        } else if (!(this.updates < this.TimeInSeconds * 100) && enemies.length==0) {
            //console.log("dsadsa");
            this.timeToNextWave -= 0.02;
            
        }
        
    }
    MakeEnemy(type) {
        enemies.push(new enemyTypes[type]);
    }

}
let wave = battery.AddComponent(Wave);