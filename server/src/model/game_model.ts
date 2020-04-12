import { Agent } from '../api/agent';
import { AgentSide } from '../api/agent_side';
import { Game } from '../api/game';
import { bindClass } from '../core/bind_class';
import shuffle = require('shuffle-array');
import uuid = require('uuid');

export class GameModel implements Game {
    readonly boardSize = 25;
    readonly id = uuid.v4();

    board: Agent[] = [];
    firstTurn = AgentSide.UNKNOWN;
    redsLeft = (this.boardSize - 1) / 3;
    bluesLeft = (this.boardSize - 1) / 3;
    isFinished = false;
    lastModified = new Date();
    nextGameId = '';

    constructor() {
        bindClass(this);
    }

    init(names: string[]) {
        if (!names || names.length < this.boardSize)
            throw Error(`We need at least ${this.boardSize} words for a game`);

        const boardConfig = GameModel.createRandomizedAgentsSidesList();
        this.firstTurn = boardConfig.firstTurnSide;
        this.firstTurn == AgentSide.BLUE
            ? this.bluesLeft += 1
            : this.redsLeft += 1;

        this.board = [];
        for (let i = 0; i < this.boardSize; i++) {
            this.board.push({
                index: i,
                name: names.pop()!,
                side: boardConfig.sides.pop()!,
                uncovered: false
            });
        }
        return this;
    }

    uncoverAgent(index: number) {
        this.lastModified = new Date();

        const agent = this.board[index];
        if (agent && !agent.uncovered) {
            agent.uncovered = true;

            if (agent.side == AgentSide.BLUE)
                this.bluesLeft -= 1;

            if (agent.side == AgentSide.RED)
                this.redsLeft -= 1;
        }

        if (!this.redsLeft || !this.bluesLeft || agent.side == AgentSide.BLACK)
            this.isFinished = true;

        return agent;
    }

    private static createRandomizedAgentsSidesList() {
        const sides: AgentSide[] = [
            ...Array(7).fill(AgentSide.NEUTRAL), AgentSide.BLACK,
            ...Array(8).fill(AgentSide.BLUE),
            ...Array(8).fill(AgentSide.RED)
        ];

        const firstTurnSide = Math.random() > 0.5 ? AgentSide.RED : AgentSide.BLUE;
        sides.push(firstTurnSide);
        shuffle(sides);
        return { sides, firstTurnSide };
    }
}
