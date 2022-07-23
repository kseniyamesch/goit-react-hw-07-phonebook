import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import s from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const renderContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={s.ul}>
      {renderContact().map(contact => {
        return (
          <li key={contact.id} className={s.item}>
            <span>{contact.name}:</span>
            <span>{contact.number}</span>
            <button type="button" onClick={() => handleDelete(contact.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
