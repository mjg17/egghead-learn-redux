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
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = this.context;
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
FilterLink.contextTypes = {
    store: React.PropTypes.object
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
const AddTodo = (props, { store }) => { // second arg is context
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
AddTodo.contextTypes = {
    store: React.PropTypes.object
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
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { store } = this.context;
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
VisibleTodoList.contextTypes = { // needed to turn on receiving of context
    store: React.PropTypes.object
}

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
