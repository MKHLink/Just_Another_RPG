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

Game.prototype.startNewBattle = function()
{
    if(this.player.agility >this.currentEnemy.agility)
    {
        this.isPlayerTurn = true;
    }
    else
    {
        this.isPlayerTurn = false;
    }

    console.log("Your currents stats are: ");
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.battle = function()
{
    if(this.isPlayerTurn)
    {
        inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'Select your action',
            choices: ['Attack','Use Potion']
        }).then(({action})=>{
            if(action === 'Use Potion')
            {
                if(!this.player.getInventory())
                {
                    console.log("You don't have any potions");
                    return;
                }

                inquirer
                .prompt({
                    type: 'list',
                    name:'action',
                    message: 'Which potion would you use?',
                    choices: this.player.getInventory().map((item,index)=>`${index+1}:${item.name}`)
                }).then(({action})=>{
                    const potionDetails = action.split(': ');

                    this.player.usePotion(potionDetails[0] -1);
                    console.log(`You used a ${potionDetails[1]} potion`);
                });
            }
            else
            {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
            }
        });
    }
    else
    {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

module.exports = Game;