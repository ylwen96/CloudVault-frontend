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
import { signIn } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserSignIn } from "../../redux/auth/authSlice";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            username: username,
            password: password,
        };

        if (!validatePassword(password)) {
            setPasswordError(true);
        }

        signIn(requestBody.username, requestBody.password).then((res) => {
            if (typeof res !== "undefined") {
                setUsername("");
                setPassword("");
                dispatch(setUserSignIn(res));
                navigate("/");
            } else {
                setLoginError(true);
            }
        });
    };

    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 16;
    };

    return (
        <div className="login-container">
            <Card elevation={5} className="login-card">
                <Typography sx={{ mb: 2 }} component="h1" variant="h5">
                    Log In
                </Typography>
                {passwordError && (
                    <Alert severity="error">
                        Please enter a password between 8 to 16 characters.
                    </Alert>
                )}
                {loginError && (
                    <Alert severity="error">
                        Login error, please check your credentials
                    </Alert>
                )}
                <form onSubmit={handleFormSubmit} className="login-form">
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
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={handlePasswordChange}
                        value={password}
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
                        Do not have an account？
                        <Link href="/signup">Sign Up</Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;
