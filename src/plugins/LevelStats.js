import levels from '../levels';

let highestLevel = 0;
let savedHighestLevel = localStorage.getItem('levelNUTTYTWINS');
savedHighestLevel = Number(atob(savedHighestLevel));
if (!isNaN(savedHighestLevel) && (savedHighestLevel > 0) && (savedHighestLevel < levels.length)) {
    savedHighestLevel = Math.round(savedHighestLevel);
    highestLevel = savedHighestLevel;
}

let currentLevel = highestLevel;
//currentLevel = 2;

//let hosts = JSON.parse('["0.0.0.0:8020","nutty-twins.netlify.com","nutty-twins.supernapie.com","quinten.github.io","nutty-twins-kong.netlify.com","v6p9d9t4.ssl.hwcdn.net"]');
let hosts = JSON.parse(atob('WyIwLjAuMC4wOjgwMjAiLCJudXR0eS10d2lucy5uZXRsaWZ5LmNvbSIsIm51dHR5LXR3aW5zLnN1cGVybmFwaWUuY29tIiwicXVpbnRlbi5naXRodWIuaW8iLCJudXR0eS10d2lucy1rb25nLm5ldGxpZnkuY29tIiwidjZwOWQ5dDQuc3NsLmh3Y2RuLm5ldCJd'));
//console.log(hosts);

class LevelStats extends Phaser.Plugins.BasePlugin {

    get currentLevel() {
        return currentLevel;
    }

    get highestLevel() {
        return highestLevel;
    }

    set currentLevel(value) {
        let newCurrentLevel = value;
        newCurrentLevel = Number(value);
        if (!isNaN(newCurrentLevel) && (newCurrentLevel >= 0) && (newCurrentLevel < levels.length)) {
            newCurrentLevel = Math.round(newCurrentLevel);
            currentLevel = newCurrentLevel;
        }
    }

    // increments the level with 1 and
    // returns wether or not the game is complete
    levelUp() {
        // only let some hosts play the first 4 levels
        if ((hosts.indexOf(window.location.host) < 0) && (currentLevel >= 3)) {
            currentLevel = 0;
            return true;
        }
        let value = currentLevel + 1;
        if (value >= levels.length) {
            currentLevel = 0;
            return true;
        }
        if (value > highestLevel) {
            value = Math.round(value);
            highestLevel = value;
            localStorage.setItem('levelNUTTYTWINS', btoa(String(highestLevel)));
        }
        currentLevel = value;
        return false;
    }
}

export default LevelStats;
