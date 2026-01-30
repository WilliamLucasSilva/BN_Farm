import { Selector_SprSheet } from "../../spriteSheets/SprSelector.js";
import { GameObject } from "../../engine/GameObject.js";
import { cam, world } from "../global.js";

/**
 * @typedef {[number, number]} Vec2
 * @typedef {[number, number]} Size2D
 */


class Selector extends GameObject{
    constructor(){
        super([0, 0], [64, 64], {type: "especialObjetc", active: true, visible: true})

        /** @type {Vec2} */
        this.worldCoord = [0, 0]

        /** @type {Vec2} */
        this.lastCoord = [0, 0]

        this.setSprSheet(Selector_SprSheet)

        world.search(world.toGridCoord(this.coords, world.gap)).object.add(this)
    }

    /**
     * 
     * @param {Vec2} coords 
     */
    toWorldId(coords){
        this.lastCoord = [...this.worldCoord]
        this.worldCoord = world.toGridCoord(cam.toR2Coords(coords), world.gap)

        /** @type {Vec2} */
        let newCoords = [this.worldCoord[0] * world.gap[0], this.worldCoord[1] * world.gap[1]]
        this.coords = newCoords
    }

    /**
     * 
     * @param {Vec2} coords 
     */
    changeWorldTIle(coords){
        this.toWorldId(coords)

        let lastTile = world.search(this.lastCoord)
        let newTile = world.search(this.worldCoord)

        newTile.object.add(this)
        
        lastTile.object.remove(this)  
    }
}

export const selector = new Selector()
