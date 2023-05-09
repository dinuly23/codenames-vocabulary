import { Side } from './agent_side';

export interface Agent {
    readonly index: number;
    readonly name: string | undefined;
    readonly transcript: string | undefined;
    side: Side;
    uncovered: boolean;
}
