import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import '../SharedComponentStyles/CardForm.css';
import { changeCurrentUser } from '../../actions';
import { useDispatch } from 'react-redux';

const SignIn = _ => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSignIn = _ => {
        fetch('http://localhost:3001/sign-in', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => {
            if(response.status < 400) {
                //set current user in redux with email
                dispatch(changeCurrentUser(signInEmail));
                history.push('/the-spot');
            } else {
                alert('Please provide a valid/verified email and password.')
            }
        })
        .catch(err => console.log(err))
    }

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
                            <TextField className='inputs action-text-field' id='standard-basic' label='Email' type='email' onChange={event => setSignInEmail(event.target.value)}/>
                            <TextField className='inputs action-text-field' id='standard-basic' label='Password' type='password' onChange={event => setSignInPassword(event.target.value)}/>
                            <div className='card-buttons-container'>
                                <div>
                                    {/* <Link to='/the-spot/' style={{ textDecoration: 'none' }}> */}
                                        <Fab onClick={handleSignIn} color='primary' className='main-action-button' variant="extended">
                                            Sign In
                                        </Fab>
                                    {/* </Link> */}
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