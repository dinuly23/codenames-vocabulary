import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as shuffle from 'shuffle-array';
import { Dictionary } from './dictionary';
import { Word } from './word';

export class LocalDictionaryImpl implements Dictionary {
    /**
     * Flag to pay attention to this dict (because of age restriction, explicit words, etc)
     */
    warning = false;

    name = '';
    description = '';
    dictionary: Word[] = [];

    constructor(fileName?: string) {
        if (fileName)
            this.loadFromFile(fileName);
    }

    getWords() {
        return this.dictionary;
    }

    getRandomWords(count: number) {
        const markers = shuffle([
            ...Array(count).fill(true),
            ...Array(this.dictionary.length - count).fill(false)
        ]);
        return this.dictionary.filter((value, index) => markers[index] === true);
    }

    private loadFromFile(fileName: string) {
        const doc = yaml.safeLoad(fs.readFileSync(fileName, 'utf8'));
        // Filter out possible input mistakes (just in case)
        const words = String(doc.words)
            .split(/[\s;,]+/)
            .map(w => w.trim())
            .filter(w => w != '');
        const transcripts = String(doc.transcripts)
            .split(/[\s;,]+/)
            .map(w => w.trim())
            .filter(w => w != '');
        const wordList: Word[] = [];
        for (let i = 0; i < words.length; ++i) {
            wordList.push(<Word> {
                name: words[i],
                transcript: transcripts[i]
            })
        }

        this.dictionary = wordList;
        this.name = String(doc.name);
        this.description = String(doc.description);
        this.warning = Boolean(doc.warn);
    }
}
