import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            /*
            ES5
            const post = action.payload.data;
            const newState = { ...state };
            newState[post.id] = post;
            return newState;*/
            //Create a new key and asign it the data
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_POSTS:
            return _.mapKeys(action.payload, 'id');
        case DELETE_POST:
            //If state object has a key of post.id, return a new object without that id
            return _.omit(state, action.payload);
        default:
            return state;
    }
}