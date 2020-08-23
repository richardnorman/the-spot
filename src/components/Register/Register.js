import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import '../SharedComponentStyles/CardForm.css';

const Register = _ => {
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleRegister = _ => {
        fetch('localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassword
            })
        })
        .then(response => response.json())
        .catch(err => alert('Could not register user'))
    }

    return (
        <div className='action-container'>
        <Card className='action-card'>
            <CardContent>
                <h1>Register</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={async values => alert(JSON.stringify(values))}
                >
                    <Form>
                        <TextField className='inputs action-text-field' id='standard-basic' label='Name' type='name' onChange={event => setRegisterName(event.target.value)}/>
                        <TextField className='inputs action-text-field' id='standard-basic' label='Email' type='email' onChange={event => setRegisterEmail(event.target.value)}/>
                        <TextField className='inputs action-text-field' id='standard-basic' label='Password' type='password'  onChange={event => setRegisterPassword(event.target.value)}/>
                        <div className='card-buttons-container'>
                            <div>
                                {/* <Link to='/the-spot/' style={{ textDecoration: 'none' }}> */}
                                    <Fab onClick={handleRegister} color='primary' className='main-action-button' variant="extended">
                                        Register
                                    </Fab>
                                {/* </Link> */}
                            </div>
                            <div>
                                <Link to='/the-spot/sign-in' style={{ textDecoration: 'none', color: 'black' }}>
                                    <p>Sign In</p>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </CardContent>
        </Card>
    </div>
    );
}

export default Register;