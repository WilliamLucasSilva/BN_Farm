import { positions } from "./global.js";
import { cam } from "./Cam.js";
import { grid } from "./grid.js";

export var isHolding = false;
let holdTimeout, click; 

function getXY(e){
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    return [x,y];
}

export function mouseEvents() {
    document.addEventListener("mousedown", (e) => {
        positions.mouseDown = getXY(e);

        click = true
        isHolding = true
    });

    document.addEventListener("mouseup", (e) => {
        positions.mouseUp = getXY(e);

        if(click){
            console.log(grid.quadTree)
        }

        click = false
        isHolding = false
        cam.endMove()
    });

    document.addEventListener("mousemove", (e) => {
        positions.mouseMove = getXY(e);

        if(isHolding){
            if(click){
                click = false
                cam.startMove(positions.mouseDown)
            }
            cam.move()
        }
    });
}
