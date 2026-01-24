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

        // Inicia o movimento da câmera IMEDIATAMENTE no clique
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
            // Não precisa de isClick aqui para a câmera.
            // O cam.move já lida com o deslocamento baseado no mouseLastCoords
            cam.move(coords);
        }
    });
}  
