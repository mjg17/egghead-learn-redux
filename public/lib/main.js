import counter from 'lib/reducers/counter';

import { createStore } from 'redux';
import React           from 'react';
import ReactDOM        from 'react-dom';

// create the store for our mini-app using the counter reducer
const store = createStore(counter);

const Counter = ({ value }) => (
  <h1>{value}</h1>
);

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()}/>,
    document.getElementById('root')
  );
};

store.subscribe(render); // all actions re-render the DOM
render(); // render the initial state of the page/app

// listen for click event on the whole document (click anywhere on the page)
document.addEventListener('click', () => {
    store.dispatch({type:'INCREMENT'});
});
