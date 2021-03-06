import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmit = data => {
    const contact = {
      id: nanoid(5),
      name: data.name,
      number: data.number,
    };

    const includesContact = this.state.contacts.find(c =>
      c.name.toLowerCase().includes(data.name.toLowerCase())
    );
    if (includesContact !== undefined) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));

    data.propTypes = {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    };
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteContact = data => {
    const deleteContact = this.state.contacts.filter(c => c.id !== data);
    this.setState({
      contacts: deleteContact,
    });
  };

  render() {
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(c =>
      c.name.toLowerCase().includes(normalizeFilter)
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          data={visibleContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}
