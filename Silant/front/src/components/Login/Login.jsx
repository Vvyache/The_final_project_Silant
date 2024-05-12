import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import { Input, Button, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme/Theme";
import { UserLogin } from "../../Store/Slicers/AuthSlicer";
import "./Login.css"; // Подключаем файл стилей для анимации

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const data = useSelector((state) => state.login);

    useEffect(() => {
        if (data.is_Auth || localStorage.getItem('Authenticated')) {
            navigate("/");
        }
    }, [navigate, data.is_Auth]);

    useEffect(() => {
        if (data.error) {
            setErrorMessage("Неверное имя пользователя или пароль.");
            // Добавляем класс для анимации
            const errorField = document.getElementById("error-field");
            errorField.classList.add("shake");
            setTimeout(() => {
                // Удаляем класс после анимации
                errorField.classList.remove("shake");
            }, 1000); // Указываем продолжительность анимации в миллисекундах
        }
    }, [data.error]);

    const submit = () => {
        if (!username || !password) {
            setErrorMessage("Пожалуйста, введите имя пользователя и пароль.");
            return;
        }

        dispatch(UserLogin({ username, password }));
    };

    return (
        <CustomContainer>
            <form
                style={{
                    border: "1px solid var(--bg_color)",
                    padding: "30px",
                    borderRadius: "5px",
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 auto',
                    marginTop: "40px",
                    width: '350px'
                }}
            >
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                    required
                />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    type="password"
                    placeholder="password"
                    required
                    style={{ margin: "20px 0" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            submit();
                        }
                    }}
                />
                <p id="error-field" className="error-message">
                    {errorMessage}
                </p>
                <ThemeProvider theme={theme}>
                    <Button
                        style={{ marginTop: "10px" }}
                        onClick={() => submit()}
                    >
                        Войти
                    </Button>
                </ThemeProvider>
            </form>
        </CustomContainer>
    );
};

export { Login };
