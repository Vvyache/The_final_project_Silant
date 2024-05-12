import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    MachineListData,
    EngineData,
    MainAxleData,
    MethodOfRecoveryData,
    SteeringAxleData,
    TransmissionData,
    TypeOfFailureData,
    TypeOfMaintenanceData,
    UsersData,
} from "../../Store/Slicers/HandbookSlicer";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme/Theme";

const Handbook = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const key = Object.keys(params)[0];
    const id = Object.values(params)[0];
    const handbook = useSelector((state) => state.handbook);

    React.useEffect(() => {
        const fetchData = () => {
            switch (key) {
                case "machinelist":
                    dispatch(MachineListData(id));
                    break;
                case "engine":
                    dispatch(EngineData(id));
                    break;
                case "transmission":
                    dispatch(TransmissionData(id));
                    break;
                case "mainaxle":
                    dispatch(MainAxleData(id));
                    break;
                case "steeringaxle":
                    dispatch(SteeringAxleData(id));
                    break;
                case "maintenance":
                    dispatch(TypeOfMaintenanceData(id));
                    break;
                case "nodeoffailure":
                    dispatch(TypeOfFailureData(id));
                    break;
                case "recoverymethod":
                    dispatch(MethodOfRecoveryData(id));
                    break;
                case "servicecompany":
                case "client":
                    dispatch(UsersData(id));
                    break;
                default:
                    break;
            }
        };

        fetchData();
    }, [key, id, dispatch]);

    const renderContent = () => {
        if (!handbook.success) {
            return <p>Данные не найдены</p>;
        }

        switch (key) {
            case "machinelist":
                return (
                    <>
                        <h1>{handbook.machinelist.title}</h1>
                        <h3>{handbook.machinelist.description}</h3>
                    </>
                );
            case "engine":
                return (
                    <>
                        <h1>{handbook.engine.title}</h1>
                        <h3>{handbook.engine.description}</h3>
                    </>
                );
            case "transmission":
                return (
                    <>
                        <h1>{handbook.transmission.title}</h1>
                        <h3>{handbook.transmission.description}</h3>
                    </>
                );
            case "mainaxle":
                return (
                    <>
                        <h1>{handbook.mainaxle.title}</h1>
                        <h3>{handbook.mainaxle.description}</h3>
                    </>
                );
            case "steeringaxle":
                return (
                    <>
                        <h1>{handbook.steeringaxle.title}</h1>
                        <h3>{handbook.steeringaxle.description}</h3>
                    </>
                );
            case "maintenance":
                return (
                    <>
                        <h1>{handbook.typeofmaintenance.title}</h1>
                        <h3>{handbook.typeofmaintenance.description}</h3>
                    </>
                );
            case "nodeoffailure":
                return (
                    <>
                        <h1>{handbook.typeoffailure.title}</h1>
                        <h3>{handbook.typeoffailure.description}</h3>
                    </>
                );
            case "recoverymethod":
                return (
                    <>
                        <h1>{handbook.methodofrecovery.title}</h1>
                        <h3>{handbook.methodofrecovery.description}</h3>
                    </>
                );
            case "servicecompany":
            case "client":
                return (
                    <>
                        <h1>{handbook.users.username}</h1>
                        <h3>{handbook.users.role}</h3>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <CustomContainer style={{ textAlign: "center" }}>
            {renderContent()}
            <ThemeProvider theme={theme}>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Назад
                </Button>
            </ThemeProvider>
        </CustomContainer>
    );
};

export { Handbook };
