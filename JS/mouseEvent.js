import { canvas, mouse } from "./global.js";
import { cam } from "./global.js";


function getXY(e){
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    /** @type {[x:number, y:number]} */
    let coords = [x, y]
    return coords;
}

export function mouseEvents() {

    document.addEventListener("mousedown", (e) => {
        const coords = getXY(e);
        mouse.down = coords;
        mouse.isHolding = true;

        cam.startMove(coords); 
    });

    //

    document.addEventListener("mouseup", (e) => {
        mouse.isHolding = false;
        cam.endMove();
    });

    //

    document.addEventListener("mousemove", (e) => {
        const coords = getXY(e);
        mouse.move = coords;

        if (mouse.isHolding) {
            cam.move(coords);
        }
    });
}  
