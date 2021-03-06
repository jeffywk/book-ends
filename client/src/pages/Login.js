import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async event => {
    event.preventDefault();

    try {
        const { data } = await login({
            variables: { ...formState }
        });
    
        Auth.login(data.login.token);
    } catch (e) {
        console.error(e);
    }
    };

    return (
        <main className="container">
            <div>
                <div>
                    <h4>Login</h4>
                    <div>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                placeholder='Enter email'
                                name='email'
                                type='email'
                                id='email'
                                value={formState.email}
                                onChange={handleChange}
                                className="m-2"
                            />
                            <input
                                placeholder='Enter password'
                                name='password'
                                type='password'
                                id='password'
                                value={formState.password}
                                onChange={handleChange}
                                className="m-2"
                            />
                            <button type='submit' className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                        {error && <div>Login failed</div>}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;