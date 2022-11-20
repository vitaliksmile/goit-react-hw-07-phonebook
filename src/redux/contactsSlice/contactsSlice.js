import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  fetchContact,
  removeContact,
} from '../../utils/mockapiApi.js';

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    filterContact(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContact.pending, handlePending)
      .addCase(addContact.pending, handlePending)
      .addCase(removeContact.pending, handlePending)
      .addCase(fetchContact.rejected, handleRejected)
      .addCase(addContact.rejected, handleRejected)
      .addCase(removeContact.rejected, handleRejected)
      .addCase(fetchContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(payload);
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.filter(
          el => el.id !== payload.id
        );
      });
  },
});
export const { filterContact } = contactsSlice.actions;
export default contactsSlice.reducer;
