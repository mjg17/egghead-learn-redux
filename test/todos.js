import expect from 'expect';
import deepFreeze from 'deep-freeze';

import todoApp from '../public/lib/reducers/todos';

describe ('todoApp', () => {
    it('should handle add_todo', () => {

        const stateBefore = {};
        const action = {
            type: 'ADD_TODO',
            id: 0,
            text: 'Learn Redux'
        };
        const stateAfter = {
            todos: [
                {
                    id: 0,
                    text: 'Learn Redux',
                    completed: false
                }
            ],
            visibilityFilter: 'SHOW_ALL'
        };

        deepFreeze(stateBefore);
        deepFreeze(stateAfter);

        expect(
            todoApp(stateBefore, action)
        ).toEqual(stateAfter);
    });

    it('should handle toggle_todo', () => {
        const stateBefore = {
            todos: [
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
            ],
            visibilityFilter: 'SHOW_COMPLETED'
        };
        const action = {
            type: 'TOGGLE_TODO',
            id: 1
        };
        const stateAfter = {
            todos: [
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
            ],
            visibilityFilter: 'SHOW_COMPLETED'
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(
            todoApp(stateBefore, action)
        ).toEqual(stateAfter);
    });
    
    it('should handle set_visibilytFilter', () => {
        const stateBefore = {
            todos: [
                {
                    id: 0,
                    text: 'Learn Redux',
                    completed: false
                },
            ],
            visibilityFilter: 'SHOW_ALL'
        };
        const action = {
            type: 'SET_VISIBILITY_FILTER',
            filter: 'SHOW_COMPLETED'
        };
        const stateAfter = {
            todos: [
                {
                    id: 0,
                    text: 'Learn Redux',
                    completed: false
                },
            ],
            visibilityFilter: 'SHOW_COMPLETED'
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(
            todoApp(stateBefore, action)
        ).toEqual(stateAfter);
    });
});
