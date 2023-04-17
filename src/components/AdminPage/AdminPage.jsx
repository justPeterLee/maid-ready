import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminPage.css';
import Modal from './AdminPageModal';
 
 function AdminPage() {
    const dispatch = useDispatch();
    const admins = useSelector(store => store.admins);
    const results = useSelector(store => store.suggestions);
    const [userName, setUserName] = useState('');
    const [accountType, setAccountType] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_ADMINS' });
      }, []);

    //handles when the user clicks the add-btn
    const handleAdd = () => {
        //check if required fields are filled in
        if(userName == ''){
            alert('Please enter a user name.');
        }else if(accountType == ''){
            alert('Please select a user type.');
        }else if (accountType == 'admin'){
            // pop up modal to get password and email for the admin to be added
            setOpenModal(true);
        }
    }

    //handles when the user clicks the remove-btn
    const handleRemove = () => {
        //check if required fields are filled in
        if (userName == ''){
            alert('Please enter a user name.');
        }else if (accountType == ''){
            alert('Please select a user type.');
        }
        //remove the user
        else{
            dispatch({type: 'DELETE_USER', payload: {
                userName: userName,
                accountType: accountType,
            }});
        }
        //refresh table contents
        dispatch({ type: 'FETCH_ADMINS' });
        //reset input
        setUserName('');
    }

    //function to handle when a radio button is clicked
    const handleRadioBtnClick = (type, value) => {
        //set account type
        setAccountType(type);
        //toggle the add-btn
        document.getElementById("add-btn").disabled = value;

    }

    //function to get autocomplete data from the database
    const usernameInputChange = (value) => {
        setUserName(value);
        dispatch({type: 'GET_SUGGESTIONS', payload: value});
    }

    return(
        <div>
            {openModal && <Modal closeModal={setOpenModal} username={userName} accountType={accountType}/>}
            <h3 id="header">Manage Users</h3>
            <br></br>

            <div className="admin-controls">
                <div id="manage-user-inputs">
                    <label> User Name:
                        <input id="user-name-input" value={userName} placeholder="Enter Username" onChange={(event) => usernameInputChange(event.target.value)}></input>
                    </label>
                </div>
            
                <div id="radio-btn-div" onChange={(event) => setAccountType(event.target.value)}>
                    <input type="radio" value="admin" name="user" onChange={() => handleRadioBtnClick('admin', false)}/> Admin <br></br>
                    <input type="radio" value="owner" name="user" onChange={() => handleRadioBtnClick('owner', true)}/> Owner <br></br>
                    <input type="radio" value="keeper" name="user" onChange={() => handleRadioBtnClick('keeper', true)}/> Keeper
                </div>

                <div id="add-remove-btn-div">
                    <button id="add-btn" className="btn" onClick={() => handleAdd()}>Add</button>
                    &nbsp;
                    <button id="remove-btn" className="btn" onClick={() => handleRemove()}>Remove</button>
                </div>

                {/* line to break table to the next row */}
                <div className="break"></div>

                <div className="table-container">
                    <table>
                        <caption>Results</caption>

                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>ID</th>
                                <th>Account Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {results.map((result) => 
                                <tr key={result.id} onClick={() => setUserName(result.username)}>
                                    <td>{result.username}</td>
                                    <td>{result.email}</td>
                                    <td>{result.id}</td>
                                    <td>{result.account_type}</td>
                                </tr>
                            )}
                        </tbody>
                        *results are clickable
                    </table>
                </div>
                
                {/* line to break table to the next row */}
                <div className="break"></div>

                <div className="table-container">
                    <table id="admin-table">
                        <caption>Current Administrators</caption>

                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            {admins.map((admin) => 
                                <tr key={admin.id}>
                                    <td>{admin.username}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.id}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
            
        </div>
    )
 }

 export default AdminPage;