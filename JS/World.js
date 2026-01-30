import { Grass } from "./Objects/Grass.js";
import { Grid } from "../engine/dataStructure/Grid.js";

/** @typedef {[x:number, y:number]} vec2 */

export class World extends Grid{
    
    /**
     * World constructor
     * 
     * @param {[width:number, height:number]} size - The grid size
     * @param {[width:number, height:number]} gap - the gap of the nodes
     */
    constructor(size,gap){
        super(size)

        /** @type {vec2} */
        this.gap = gap

        this.forEachNode(
            
        /**
         * @param {import("../engine/dataStructure/Grid.js").Node} nodes
         * @param {vec2} coords
         */
        (nodes, coords) => {
            nodes.object.add(
                new Grass(
                    [coords[0] * this.gap[0], coords[1] * this.gap[1]],
                    coords
                ))
        })}

        /**
         * draw the tile in map
         * 
         * @param {CanvasRenderingContext2D} ctx - the canvas context
         * @param {[init:vec2, end:vec2]} area - grid area
        */
        draw(ctx, area){
            let newArea = [this.toGridCoord(area[0], this.gap), this.toGridCoord(area[1], this.gap)]


            
            this.forEachNode(
            
            /**
             * @param {import("../engine/dataStructure/Grid.js").Node} nodes
             * @param {vec2} coords
             */
            (nodes, coords) => {
                nodes.object.forEach((e) => {
                    e.draw(ctx)
                })
            }, newArea[0], [newArea[1][0] + 1, newArea[1][1] + 1])
        }
    
}
