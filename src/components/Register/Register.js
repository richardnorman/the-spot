import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import '../SharedComponentStyles/CardForm.css';

const Register = _ => {
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
                        <TextField className='inputs action-text-field' id='standard-basic' label='Name' type='name' />
                        <TextField className='inputs action-text-field' id='standard-basic' label='Email' type='email' />
                        <TextField className='inputs action-text-field' id='standard-basic' label='Password' type='password' />
                        <div className='card-buttons-container'>
                            <div>
                                <Link to='/' style={{ textDecoration: 'none' }}>
                                    <Fab color='primary' className='main-action-button' variant="extended">
                                        Register
                                    </Fab>
                                </Link>
                            </div>
                            <div>
                                <Link to='/sign-in' style={{ textDecoration: 'none', color: 'black' }}>
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