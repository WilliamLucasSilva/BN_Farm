import { World } from "./World.js";
import { Cam } from "../engine/Cam.js";

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

/** @type {[width:number, height:number]} */
export const canvas_size = [canvas.width, canvas.height]


export const canvas_info = {
    canvas: canvas,
    ctx: ctx,
    size: canvas_size
}


/** @type {{
 *   down: [x: number, y: number],
 *   up: [x: number, y: number],
 *   move: [x: number, y: number],
 *   isClick: boolean,
 *   isHolding: boolean,
 * }}
 */
export const mouse = {
    down: [0, 0],
    up: [0, 0],
    move: [0, 0],
    isClick: false,
    isHolding: false,
}

export const world = new World([100, 100], 64)
export const cam = new Cam([300, 300], canvas_size,
    [world.size[0] * world.gap, world.size[1] * world.gap])

