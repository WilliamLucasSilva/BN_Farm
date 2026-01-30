import { canvas, mouse, world } from "./global.js";
import { cam } from "./global.js";
import { selector } from "./Objects/Selector.js";

/**
 * Calcula a posição do mouse relativa ao canvas
 * @param {MouseEvent} e 
 * @returns {[x:number, y:number]}
 */
function getXY(e){
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    /** @type {[x:number, y:number]} */
    let coords = [x, y]
    return coords;
}

export function mouseEvents() {

    // Define uma tolerância de pixels. Se mover menos que isso, é considerado click.
    const CLICK_TOLERANCE = 5; 

    document.addEventListener("mousedown", (e) => {
        const coords = getXY(e);
        mouse.down = coords; // Salva onde o clique começou
        mouse.isHolding = true;

        // Inicia o movimento da câmera
        cam.startMove(coords); 
    });

    //

    document.addEventListener("mouseup", (e) => {
        const coords = getXY(e);
        mouse.isHolding = false;
        
        // Finaliza movimento da câmera
        cam.endMove();

        // LÓGICA DE CLICK:
        // Verifica a distância entre onde o mouse desceu (mouse.down) e onde subiu (coords)
        /** @type {number} */
        const distX = Math.abs(coords[0] - mouse.down[0]);
        /** @type {number} */
        const distY = Math.abs(coords[1] - mouse.down[1]);

        if (distX < CLICK_TOLERANCE && distY < CLICK_TOLERANCE) {
            let tile = world.search(world.toGridCoord(cam.toR2Coords(mouse.down), world.gap))
            tile.object.get(0).plow(tile.neighbors)

            
            mouse.isClick = true; // Opcional: sinaliza que foi click
        } else {
            mouse.isClick = false; // Foi um arraste
        }
    });

    //

    document.addEventListener("mousemove", (e) => {
        const coords = getXY(e);
        mouse.move = coords;

        selector.changeWorldTIle(mouse.move)

        if (mouse.isHolding) {
            cam.move(coords);
        }
    });
}