import expect from 'expect';

function counter(state, action) {
    if (action.type === 'INCREMENT') {
        return state + 1;
    } else if (action.type === 'DECREMENT') {
        return state - 1;
    }
}

describe ('counter', () => {
    it('should handle increment', () => {
        expect (
            counter(0, { type: 'INCREMENT' })
        ).toEqual(1);

        expect (
            counter(1, { type: 'INCREMENT' })
        ).toEqual(2);
    });

    it('should handle decrement', () => {
        expect (
            counter(2, { type: 'DECREMENT' })
        ).toEqual(1);

        expect (
            counter(1, { type: 'DECREMENT' })
        ).toEqual(0);
    });
});