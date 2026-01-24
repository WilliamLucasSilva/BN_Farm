import { GameObject } from "../../engine/GameObject.js";
import { SprSheet_Grass } from "../../assets/GrassSprSheet/GrassSprSheet.js";
import { mouse } from "../global.js";

const States = {
    grass: [1, 1],
    plow1: [2, 1],
    plow2: [3, 1],
    plow3: [1, 2],
    plow4: [2, 2],
    plow5: [3, 2],
    plow6: [1, 3],
    plow7: [2, 3],
    plow8: [3, 3],
    plow9: [1, 4],
    plow10: [2, 4],
}

export class Grass extends GameObject{
    constructor(coords, gridId){
        super(coords, [64,64], {type: "path", active: true, visible: true})
        this.setSprSheet(SprSheet_Grass.sprSheet)

        this.gridId = gridId
        this.state = 'grass'
    }
}
