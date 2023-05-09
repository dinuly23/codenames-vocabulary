import {Move} from './move.interface'
import {Card} from './card.interface'
 
export interface GameData {
    id: string,
    redLeft: number,
    blueLeft: number,
    move: Move,
    isFinished: boolean,
    gameInChain: number,
    log: [],
    board: Card []
}
