import expect from 'expect';
import counter from '../src/counter';

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

    it('should handle unknown actions', () => {
        expect (
            counter(1, { type: 'SOMETHING_ELSE' })
        ).toEqual(1);
    });

    it('should handle initial state', () => {
        expect (
            counter(undefined, { type: 'SOMETHING_ELSE' })
        ).toEqual(0);
    });

});
