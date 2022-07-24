import React from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

export function App() {
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter></Filter>
      <ContactList />
    </div>
  );
}
