export const addCounter = (list) => {
    return [...list, 0];
};

export const removeCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        ...list.slice(index+1)
    ];  
};

export const incrementCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index+1)
    ];
};
