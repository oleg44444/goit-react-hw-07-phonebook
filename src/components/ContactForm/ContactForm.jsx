import React, { useState } from 'react';
import styles from './ContactForm.module.css';

import { useAddContactMutation } from '../../redux/contactsSlice';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact, { error }] = useAddContactMutation();

  const handleChange = ({ target }) => {
    if (target.name === 'name') {
      setName(target.value);
    } else if (target.name === 'phone') {
      setPhone(target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, phone });

    // Очистити поля введення
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      {error && <div className={styles.error}>{error}</div>}

      <label htmlFor="name" className={styles.label}>
        Ім'я
        <input
          type="text"
          name="name"
          value={name}
          className={styles.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Ім'я може містити лише літери, апостроф, тире та пробіли. Наприклад, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label htmlFor="phone" className={styles.label}>
        Телефон
        <input
          type="tel"
          name="phone"
          value={phone}
          className={styles.input}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Номер телефону повинен бути цифрами і може містити пробіли, тире, круглі дужки та може починатися з +"
          required
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={styles.button}>
        Додати контакт
      </button>
    </form>
  );
};

export default ContactForm;
