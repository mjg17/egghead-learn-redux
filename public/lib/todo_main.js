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

class FilterLink extends Component {

    componentDidMount() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = props;
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

let nextTodoId = 0;
const AddTodo = ({ store }) => {
    let input;
    return (
        <div>
        <input ref={node => {
          input = node;
        }} />
        <button
            onClick={() => {
                store.dispatch({
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

const FilterFooter = ({ store }) => (
    <p>
      Show:
      {' '}
      <FilterLink store={store} filter='SHOW_ALL'>All</FilterLink>
      {', '}
      <FilterLink store={store} filter='SHOW_ACTIVE'>Active</FilterLink>
      {', '}
      <FilterLink store={store} filter='SHOW_COMPLETED'>Completed</FilterLink>
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
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { store } = this.props;
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

const TodoApp = ({ store }) => (
  <div>
    <AddTodo         store={store}/>
    <VisibleTodoList store={store}/>
    <FilterFooter    store={store}/>
  </div>
);

import todoApp from 'lib/reducers/todos';
import { createStore } from 'redux';

ReactDOM.render(
    <TodoApp store={createStore(todoApp)} />,
    document.getElementById('root')
);
