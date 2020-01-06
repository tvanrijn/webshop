import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);

            this.setState({
                email: '',
                password: '',
            });
        } catch {
            alert("Wrong email or password, please try again.");
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label='Email'
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        label='Password'
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required
                    />
                    <div className='buttons'>
                        <Button type='submit'>Sign in</Button>
                        <Button
                            onClick={signInWithGoogle}
                            isGoogleSignIn
                        >Sign in with Google</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;