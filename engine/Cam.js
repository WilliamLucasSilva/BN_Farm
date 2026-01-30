/**
 * @typedef {[number, number]} Vec2
 * @typedef {[number, number]} Size2D
 */

export class Cam{



    /**
     * create a cam
     * @param {[x:number, y:number]} coords - initial coords
     * @param {[width:number, height:number]} size - cam size 
     * @param {[width:number, height:number]} wSize - world size 
     */
    constructor(coords, size, wSize){



        /** @type {Vec2} */
        this.coord = [...coords]

        /** @type {Size2D} */
        this.size = [...size]

        /** @type {Size2D} */
        this.worldSize = [...wSize]

        this.isMoving = false
        this.mouseLastCoords = [0, 0] // number[]
    }

    /**
     * 
     * @param {[x:number, y:number]} coords - initial move coords
     */
    startMove(coords) {
        this.isMoving = true;
        this.mouseLastCoords = [...coords];
    }

    /**
     * @param {[x:number, y:number]} point - the new location point
     */
    applyBoundaries(point){
        const maxX = Math.max(0, this.worldSize[0] - this.size[0]);
        const maxY = Math.max(0, this.worldSize[1] - this.size[1]);

        this.coord[0] = Math.max(0, Math.min(point[0], maxX));
        this.coord[1] = Math.max(0, Math.min(point[1], maxY));
    }

    /** 
    * @param {[x:number, y:number]} coords - mouse coords
    */
    move(coords) {
        

        //AB vector
        /** @type {[x: number, y: number]} */
        const movVector = [coords[0] - this.mouseLastCoords[0], coords[1] - this.mouseLastCoords[1]]
        
        
        /** @type {[x: number, y: number]} */
        let newOriginPoint = [this.coord[0] - movVector[0], this.coord[1] - movVector[1]]


        this.mouseLastCoords = [...coords]

        this.applyBoundaries(newOriginPoint)
    }

    endMove() {
        this.isMoving = false;
        this.mouseLastCoords = [0, 0];
    }

    bounds(){
        /** @type {[x:number, y:number]} */
        let bounds = [this.coord[0] + this.size[0], this.coord[1] + this.size[1]]
        return bounds
    }

    /**
     * 
     * @param {Vec2} coords 
     * @returns {Vec2}
     */
    toR2Coords(coords){
        return [coords[0] + this.coord[0], coords[1] + this.coord[1]]
    }
}