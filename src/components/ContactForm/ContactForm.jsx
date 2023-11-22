import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { nanoid } from 'nanoid';

import { addContact, selectContacts } from '../../redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ContactForm = () => {
  const list = useSelector(selectContacts);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const createContact = data => {
    try {
      const { name } = data;

      if (list.some(contact => contact.name === name)) {
        throw new Error(`${name} is already in contacts.`);
      }

      const newContact = {
        ...data,
        id: nanoid(),
      };

      dispatch(addContact(newContact));
    } catch (error) {
      setError(error.message);
    }
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = ({ target }) => {
    if (target.name === 'name') {
      setName(target.value);
    } else if (target.name === 'phone') {
      setPhone(target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createContact({ name, phone });
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      {error && <div className={styles.error}>{error}</div>}

      <label htmlFor="name" className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          className={styles.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
      </label>
      <label htmlFor="phone" className={styles.label}>
        Phone
        <input
          type="tel"
          name="phone"
          className={styles.input}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={phone}
        />
      </label>
      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
