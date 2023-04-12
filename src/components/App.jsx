import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ContactForm} from './ContactForm/ContactForm';
import {Filter} from './Filter/Filter';
import {ContactList} from './ContactList/ContactList';

let contactsName = []

export const App = () => {
  const [contacts, setContacts] = useState( () => JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number
    };

    setContacts((prevContacts) => [contact, ...prevContacts]);
  }

  const deleteContact = id => {
    const filteredContacts = contacts.filter(item => item.id !== id);
    console.log(filteredContacts);
    setContacts(filteredContacts);

    toast.error('Delete contact', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const formSubmitData = (name, number) => {   
    contacts.forEach(contact => {
      contactsName.push(contact.name);
    });

    if (contactsName.includes(name)) {
      toast.warn(`${name} is already in contacts`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      addContacts(name, number);

      toast.success('Add contact', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }); 
    }

  }

  const changeFilter = (e) => {
    setFilter(e.target.value);
  }

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };
  
  const visibleContact = getVisibleContact();

  return (
    <div
      style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#010101',
      paddingTop: 20
      }}
    >

      <div className={css.mainBlock}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitData}/>

        <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter}/>

        <ContactList visibleContact={visibleContact} deleteContact={deleteContact}/>
      </div>

      <ToastContainer />
    </div>
  )
  
}