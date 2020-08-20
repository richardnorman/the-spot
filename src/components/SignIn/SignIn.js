import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import '../SharedComponentStyles/CardForm.css';

const SignIn = _ => {
    return (
        <div className='action-container'>
            <Card className='action-card'>
                <CardContent>
                    <h1>Sign In</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={async values => alert(JSON.stringify(values))}
                    >
                        <Form>
                            <TextField className='inputs action-text-field' id='standard-basic' label='Email' type='email' />
                            <TextField className='inputs action-text-field' id='standard-basic' label='Password' type='password' />
                            <div className='card-buttons-container'>
                                <div>
                                    <Link to='/the-spot/' style={{ textDecoration: 'none' }}>
                                        <Fab color='primary' className='main-action-button' variant="extended">
                                            Sign In
                                                </Fab>
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/the-spot/register' style={{ textDecoration: 'none', color: 'black' }}>
                                        <p>Register</p>
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn;