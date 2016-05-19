import todoApp from 'lib/reducers/todos';

import { createStore } from 'redux';
import React           from 'react';
import ReactDOM        from 'react-dom';

// create the store for our mini-app using the counter reducer
const store = createStore(todoApp);

const { Component } = React;

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (currentFilter === filter) {
      return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter 
        });
      }}
    >
    {children}
    </a>
  );
};

const Todo = ({
    onClick,
    completed,
    text
}) => ( // equiv to { return ( ... )}
    <li onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>
      {text}
    </li>
)

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
         )}
    </ul>
)

const AddTodo = ({
    onAddClick
}) => {
    let input;
    return (
        <div>
        <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {
          onAddClick(input.value);
          input.value = '';
        }}>
          Add Todo
        </button>
        </div>
    );
}
const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    const {
      todos,
      visibilityFilter
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
    return (
      <div>
        <AddTodo
            onAddClick={
                value => store.dispatch({
                    type: 'ADD_TODO',
                    text: value,
                    id: nextTodoId++
                })
            }
        />
        <TodoList
            todos={visibleTodos}
            onTodoClick={
                id => store.dispatch({
                        type: 'TOGGLE_TODO',
                        id
                      })
            }
        />
        <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            currentFilter={visibilityFilter}
          >
          All
          </FilterLink>
          {', '}
          <FilterLink
            filter='SHOW_ACTIVE'
            currentFilter={visibilityFilter}
          >
          Active
          </FilterLink>
          {', '}
          <FilterLink
            filter='SHOW_COMPLETED'
            currentFilter={visibilityFilter}
          >
          Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  );
};

store.subscribe(render); // all actions re-render the DOM
render(); // render the initial state of the page/app
