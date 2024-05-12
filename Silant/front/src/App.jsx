import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MainPage } from "./components/MainPage/MainPage";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { MachineDetailPage } from "./components/MachineDetailPage/MachineDetailPage";
import { Handbook } from "./components/Handbook/Handbook";
import { DataInsertPage } from "./components/DataInsertPage/DataInsertPage";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";

const routes = [
    { path: "/logout/", element: <Logout /> },
    { path: "/datainsert/:type/", element: <DataInsertPage /> },
    { path: "/machine/:id/", element: <MachineDetailPage /> },
    { path: "/machinelist/:machinelist/", element: <Handbook /> },
    { path: "/engine/:engine/", element: <Handbook /> },
    { path: "/transmission/:transmission/", element: <Handbook /> },
    { path: "/mainaxle/:mainaxle/", element: <Handbook /> },
    { path: "/steeringaxle/:steeringaxle/", element: <Handbook /> },
    { path: "/client/:client/", element: <Handbook /> },
    { path: "/consumer/:consumer/", element: <Handbook /> },
    { path: "/serviceCompany/:servicecompany/", element: <Handbook /> },
    { path: "/maintenance/:maintenance/", element: <Handbook /> },
    { path: "/typeoffailure/:nodeoffailure/", element: <Handbook /> },
    { path: "/recoverymethod/:recoverymethod/", element: <Handbook /> },
];

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    {routes.map(({ path, element }, index) => (
                        <Route key={index} path={path} element={element} />
                    ))}
                </Route>
                <Route path="/" element={<MainPage />} />
                <Route path="/login/" element={<Login />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
