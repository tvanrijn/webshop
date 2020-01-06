import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            alert("Password should be at least 6 characters");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error(error);
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label='Name'
                        name='displayName'
                        type='text'
                        value={displayName}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label='Email'
                        name='email'
                        type='email'
                        value={email}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label='Password'
                        name='password'
                        type='password'
                        value={password}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label='Confirm password'
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        required
                    />
                    <Button type='submit'>Sign up</Button>
                </form>
            </div>
        )
    }
}

export default SignUp;