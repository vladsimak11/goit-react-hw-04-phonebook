import React, { Component } from "react";
import { nanoid } from 'nanoid';
import css from './App.module.css'

import {ContactForm} from './ContactForm/ContactForm';
import {Filter} from './Filter/Filter';
import {ContactList} from './ContactList/ContactList';

let contactsName = []

export class App extends Component  {
  state = {
    contacts: [],
    filter: '',
  }

  addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }))
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  formSubmitData = ({name, number}) => {   
    this.state.contacts.forEach(contact => {
      contactsName.push(contact.name);
    });

    if (contactsName.includes(name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.addContacts(name, number); 
    }

  }

  changeFilter = (e) => {
    this.setState({
      filter: e.target.value,
    })
  }

  getVisibleContact = () => {
    const {filter, contacts} = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if(parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const {filter} = this.state;
    const visibleContact = this.getVisibleContact();
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
          <ContactForm onSubmit={this.formSubmitData}/>
          {/* <form onSubmit={this.handleSubmit} className={css.form}>
            <label className={css.label}>
              Name
            <input
            className={css.input}
            type="text"
            placeholder="Enter your name"
            name="name"
            value = {name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            />
            </label>

            <label className={css.label}>
              Number
            <input
            className={css.input}
            type="text"
            placeholder="Enter your number"
            name="number"
            value = {number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            />
            </label>

            <button className={css.button} type="submit">Add contact</button>
          </form> */}
          <h2>Contacts</h2>
          <Filter filter={filter} changeFilter={this.changeFilter}/>
      {/* <label className={`${css.label} ${css.filter}`}>
            Find contacts by name
          <input
            className={css.input}
            type="text"
            placeholder="Enter your name"
            name="filter"
            value = {filter}
            onChange={this.changeFilter}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />
          </label> */}
          <ContactList visibleContact={visibleContact} deleteContact={this.deleteContact}/>
      {/* <ul>
        {visibleContact.map(({id, name, number}) => {
          return (
            <li className={css.item} key={id}>{name}: {number}</li>
          )
        })}
      </ul> */}
        </div>
    </div>
    )
  };
};
