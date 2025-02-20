class Player {
    constructor(game) {
        this.game = game;
        this.width = 128;
        this.height = 128;
        this.x = 20;
        this.y = 100;
        this.speedY = 0;
        this.speedX = 0;
    }
    update(){
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
                else this.speedY = 0;
        if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
            else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}