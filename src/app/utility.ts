// Suppresses Array.From TS error
interface ArrayConstructor {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

export const MAX_CHARACTERS = 12;

export function shuffleArray(array: any[] = []): any[] {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export function buildRandomCharacters(length: number): string {
    let text = "";
    const possible = "abcdefghijklmnopqrstuvwxyz";

    for( let i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function convertStringToArray(value: string): string[] {
    return Array.from(value);
}