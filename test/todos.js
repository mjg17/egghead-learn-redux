import expect from 'expect';
import deepFreeze from 'deep-freeze';

import todos from '../public/lib/reducers/todos';

describe ('todos', () => {
    it('should handle add_todo', () => {

        const stateBefore = [];
        const action = {
            type: 'ADD_TODO',
            id: 0,
            text: 'Learn Redux'
        };
        const stateAfter = [
            {
                id: 0,
                text: 'Learn Redux',
                completed: false
            }
        ];

        deepFreeze(stateBefore);
        deepFreeze(stateAfter);

        expect(
            todos(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('should handle toggle_todo', () => {
        const stateBefore = [
            {
                id: 0,
                text: 'Learn Redux',
                completed: false
            },
            {
                id: 1,
                text: 'Go shopping',
                completed: false
            }
        ];
        const action = {
            type: 'TOGGLE_TODO',
            id: 1
        };
        const stateAfter = [
            {
                id: 0,
                text: 'Learn Redux',
                completed: false
            },
            {
                id: 1,
                text: 'Go shopping',
                completed: true
            }
        ];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(
            todos(stateBefore, action)
        ).toEqual(stateAfter);
    });
});
