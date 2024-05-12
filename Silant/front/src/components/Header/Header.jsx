import * as React from "react";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    ThemeProvider,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { theme } from "../../Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../Store/Slicers/UserInfoSlicer";
import { logout } from "../../Store/Slicers/AuthSlicer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryTheme = useTheme();
    const query_md = useMediaQuery(queryTheme.breakpoints.down("md"));
    const userInfo = useSelector((state) => state.user);
    const logged = useSelector((state) => state.login);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (logged.is_Auth || localStorage.getItem("accessToken")) {
            dispatch(UserData(localStorage.getItem("accessToken")));
        }
        if (!userInfo.success && localStorage.getItem("is_Authenticated")) {
            dispatch(logout());
            navigate("/");
        }
    }, [dispatch, userInfo.success, logged, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        setLogoutDialogOpen(false);
        // Обновление страницы
        window.location.reload();
    };

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleLogoutDialogOpen = () => {
        setLogoutDialogOpen(true);
    };

    const handleLogoutDialogClose = () => {
        setLogoutDialogOpen(false);
    };

    const Menu = (
        <div
            style={{
                display: menuOpen ? "flex" : "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "var(--bg_color)",
                zIndex: 1000,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <IconButton
                sx={{
                    position: "absolute",
                    top: "10px",
                    left: "16px",
                    height: "51px",
                }}
                onClick={handleMenuToggle}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
            <div style={{ width: "100%", textAlign: "center" }}>
                <a href="/">
                    <img
                        src="http://127.0.0.1:8000/static/images/logo.svg"
                        alt="Logo"
                        style={{ width: "150px" }}
                    />
                </a>
            </div>
            <ThemeProvider theme={theme}>
                <Button onClick={handleLogoutDialogOpen}>Выйти</Button>
            </ThemeProvider>
            <div style={{ color: "var(--main_color)" }}>
                <p>Электронная сервисная книжка "Мой Силант"</p>
            </div>
        </div>
    );

    return (
        <CustomContainer style={{ backgroundColor: "var(--bg_color)" }}>
            {Menu}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                }}
            >
                <IconButton
                    sx={{ display: query_md ? "inline-flex" : "none" }}
                    onClick={handleMenuToggle}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
                <div
                    style={{
                        width: query_md ? "100%" : "auto",
                        textAlign: "center",
                    }}
                >
                    <a href="/">
                        <img
                            src="http://127.0.0.1:8000/static/images/logo.svg"
                            alt="Logo"
                            style={{ width: query_md ? "150px" : "300px" }}
                        />
                    </a>
                </div>
                <div
                    style={{
                        display: query_md ? "none" : "block",
                        color: "var(--main_color)",
                    }}
                >
                    <p>
                        <h1>Электронная сервисная книжка "Мой Силант"</h1>
                    </p>
                </div>
                {localStorage.getItem("Authenticated") &&
                userInfo.status !== "BAD" ? (
                    <div
                        style={{
                            columnGap: "20px",
                            alignItems: "center",
                            display: query_md ? "none" : "flex",
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <Button onClick={handleLogoutDialogOpen}>Выйти</Button>
                        </ThemeProvider>
                    </div>
                ) : (
                    <div>
                        <ThemeProvider theme={theme}>
                            <Button
                                onClick={() => {
                                    dispatch(logout());
                                    navigate("/login");
                                }}
                            >
                                Авторизация
                            </Button>
                        </ThemeProvider>
                    </div>
                )}
            </div>
            <Dialog
                open={logoutDialogOpen}
                onClose={handleLogoutDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Выход"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите выйти?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutDialogClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </CustomContainer>
    );
};

export { Header };
