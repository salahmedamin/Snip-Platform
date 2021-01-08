import { createStore } from "redux";
import initialState from "./defaultDataStruct/initialState";
import reducer from "./reducer"


export default createStore(reducer,initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());