import propTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({filter, changeFilter }) => {
  return (
    <label className={`${css.label} ${css.filter}`}>
          Find contacts by name
          <input
            className={css.input}
            type="text"
            placeholder="Enter your name"
            name="filter"
            value = {filter}
            onChange={changeFilter}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />
        </label>
  )
}

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  changeFilter: propTypes.func.isRequired,
};