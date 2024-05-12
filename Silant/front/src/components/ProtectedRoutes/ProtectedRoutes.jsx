import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = useSelector((state) => state.user);
    const accessToken = localStorage.getItem('accessToken');
    const authenticated = localStorage.getItem('authenticated');

    // Проверяем наличие данных пользователя в состоянии Redux или в локальном хранилище
    const isAuthenticated = !!user.data || authenticated || accessToken;

    // Возвращаем компонент Outlet, если пользователь аутентифицирован, иначе перенаправляем на главную страницу
    return isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
};

export { ProtectedRoutes };
