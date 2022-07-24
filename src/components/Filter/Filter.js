import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import filterSlice, { changeFilter } from 'redux/filterSlice';
import s from './Filter.module.css';

export default function Filter() {
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch(filterSlice);

  const onFilter = evt => {
    const { value } = evt.currentTarget;
    dispatch(changeFilter(value));
  };

  return (
    <>
      <p className={s.text}> Find contacts by name </p>
      <input
        className={s.input}
        type="text"
        name="filter"
        onChange={onFilter}
        value={filter}
      ></input>
    </>
  );
}
