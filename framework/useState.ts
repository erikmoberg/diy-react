import { renderRoot } from "./createRoot";

const state: Array<[value: any, setValue: (val: any) => void]> = [];
let counter = 0;

export function useState<T>(initialValue: T) : [value: T, setValue: (val: T) => void] {

    var myCounter = counter;
    counter++;

    var existing = state[myCounter];
    if (existing !== undefined) {
        return existing;
    }

    const setValue = (val: T) => {
        state[myCounter][0] = val;
        counter = 0;

        // re-render everything
        renderRoot();
    };

    existing = state[myCounter] = [initialValue, setValue];
    return existing;
}