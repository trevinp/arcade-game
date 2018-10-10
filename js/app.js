// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Move enemy to left side if it goes off the right side
    if (this.x > 500) {
        this.x = -50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Check for a collision, if so put player back at beginning position
    for (let enemy of enemyList) {
        if (Math.abs(this.y - enemy.y) < 40 && Math.abs(this.x - enemy.x) < 40) {
            this.x = 150;
            this.y = 485;
        }
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyEnter) {
    switch (keyEnter) {
        case 'left':
            this.x -= this.speed;
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case 'right':
            this.x += this.speed;
            if (this.x > 400) {
                this.x = 400;
            }
            break;
        case 'up':
            this.y -= this.speed;
            if (this.y < 0) {
                this.x = 200;
                this.y = 400;
                alert('You safely made it!');
            }
            break;
        case 'down':
            this.y += this.speed;
            if (this.y > 425) {
                this.y = 425;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemyList = [];
let enemy1 = new Enemy(-50, 65, 285);
let enemy2 = new Enemy(-50, 145, 75);
let enemy3 = new Enemy(-50, 220, 175);
let enemy4 = new Enemy(-50, 320, 220);
let enemy5 = new Enemy(-50, 400, 75);
enemyList.push(enemy5, enemy4, enemy3, enemy2, enemy1);

let player = new Player(150, 450, 100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
