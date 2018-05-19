"use strict";
var game;
window.onload = function () {
    game = new Game();
};
var Game = (function () {
    function Game() {
        this.player = new Player();
        this.scene = new Scene();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
var MatterManager = (function () {
    function MatterManager() {
        this.canvas = document.getElementById("game");
        this.canvasContext = this.canvas.getContext('2d');
        this.engine = Matter.Engine.create();
        Matter.Engine.run(this.engine);
        this.render = Matter.Render.create({
            canvas: this.canvas,
            engine: this.engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
                background: "#ffffff"
            }
        });
        Matter.Render.run(this.render);
    }
    MatterManager.getInstance = function () {
        if (!MatterManager.instance) {
            MatterManager.instance = new MatterManager();
        }
        return MatterManager.instance;
    };
    return MatterManager;
}());
var Player = (function () {
    function Player() {
        var _this = this;
        this.impulseForceX = 0.005;
        this.impulseForceY = 0.021;
        this.maxVelocityX = 3;
        this.impulsePositionX = 4;
        this.maxAmountOfConsecutiveJumps = 2;
        this.jumpCounter = 0;
        this.body = Matter.Bodies.rectangle(500, 200, 30, 30, { render: {
                fillStyle: "#000"
            } });
        Matter.World.add(MatterManager.getInstance().engine.world, this.body);
        Matter.Events.on(MatterManager.getInstance().engine, 'collisionStart', function (e) {
            _this.handleCollision(e);
        });
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 37) {
                if (_this.jumpCounter < _this.maxAmountOfConsecutiveJumps) {
                    _this.jump(-_this.impulseForceX, _this.impulsePositionX);
                }
            }
            else if (e.keyCode == 39) {
                if (_this.jumpCounter < _this.maxAmountOfConsecutiveJumps) {
                    _this.jump(_this.impulseForceX, -_this.impulsePositionX);
                }
            }
        });
    }
    Player.prototype.update = function () {
        this.capVelocity();
    };
    Player.prototype.jump = function (impulseForceX, impulsePositionX) {
        this.zeroVelocityY();
        Matter.Body.applyForce(this.body, { x: this.body.position.x + impulsePositionX, y: this.body.position.y }, { x: impulseForceX, y: -this.impulseForceY });
        this.jumpCounter++;
    };
    Player.prototype.handleCollision = function (e) {
        if (e.pairs[0].collision.normal.y < 0) {
            this.jumpCounter = 0;
        }
    };
    Player.prototype.capVelocity = function () {
        if (this.body.velocity.x > this.maxVelocityX) {
            Matter.Body.setVelocity(this.body, { x: this.maxVelocityX, y: this.body.velocity.y });
        }
        else if (this.body.velocity.x < -this.maxVelocityX) {
            Matter.Body.setVelocity(this.body, { x: -this.maxVelocityX, y: this.body.velocity.y });
        }
    };
    Player.prototype.zeroVelocityY = function () {
        Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y: 0 });
    };
    return Player;
}());
var Scene = (function () {
    function Scene() {
        var floor = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width / 2, MatterManager.getInstance().canvas.height, MatterManager.getInstance().canvas.width, 200, { isStatic: true, render: {
                fillStyle: "#000"
            } });
        var wallLeft = Matter.Bodies.rectangle(-25, MatterManager.getInstance().canvas.height / 2, 50, MatterManager.getInstance().canvas.height, { isStatic: true, render: {
                fillStyle: "#000"
            } });
        var wallRight = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width + 25, MatterManager.getInstance().canvas.height / 2, 50, MatterManager.getInstance().canvas.height, { isStatic: true, render: {
                fillStyle: "#000"
            } });
        var block1 = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width, 500, 100, 100, { isStatic: true, render: {
                fillStyle: "#000"
            } });
        var block2 = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width / 2, 370, 550, 30, { isStatic: true, render: {
                fillStyle: "#000"
            } });
        var block3 = Matter.Bodies.rectangle(0, 270, 100, 50, { isStatic: true, render: {
                fillStyle: "#000"
            } });
        Matter.World.add(MatterManager.getInstance().engine.world, floor);
        Matter.World.add(MatterManager.getInstance().engine.world, wallLeft);
        Matter.World.add(MatterManager.getInstance().engine.world, wallRight);
        Matter.World.add(MatterManager.getInstance().engine.world, block1);
        Matter.World.add(MatterManager.getInstance().engine.world, block2);
        Matter.World.add(MatterManager.getInstance().engine.world, block3);
    }
    return Scene;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.ToRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map