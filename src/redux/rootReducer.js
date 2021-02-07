import { combineReducers } from "redux";
import counter1 from "./reducers/counter1";
import counter2 from "./reducers/counter2";
import appReducer from "./reducers/appReducer";

export default combineReducers({
  appReducer: appReducer,
  counter1,
  counter2,
});
