import React from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpContainer, SignUpTitle } from './sign-up.styles';
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
            this.props.history.push("/shop");
        } catch (error) {
            alert(error);
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <SignUpContainer>
                <SignUpTitle>I do not have an account</SignUpTitle>
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
            </SignUpContainer>
        )
    }
}

export default withRouter(SignUp);