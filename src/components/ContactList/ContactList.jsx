import propTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({visibleContact, deleteContact }) => {
  return (
    <ul className={css.list}>
        {visibleContact.map(({id, name, number}) => {
          return (
            <li className={css.item} key={id}>
              <span className={css.span}>{name}: {number}</span>
              <button
                onClick={() => deleteContact(id)}
                className={css.delete}
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
  )
}

ContactList.propTypes = {
  visibleContact: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    }),
  ),
  deleteContact: propTypes.func.isRequired,
};