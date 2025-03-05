import { useState } from "react";
import "./styles.scss";
import {
  Card,
  TextField,
  Alert,
  Button,
  Link,
  Typography,
} from "@mui/material";
import { signUp } from "../../util/auth";
import ConfirmSignUpForm from "../confirmSignUpForm/ConfirmSignUpForm";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmedPasswordError, setConfirmedPasswordError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [confirmSignUp, setConfirmSignUp] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      username: username,
      email: email,
      password: password,
    };

    if (!validateEmail(email)) {
      setEmailError(true);
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
    }
    if (!validateConfirmedPassword(confirmedPassword)) {
      setConfirmedPasswordError(true);
    }

    signUp(requestBody.username, requestBody.email, requestBody.password).then(
      (res) => {
        if (typeof res !== "undefined") {
          setConfirmSignUp(true);
        } else {
          setSignUpError(true);
        }
      }
    );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 16;
  };

  const validateConfirmedPassword = (confirmedPassword) => {
    return confirmedPassword === password;
  };

  return (
    <div className="signup-container">
      {confirmSignUp ? (
        <ConfirmSignUpForm username={username} />
      ) : (
        <Card elevation={5} className="signup-card">
          <Typography sx={{ mb: 2 }} component="h1" variant="h5">
            Sign Up
          </Typography>
          {emailError && (
            <Alert severity="error">Please enter a valid email address.</Alert>
          )}
          {passwordError && (
            <Alert severity="error">
              Please enter a password between 8 to 16 characters.
            </Alert>
          )}
          {confirmedPasswordError && (
            <Alert severity="error">
              Failed to sign up. confirmed password has to be same as your
              password.
            </Alert>
          )}
          {signUpError && <Alert severity="error">Sign in error</Alert>}

          <form onSubmit={handleFormSubmit} className="signup-form">
            <TextField
              required
              id="username"
              autoComplete="username"
              autoFocus
              fullWidth
              label="Username"
              variant="standard"
              onChange={handleUsernameChange}
              value={username}
            />
            <TextField
              required
              id="email"
              autoComplete="email"
              fullWidth
              label="Email"
              variant="standard"
              onChange={handleEmailChange}
              value={email}
            />
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={handlePasswordChange}
              value={password}
            />
            <TextField
              required
              fullWidth
              id="confirmedPassword"
              label="confirmed Password"
              type="password"
              autoComplete="confirmedPassword"
              variant="standard"
              onChange={handleConfirmedPasswordChange}
              value={confirmedPassword}
            />

            <Button
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign Up
            </Button>
            <div>
              Do you have an account？
              <Link href="/login">Log In</Link>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default SignUp;
