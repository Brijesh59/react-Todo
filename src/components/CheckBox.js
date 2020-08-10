import React from 'react';
import '../styles.css'

function CheckBox({onChange, checked, id}) {
  return (
    <>
      <input type="checkbox" id={id} onChange={onChange} checked={checked}/>
      <label htmlFor={id}></label>
    </>
  );
}

export default CheckBox;