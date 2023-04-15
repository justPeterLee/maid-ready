import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddPropertyPage(props) {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Add A Property');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [sqFootage, setSqFootage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const addProperty = (event) => {
    event.preventDefault();
    const newProperty = {
      street,
      city,
      state,
      zipcode,
      sq_footage: sqFootage,
    }

    dispatch({type: 'ADD_PROPERTY', payload: newProperty});
    history.push('/properties');
  }

  return (
    <div>
      <h2>{heading}</h2>
      <div className='add-property-form'>
        <form onSubmit ={addProperty}>
            <label htmlFor="street address">Street Address:</label> 
            <input value={street} onChange={(event) => setStreet(event.target.value)} type="text"/>
            <br/>
            <label htmlFor="city">City:</label>
            <input value={city} onChange={(event) => setCity(event.target.value)} type="text"/>
            <br/>
            <label htmlFor="state">State:</label>
            <input value={state} onChange={(event) => setState(event.target.value)} type="text"/>
            <br/>
            <label htmlFor="zipcode">Zip Code:</label>
            <input value={zipcode} onChange={(event) => setZipcode(event.target.value)} type="text"/>
            <br/>
            <label htmlFor="sqFootage">Sq Footage:</label>
            <input value={sqFootage} onChange={(event) => setSqFootage(event.target.value)} type="number"/>
            <br/>
            <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AddPropertyPage;