class Game {
    private player: Player;
    private scene: Scene;

    constructor() {
        this.player = new Player();
        this.scene = new Scene();

        this.gameLoop();
    }

    gameLoop() {
        
        this.player.update();

        requestAnimationFrame(() => this.gameLoop())
    }
}