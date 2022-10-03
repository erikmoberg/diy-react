import renderAll from "../index";

const state: Array<[value: any, setValue: (val: any) => void]> = [];
let counter = 0;

function useState<T>(initialValue: T) : [value: T, setValue: (val: T) => void] {    

    var existing = state[counter];
    if (existing) {
        counter++;
        return existing;
    }

    var myCounter = counter;
    const setValue = (val: T) => {
        state[myCounter][0] = val;
        counter = 0;
        renderAll();
    };

    existing = state[counter] = [initialValue, setValue];

    counter++;
    return existing;
}

export default useState;