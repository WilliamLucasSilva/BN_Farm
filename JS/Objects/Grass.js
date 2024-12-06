import { Model } from "./model.js";
import { positions } from "../global.js";
import { grid } from "../grid.js";

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

export class Grass extends Model{
    constructor(place, gridIndex){
        super([192, 256], place, "../../../../Assets/grass.png", [3, 4]);

        this.startPlace = place
        this.gridIndex = gridIndex

        this.state = 'grass'
    }

    plow(){
        let brothers, pass = ''

        brothers = [
            grid.map[this.gridIndex[0] - 1][this.gridIndex[1]],
            grid.map[this.gridIndex[0] + 1][this.gridIndex[1]],
            grid.map[this.gridIndex[0]][this.gridIndex[1] - 1],
            grid.map[this.gridIndex[0]][this.gridIndex[1 + 1]],
        ]

        for(item in brothers){
            pass += item.state == plow? 'plow-' : 'none-'
        }
        pass.slice(1, -1)

        console.log(pass)
    }
}