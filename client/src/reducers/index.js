import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';
import { chatReducer } from './chatReducer';
import { allUserReducer } from './allUserReducer';
import { roomReducer } from './roomReducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
  users: allUserReducer,
  chats: chatReducer,
  rooms: roomReducer,
});

export default rootReducer;
