import * as React from "react";
import { Unauthorized } from "./Unauthorized";
import { Authorized } from "./Authorized";
import { useSelector } from "react-redux";

const MainPage = () => {
    const logged = useSelector((state) => state.login);
    // Add parentheses to clarify the order of operations
    const isAuthenticated = (logged.is_Auth && logged.success) || localStorage.getItem('Authenticated');

    return (
        <>
            {isAuthenticated ? <Authorized /> : <Unauthorized />}
        </>
    );
};

export { MainPage };
