import counter from 'lib/reducers/counter';

import { createStore } from 'redux';
// create the store for our mini-app using the counter reducer
const store = createStore(counter);

const render = () => { // render function updates DOM with counter value
    document.body.innerText = store.getState();
}
store.subscribe(render); // all actions re-render the DOM
render(); // render the initial state of the page/app

// listen for click event on the whole document (click anywhere on the page)
document.addEventListener('click', () => {
    store.dispatch({type:'INCREMENT'});
});
