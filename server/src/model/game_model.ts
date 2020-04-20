import { bindClass } from '../core/bind_class';
import { Agent } from './agent';
import { Side } from './agent_side';
import { GameEvent, GameEventKind } from './game_log_item';
import { GameMove } from './game_move';
import { PlayerSide } from './player_side';
import shuffle = require('shuffle-array');
import uuid = require('uuid');

export class GameModel {
    readonly boardSize = 25;
    readonly id = uuid.v4();

    gameControl = false;  // If true model will restrict uncovering not in a turn
    board: Agent[] = [];
    move: GameMove = {
        hint: '',
        count: 0,
        isFinished: false,
        isInited: false,
        side: Side.RED     // Just init
    };
    events: GameEvent[] = [];

    redLeft = (this.boardSize - 1) / 3;
    blueLeft = (this.boardSize - 1) / 3;
    isFinished = false;
    lastModified = new Date();

    prevGame?: GameModel;  // Previous game in chain
    nextGame?: GameModel;  // Next game in chain
    gameInChain = 1;       // Counter of games in chain

    constructor() {
        bindClass(this);
    }

    get nextGameId(): string {
        return this.nextGame?.id || '';
    }

    init(names: string[]) {
        if (!names || names.length < this.boardSize)
            throw Error(`Game needs at least ${this.boardSize} words for init.`);

        const boardConfig = GameModel.createRandomizedAgentsSidesList(this.boardSize);
        this.move = {
            side: boardConfig.firstMove,
            hint: '',
            count: 0,
            isFinished: false,
            isInited: false
        };
        this.move.side == Side.BLUE
            ? this.blueLeft += 1
            : this.redLeft += 1;

        this.board = [];
        for (let i = 0; i < this.boardSize; i++) {
            this.board.push({
                index: i,
                name: names.pop()!,
                side: boardConfig.sides.pop()!,
                uncovered: false
            });
        }
    }

    uncoverAgent(index: number) {
        const agent = this.board[index];
        const moveAllowed = !this.gameControl || (this.move.isInited && !this.move.isFinished);

        if (!agent || agent.uncovered || this.isFinished || !moveAllowed)
            return null;

        agent.uncovered = true;
        this.events.push({
            kind: GameEventKind.AgentUncovered,
            side: agent.side,
            index
        });

        if (agent.side == Side.BLUE) {
            this.blueLeft -= 1;
        }
        else if (agent.side == Side.RED) {
            this.redLeft -= 1;
        }

        if (this.gameControl) {
            this.move.count -= 1;

            if (agent.side != this.move.side || this.move.count == 0)
                this.move.isFinished = true;
        }

        this.lastModified = new Date();

        if (!this.redLeft || !this.blueLeft || agent.side == Side.ASSASSIN) {
            this.move.isFinished = true;
            this.isFinished = true;

            const sideWinner = agent.side == Side.ASSASSIN
                ? this.move.side == Side.RED ? Side.BLUE : Side.RED
                : this.move.side;

            this.events.push({
                kind: GameEventKind.GameFinished,
                sideWinner
            });
        }

        return agent;
    }

    commitHint(hint: string, matchCount: number) {
        if (this.isFinished)
            return false;

        const side = this.move.isInited
            ? this.move.side
            : this.move.side == Side.BLUE ? Side.RED : Side.BLUE;

        this.move = {
            hint,
            side,
            count: matchCount == 0 ? this.boardSize : matchCount,
            isInited: true,
            isFinished: false
        };

        this.events.push({
            kind: GameEventKind.SpymasterHint,
            hint,
            side,
            matchCount: this.move.count
        });

        return this.move;
    }

    private static createRandomizedAgentsSidesList(boardSize: number) {
        const sideSize = (boardSize - 1) / 3;

        const sides: Side[] = [
            ...Array(sideSize - 1).fill(Side.NEUTRAL), Side.ASSASSIN,
            ...Array(sideSize).fill(Side.BLUE),
            ...Array(sideSize).fill(Side.RED)
        ];

        const firstMove: PlayerSide =
            Math.random() > 0.5
                ? Side.RED
                : Side.BLUE;

        sides.push(firstMove);
        return { sides: shuffle(sides), firstMove };
    }
}
