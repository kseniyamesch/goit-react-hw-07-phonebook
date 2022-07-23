import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';
import { addContact } from '../../redux/contactsSlice.js';

const inputNameId = nanoid();
const inputPhoneId = nanoid();

export default function ContactForm(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleCahnge = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return new Error('Something went wrong');
    }
  };

  const handleSubmit = evt => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    evt.preventDefault();

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in Contact List`);
    }
    dispatch(addContact(contact));
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label htmlFor={inputNameId} className={s.label}>
        {' '}
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          id={inputNameId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleCahnge}
        />
      </label>
      <label className={s.label} htmlFor={inputPhoneId}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          id={inputPhoneId}
          onChange={handleCahnge}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
