import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'services/contactsAPI';

const inputNameId = nanoid();
const inputPhoneId = nanoid();

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [createContact, { isLoading, isSuccess }] = useAddContactMutation();
  const { data } = useGetContactsQuery();

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
    evt.preventDefault();
    if (data.find(data => data.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in Contact List`);
    }

    createContact({ name, number });
  };

  useEffect(() => {
    if (isSuccess) {
      setName('');
      setNumber('');
    }
  }, [setName, setNumber, isSuccess])

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
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding..' : 'Add contact'}
      </button>
    </form>
  );
}
