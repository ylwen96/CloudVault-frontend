import { useState } from "react";
import "./styles.scss";
import { Card, TextField, Alert, Button, Typography } from "@mui/material";
import { Auth } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const ConfirmSignUpForm = (props) => {
  const [code, setCode] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [resendCodeMsg, setResendCodeMsg] = useState(false);
  const navigate = useNavigate();
  const { username } = props;

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    setConfirmError(false);
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(username);
      setResendCodeMsg(true);
    } catch (error) {
      console.log("error resending code: ", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setCode("");
    try {
      await Auth.confirmSignUp(username, code);
      navigate("/");
    } catch (error) {
      console.log("error confirming sign up", error);
      setConfirmError(true);
    }
  };

  return (
    <Card elevation={5} className="confirmSignUp-card">
      <Typography sx={{ mb: 2 }} component="h1" variant="h5">
        Please enter the verification code from your email
      </Typography>
      {confirmError && (
        <Alert severity="error">
          Invalid verification code provided, please try again.
        </Alert>
      )}
      {resendCodeMsg && (
        <Alert severity="success">
          A new verification code has sent to you, please check you email
        </Alert>
      )}
      <form onSubmit={handleFormSubmit} className="confirmSignUp-form">
        <TextField
          required
          id="code"
          autoComplete="code"
          autoFocus
          fullWidth
          label="Verification code"
          variant="standard"
          onChange={handleCodeChange}
          value={code}
        />

        <Button
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
        <div>
          Did not receive your code？
          <Button onClick={handleResendCode}>Resend</Button>
        </div>
      </form>
    </Card>
  );
};

export default ConfirmSignUpForm;
