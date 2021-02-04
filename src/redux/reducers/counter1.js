import { ADD } from '../actions/actionTypes'
const initialState = {
   counter: 1,
};

export default function counter1(state = initialState, action) {
   switch (action.type) {
      case ADD:
         return {
            counter: state.counter + 1,
         };

      default:
         return state;
   }
}
