import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';
import css from './SerchBox.module.css'

export const SearchBox = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = evt => {
    setQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      Notify.warning('Please enter something');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          autoFocus
          value={query}
          onChange={handleInput}
          className={css.formInput}
        />
        <button type="submit" className={css.formBtn}>
          Search
        </button>
      </form>
    </div>
  );
};
