import expect from 'expect';
import { addCounter, removeCounter, incrementCounter } from '../public/lib/reducers/multiCounter';
import deepFreeze from 'deep-freeze';

describe ('addCounter', () => {
    it('should add a counter', () => {
        const listBefore = [];
        const listAfter  = [0];

        deepFreeze(listBefore);

        expect(
            addCounter(listBefore)
        ).toEqual(listAfter);
    });
});

describe ('removeCounter', () => {
    it('should remove a counter', () => {
        const listBefore = [0, 10, 20];
        const listAfter  = [0, 20];

        deepFreeze(listBefore);

        expect(
            removeCounter(listBefore, 1)
        ).toEqual(listAfter);
    });
});

describe ('incrementCounter', () => {
    it('should increment a counter', () => {
        const listBefore = [0, 10, 20];
        const listAfter  = [0, 11, 20];

        deepFreeze(listBefore);

        expect(
            incrementCounter(listBefore, 1)
        ).toEqual(listAfter);
    });
});