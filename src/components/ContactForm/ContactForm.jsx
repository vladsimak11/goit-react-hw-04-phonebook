import React, { useState } from "react";
import css from './ContactForm.module.css';
import propTypes from 'prop-types';


export const ContactForm = ({onSubmit}) => {
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value)
        break;

      case 'number':
        setNumber(value)
        break;   
    
      default:
        console.log('---');
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
  <form onSubmit={handleSubmit} className={css.form}>
    <label className={css.label}>
      Name
      <input
        className={css.input}
        type="text"
        placeholder="Enter your name"
        name="name"
        value = {name}
        onChange={handleChange}
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
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    </label>

    <button className={css.button} type="submit">Add contact</button>
  </form>
)
}

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: ''
//   }
  
//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ 
//       name: '',
//       number: ''
//     });
//   };

//   render() {
//     const {name, number} = this.state;
//     return (<form onSubmit={this.handleSubmit} className={css.form}>
//         <label className={css.label}>
//           Name
//           <input
//             className={css.input}
//             type="text"
//             placeholder="Enter your name"
//             name="name"
//             value = {name}
//             onChange={this.handleChange}
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>

//         <label className={css.label}>
//           Number
//           <input
//             className={css.input}
//             type="text"
//             placeholder="Enter your number"
//             name="number"
//             value = {number}
//             onChange={this.handleChange}
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>

//         <button className={css.button} type="submit">Add contact</button>
//       </form>
//   )}
// }

ContactForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
