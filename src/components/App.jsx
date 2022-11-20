import s from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { getIsContacts } from 'redux/contactsSlice/contactsSelectors';
import { useSelector } from 'react-redux';

export function App() {
  const contatsList = useSelector(getIsContacts);
  return (
    <div className={s.div}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {contatsList && <ContactList />}
    </div>
  );
}

export default App;
