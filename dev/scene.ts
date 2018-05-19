class Scene {
    constructor() {
        var floor: Matter.Body = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width / 2, MatterManager.getInstance().canvas.height, MatterManager.getInstance().canvas.width, 200, {isStatic: true, render:{
            fillStyle: "#000"
        }});

        var wallLeft: Matter.Body = Matter.Bodies.rectangle(-25, MatterManager.getInstance().canvas.height / 2, 50, MatterManager.getInstance().canvas.height, {isStatic: true, render:{
            fillStyle: "#000"
        }});

        var wallRight: Matter.Body = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width + 25, MatterManager.getInstance().canvas.height / 2, 50, MatterManager.getInstance().canvas.height, {isStatic: true, render:{
            fillStyle: "#000"
        }});

        var block1: Matter.Body = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width, 500, 100, 100, {isStatic: true, render:{
            fillStyle: "#000"
        }});

        var block2: Matter.Body = Matter.Bodies.rectangle(MatterManager.getInstance().canvas.width / 2, 370, 550, 30, {isStatic: true, render:{
            fillStyle: "#000"
        }});

        var block3: Matter.Body = Matter.Bodies.rectangle(0, 270, 100, 50, {isStatic: true, render:{
            fillStyle: "#000"
        }});

        Matter.World.add (MatterManager.getInstance().engine.world, floor);
        Matter.World.add (MatterManager.getInstance().engine.world, wallLeft);
        Matter.World.add (MatterManager.getInstance().engine.world, wallRight);
        Matter.World.add (MatterManager.getInstance().engine.world, block1);
        Matter.World.add (MatterManager.getInstance().engine.world, block2);
        Matter.World.add (MatterManager.getInstance().engine.world, block3);
    }
}