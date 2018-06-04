class Game {
    private player: Player;
    private scene: Scene;

    constructor() {
        this.player = new Player();
        this.scene = new Scene();

        // this.gameLoop();
        Matter.Events.on(MatterManager.getInstance().engine, "beforeUpdate", this.gameLoop.bind(this));
        createjs.Ticker.framerate = 60;
    }

    gameLoop() {
        
        this.player.update();

        // Matter.Render.lookAt(MatterManager.getInstance().render, this.player.body);

        // requestAnimationFrame(() => this.gameLoop())
    }
}