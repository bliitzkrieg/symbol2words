export interface Solutions {
    [level: number]: Solution
}

export interface Solution {
    level: number;
    question: string;
    answer: string;
    reward: number;
}

const levels: Solutions = {
    1: {
        level: 1,
        question: 'hi five',
        answer: 'hi five',
        reward: 25
    },
    2: {
        level: 2,
        question: 'hi five',
        answer: 'hi five',
        reward: 25
    }
};

export default levels;