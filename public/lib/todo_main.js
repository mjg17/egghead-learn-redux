import React           from 'react';
import ReactDOM        from 'react-dom';

const { Component } = React;

const Link = ({
  active,
  onClick,
  children
}) => {
  if (active) {
      return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
    {children}
    </a>
  );
};

import { connect } from 'react-redux';

const mapStateToLinkProps = (
    state,
    ownProps
) => {
    return {
        active: state.visibilityFilter === ownProps.filter
    };
};
const mapDispatchToLinkProps = (
    dispatch,
    ownProps
) => {
    return {
        onClick: () => {
            dispatch({
                type:   'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            })
        }
    };
};
const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

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

let nextTodoId = 0;
let AddTodo = ({ dispatch }) => { // second arg is context
    let input;
    return (
        <div>
        <input ref={node => {
          input = node;
        }} />
        <button
            onClick={() => {
                dispatch({
                    type: 'ADD_TODO',
                    text: input.value,
                    id:   nextTodoId++
                });
                input.value = '';
            }}>
          Add Todo
        </button>
        </div>
    );
}
AddTodo = connect(              // could just write this as connect() since both args are null.
    null,
    null  // just inject dispatch function as a prop
)(AddTodo);

const FilterFooter = () => (
    <p>
      Show:
      {' '}
      <FilterLink filter='SHOW_ALL'>All</FilterLink>
      {', '}
      <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
      {', '}
      <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </p>
)

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

const mapStateToTodoListProps = (
    state
) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};
const mapDispatchToTodoListProps = (
    dispatch
) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    };
};
const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);

const TodoApp = () => (
  <div>
    <AddTodo         />
    <VisibleTodoList />
    <FilterFooter    />
  </div>
);

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from 'lib/reducers/todos';

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp  />
    </Provider>,
    document.getElementById('root')
);
