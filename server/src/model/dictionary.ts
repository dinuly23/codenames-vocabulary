import { Word } from "./word";

export interface Dictionary {
    name: string;
    description: string
    warning: boolean;

    getWords(): Word[];
    getRandomWords(count: number): Word[];
}
