const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');


function Game()
{
    this.roundNumber = 0;
    this.inPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function()
{
    this.enemies.push(new Enemy('hobbit','spear'));
    this.enemies.push(new Enemy('John Cena','Brass Knuckle'));
    this.enemies.push(new Enemy('Doom Guy','Pet Bunny'));

    this.currentEnemy = this.enemies[0];

    inquirer
    .prompt({
        type:'text',
        name:'name',
        message: 'Enter player name.'
    })
    .then(({name})=>{
        this.player = new Player(name);
        this.startNewBattle();
    });
};



module.exports = Game;