import { canvas } from "./global.js";
import { positions } from "./global.js";
import { grid } from "./grid.js";

class Cam {
    constructor() {
        //states info
        this.size = [canvas.width, canvas.height]
        this.movement = [0, 0]
        this.place = [0, 0]

        //movement info
        this.isMoving = false;
        this.lastMousePlace = null;
    }

    startMove(mouseDownPosition) {
        this.isMoving = true;
        this.lastMousePlace = mouseDownPosition;
    }

    update(deltaX, deltaY) {
        if (!this.isMoving) return;


        // Atualiza a posição da câmera com o deslocamento do mouse
        this.movement[0] += deltaX;
        this.movement[1] += deltaY;

        // Respeita os limites do mapa
        this.movement[0] = (Math.min(this.movement[0], grid.realSize[0] - this.size[0])) / 2
        this.movement[1] = (Math.min(this.movement[1], grid.realSize[1] - this.size[1])) / 2

        this.place[0] += this.movement[0]
        this.place[1] += this.movement[1]

        this.collision()
    }

    collision(){
        if(this.place[0] * -1 < 0){
            this.place[0] = 0
        }

        if(this.place[1] * -1 < 0){
            this.place[1] = 0
        }

        if(this.place[0] * -1 > grid.realSize[0] - this.size[0]){
            this.place[0] = (grid.realSize[0] - this.size[0]) * -1
        }

        if(this.place[1] * -1 > grid.realSize[1] - this.size[1]){
            this.place[1] = (grid.realSize[1] - this.size[1]) * -1
        }
    }

    move() {
        if (positions.mouseMove && this.lastMousePlace) {
            const deltaX = positions.mouseMove[0] - this.lastMousePlace[0];
            const deltaY = positions.mouseMove[1] - this.lastMousePlace[1];
            this.update(deltaX, deltaY);

            this.lastMousePlace = positions.mouseMove;
        }
    }

    endMove() {
        this.isMoving = false;
        this.lastMousePlace = null;
        this.movement = [0, 0]
    }
}

export const cam = new Cam();
