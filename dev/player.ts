class Player {
    public body: Matter.Body;
    private impulseForceX: number = 0.005;
    private impulseForceY: number = 0.021;
    private maxVelocityX: number = 3;
    private impulsePositionX: number = 4;

    private maxAmountOfConsecutiveJumps = 2; // Player can only jump 2 times consecutively. This resets after touching floor.
    private jumpCounter = 0;

    private isChargingJump: boolean = false;

    private scaleX: number = 1;
    private scaleY: number = 1;//

    constructor() {

        this.body = Matter.Bodies.rectangle(500, 200, 27, 27, {
            render: {
                sprite: {
                    texture: './images/player.png',
                    xScale: 1,
                    yScale: 1
                }
            }
        });

        Matter.World.add(MatterManager.getInstance().engine.world, this.body);

        Matter.Events.on(MatterManager.getInstance().engine, 'collisionStart', (e) => {
            this.handleCollision(e);
        });

        document.addEventListener("keydown", (e) => {
            // console.log(e.keyCode);
            
            if(e.keyCode == 37) {
                if (this.jumpCounter < this.maxAmountOfConsecutiveJumps) {
                    this.jump(-this.impulseForceX, this.impulsePositionX);
                }
            } else if(e.keyCode == 39){
                if (this.jumpCounter < this.maxAmountOfConsecutiveJumps) {
                    this.jump(this.impulseForceX, -this.impulsePositionX);
                }
            }

            switch(e.keyCode){
                case 38:
                    if(!this.isChargingJump){
                        this.isChargingJump = true;
                        createjs.Tween.get (this).to ({scaleX: 1.5}, 150, createjs.Ease.sineOut);
                        createjs.Tween.get (this).to ({scaleY: 0.75}, 100, createjs.Ease.sineOut);
                    }
                    
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            switch(e.keyCode){
                case 38:
                    if(this.isChargingJump){
                        this.isChargingJump = false;
                        createjs.Tween.get (this).to ({scaleX: 1}, 300, createjs.Ease.getBackOut(5));
                        createjs.Tween.get (this).to ({scaleY: 1}, 300, createjs.Ease.getBackOut(5));
                        this.jumpUp(-0.03);
                    }
                    
                    break;
            }
        });
    }

    public update() {
        
        this.capVelocity();
        
        this.body.render.sprite.xScale = this.scaleX;
        this.body.render.sprite.yScale = this.scaleY;
        this.body.render.sprite.yOffset = (1 - (1 - this.scaleY)) / 2;
    }

    private jump(impulseForceX: number, impulsePositionX: number) {
        this.zeroVelocityY();
        Matter.Body.applyForce(this.body, {x: this.body.position.x + impulsePositionX, y: this.body.position.y}, {x: impulseForceX, y: -this.impulseForceY});
        this.jumpCounter++;
    }

    private jumpUp(impulseForceY: number) {
        // this.zeroVelocityY();
        Matter.Body.applyForce(this.body, {x: this.body.position.x, y: this.body.position.y}, {x: 0, y: impulseForceY});
        // this.jumpCounter++;
    }

    private handleCollision(e: Matter.IEventCollision<Matter.Engine>) {

        // When player touches floor -> reset jump counter.
        if (e.pairs[0].collision.normal.y < 0) {            
            this.jumpCounter = 0;
        }
    }

    // Puts a cap on x,y velocity so player won't moves too fast.
    private capVelocity() {
        if(this.body.velocity.x > this.maxVelocityX) {
            Matter.Body.setVelocity(this.body, {x: this.maxVelocityX, y:this.body.velocity.y});
        } else if(this.body.velocity.x < -this.maxVelocityX) {
            Matter.Body.setVelocity(this.body, {x: -this.maxVelocityX, y:this.body.velocity.y});
        }
    }

    // Resets y velocity to zero.
    private zeroVelocityY() {
        Matter.Body.setVelocity(this.body, {x: this.body.velocity.x, y: 0});
    }
}