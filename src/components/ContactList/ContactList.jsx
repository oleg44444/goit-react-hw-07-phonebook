import React from 'react';
import style from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { delContact } from 'redux/contactsSlice';
import { selectContacts, selectFilter } from 'redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const filterItems = useSelector(selectFilter);
  const contactsList = useSelector(selectContacts);

  const deleteContact = id => {
    dispatch(delContact(id));
  };

  const normalizedFilter = filterItems.toLowerCase();

  const filteredContacts = contactsList.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <ul>
      {filteredContacts.map(({ id, phone, name }) => (
        <li key={id} className={style.contactItem}>
          <p className={style.contactDetails}>
            {name}: {phone}
          </p>
          <button
            type="button"
            onClick={() => deleteContact(id)}
            className={style.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
