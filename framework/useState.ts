import renderAll from "../index";

const state: Array<[value: any, setValue: (val: any) => void]> = [];
let counter = 0;

function useState<T>(initialValue: T) : [value: T, setValue: (val: T) => void] {

    var myCounter = counter;
    counter++;

    var existing = state[myCounter];
    if (existing !== undefined) {
        return existing;
    }

    
    const setValue = (val: T) => {
        state[myCounter][0] = val;
        counter = 0;

        // Hack
        renderAll();
    };

    existing = state[myCounter] = [initialValue, setValue];

    counter++;
    return existing;
}

export default useState;