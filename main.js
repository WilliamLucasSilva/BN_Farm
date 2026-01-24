import { mouseEvents } from "./JS/mouseEvent.js";
import { cam, canvas_info, ctx, mouse, world } from "./JS/global.js";






function startGame() {
    mouseEvents();

    game();
}

function game() {
    ctx.clearRect(0, 0, canvas_info.size[0], canvas_info.size[1]);

    
    ctx.save();
    ctx.translate(-cam.coord[0], -cam.coord[1]);
    
    
    world.draw(ctx, [cam.coord, cam.bounds()])
    ctx.restore();

    

    window.requestAnimationFrame(game);
}

startGame();