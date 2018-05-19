class MatterManager {
    private static instance: MatterManager;

    public canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    public engine : Matter.Engine;
    public render : Matter.Render;

    private constructor() {
        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.canvasContext = this.canvas.getContext('2d') as CanvasRenderingContext2D;

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

    public static getInstance() {
        if (! MatterManager.instance) {
            MatterManager.instance = new MatterManager();
        }
        return MatterManager.instance;
    }
}