export interface Levels {
    [level: number]: Level
}

export interface Level {
    level: number;
    question: string;
    answer: string;
    reward: number;
}

const levels: Levels = {
    1: {
        level: 1,
        question: 'hi five',
        answer: 'hi five',
        reward: 25
    },
    2: {
        level: 2,
        question: 'you rock',
        answer: 'you rock',
        reward: 25
    }
};

export default levels;