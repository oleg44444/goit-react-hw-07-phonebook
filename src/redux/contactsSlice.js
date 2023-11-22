import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'https://6556bd35bd4bcef8b6119669.mockapi.io/contacts/contacts'
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async ({ name, phone }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'https://6556bd35bd4bcef8b6119669.mockapi.io/contacts/contacts',
        { name, phone }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const delContact = createAsyncThunk(
  'contatcts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://6556bd35bd4bcef8b6119669.mockapi.io/contacts/contacts/${id}`
      );
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const updateFilter = createAction('contacts/updateFilter');

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(updateFilter, (state, action) => {
        state.filter = action.payload;
      })

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(delContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addMatcher(
        isAnyOf(fetchContacts.pending, addContact.pending, delContact.pending),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.pending, addContact.pending, delContact.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      ),
});

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;
export default contactsSlice.reducer;
