import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    // update state based on form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const [addUser, { error }] = useMutation(ADD_USER);

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
        const { data } = await addUser({
            variables: { ...formState }
        });
        
        Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main>
            <div>
                <div>
                    <h4>Sign Up</h4>
                    <div>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                placeholder='Enter username'
                                name='username'
                                type='username'
                                id='username'
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <input
                                placeholder='Enter email'
                                name='email'
                                type='email'
                                id='email'
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                placeholder='Enter password'
                                name='password'
                                type='password'
                                id='password'
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button type='submit'>
                                Submit
                            </button>
                        </form>
                        {error && <div>Sign up failed</div>}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;