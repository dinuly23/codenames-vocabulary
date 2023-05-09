import { Word } from "model/word";

export interface DictionaryDescription {
    name: string;
    description: string;
    warning: boolean;
    words_example: Word[];
}
