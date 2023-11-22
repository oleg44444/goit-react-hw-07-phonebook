// store.js

import { configureStore } from '@reduxjs/toolkit';
import contactsReducer, {
  fetchContacts,
  addContact,
  delContact,
} from './contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

store.dispatch(fetchContacts());
store.dispatch(addContact());
store.dispatch(delContact());

export default store;
