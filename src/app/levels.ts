export interface Levels {
    [level: number]: Level
}

export interface Level {
    level: number;
    question: string;
    answer: string;
    reward: number;
    puzzle: string[];
}

const levels: Levels = {
    1: {
        level: 1,
        question: 'food bank',
        answer: 'food bank',
        reward: 25,
        puzzle: ['cutlery', 'bank']
    },
    2: {
        level: 2,
        question: 'you rock',
        answer: 'you rock',
        reward: 25,
        puzzle: []
    },
    3: {
        level: 3,
        question: 'catwalk',
        answer: 'catwalk',
        reward: 25,
        puzzle: []
    },
    4: {
        level: 3,
        question: 'i love you',
        answer: 'i love you',
        reward: 25,
        puzzle: []
    }
};

export default levels;