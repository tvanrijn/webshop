import React from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../custom-button/custom-button.component";
import { createStructuredSelector } from "reselect";
import { selectErrorMessage } from "../../redux/user/user.selectors";
import {
  SignInContainer,
  SignInTitle,
  SignInButtonsContainer
} from "./sign-in.styles";
import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/user.actions";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleError() {
    const { errorMessage } = this.props;

    if (errorMessage) {
      alert("Your login has failed. Please try again.");
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { emailSignInStart } = this.props;

    emailSignInStart(email, password);
    this.handleError();
  };

  handleGoogleSignIn = () => {
    const { googleSignInStart } = this.props;

    googleSignInStart();
    this.handleError();
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <SignInButtonsContainer>
            <Button type="submit">Sign in</Button>
            <Button
              type="button"
              onClick={this.handleGoogleSignIn}
              isGoogleSignIn
            >
              Sign in with Google
            </Button>
          </SignInButtonsContainer>
        </form>
      </SignInContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
      dispatch(emailSignInStart({ email, password }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
