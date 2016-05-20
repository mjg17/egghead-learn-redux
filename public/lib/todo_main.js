import todoApp from 'lib/reducers/todos';

import { createStore } from 'redux';
import React           from 'react';
import ReactDOM        from 'react-dom';

// create the store for our mini-app using the counter reducer
const store = createStore(todoApp);

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

class FilterLink extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();

        return (
            <Link
                active={state.visibilityFilter === props.filter}
                onClick={() =>
                    store.dispatch({
                        type:   'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }
             >
                {props.children}
            </Link>
        );
    }
}

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

class VisibleTodoList extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();

        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={
                    id => store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                          })
                }
            />
        );
    }
}

let nextTodoId = 0;

const TodoApp = ({
    todos,
    visibilityFilter
}) => (
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
    <VisibleTodoList />
    <FilterFooter />
  </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('root')
  );
};

store.subscribe(render); // all actions re-render the DOM
render(); // render the initial state of the page/app
