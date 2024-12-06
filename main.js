import { mouseEvents } from "./JS/mouseEvent.js";
import { grid } from "./JS/grid.js";
import { ctx } from "./JS/global.js";
import { isHolding } from "./JS/mouseEvent.js";
import { cam } from "./JS/Cam.js";

function startGame() {
    mouseEvents();

    game();
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grid.draw();

    if(isHolding){
        cam.move()
    }

    window.requestAnimationFrame(game);
}

startGame();