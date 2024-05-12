import * as React from "react";
import { Button, IconButton, Link, Table, ThemeProvider } from "@mui/material";
import { InfoFilters } from "../Filters/InfoFilters";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../../Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { MachineData } from "../../../../Store/Slicers/MachineSlicer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Info = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logged = useSelector((state) => state.user);
    const machine = useSelector((state) => state.machine);
    const [sorted, setSorted] = React.useState('asc');

    React.useEffect(() => {
        if (!machine.data || !logged.data) {
            dispatch(MachineData(localStorage.getItem("accessToken")));
        }
    }, [dispatch, logged.data, machine.data]);

    const handleSortChange = () => {
        setSorted(sorted === 'desc' ? 'asc' : 'desc');
    };

    const renderSortIcon = () => {
        return sorted === 'desc' ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />;
    };

    const handleAuthorizationClick = () => {
        navigate("/authorization");
    };

    if (logged.loading && !machine.data) {
        return "Загрузка";
    }

    // Проверяем наличие данных пользователя перед отображением
    if (!logged.data || logged.data.length === 0) {
        return (
            <Button onClick={handleAuthorizationClick}>Авторизация</Button>
        );
    }

    return (
        <>
            {logged.success && logged.data[0].role === "Менеджер" && (
                <ThemeProvider theme={theme}>
                    <Button
                        style={{ marginBottom: "20px" }}
                        onClick={() => {
                            navigate("/datainsert/machine/");
                        }}
                    >
                        Добавить новую запись
                    </Button>
                </ThemeProvider>
            )}

            <InfoFilters />
            <div style={{ overflowX: "scroll" }}>
                <Table style={{ marginBottom: '100px' }}>
                    <tbody>
                    <tr>
                        <th colSpan="17">ОБЩИЕ СВЕДЕНИЯ</th>
                    </tr>

                    <tr>
                        <th>№</th>
                        <th>Модель техники</th>
                        <th>Зав. № машины</th>
                        <th>Модель двигателя</th>
                        <th>Зав. № двигателя</th>
                        <th>Модель трансмиссии (производитель, артикул)</th>
                        <th>Зав. № трансмиссии</th>
                        <th>Модель ведущего моста</th>
                        <th>Зав. № ведущего моста</th>
                        <th>Модель управляемого моста</th>
                        <th>Зав. № управляемого моста</th>
                        <th>
                            <IconButton
                                sx={{
                                    fontSize: "12px",
                                    color: "#000",
                                    fontFamily: "Astra",
                                    fontWeight: "bold",
                                }}
                                disableTouchRipple
                                disableRipple
                                disableFocusRipple
                                onClick={handleSortChange}
                            >
                                Дата отгрузки с завода {renderSortIcon()}
                            </IconButton>
                        </th>
                        <th>Покупатель</th>
                        <th>Грузополучатель (конечный потребитель)</th>
                        <th>Адрес поставки (эксплутация)</th>
                        <th>Комплектация (доп. опции)</th>
                        <th>Сервисная компания</th>
                    </tr>
                    {machine.data && machine.data.length > 0 ? (
                        machine.data.map((value, idx) => (
                            <tr key={value.factoryNumberOfMachine}>
                                <td>{idx + 1}</td>
                                <td>
                                    <Link
                                        href={`machinelist/${value.modelOfMachine.id}`}
                                    >
                                        {value.modelOfMachine.title}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        href={`machine/${value.factoryNumberOfMachine}`}
                                    >
                                        {value.factoryNumberOfMachine}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        href={`engine/${value.modelOfEngine.id}`}
                                    >
                                        {value.modelOfEngine.title}
                                    </Link>
                                </td>
                                <td>{value.factoryNumberOfEngine}</td>
                                <td>
                                    <Link
                                        href={`transmission/${value.modelOfTransmission.id}`}
                                    >
                                        {value.modelOfTransmission.title}
                                    </Link>
                                </td>
                                <td>{value.factoryNumberOfTransmission}</td>
                                <td>
                                    <Link
                                        href={`mainaxle/${value.modelOfMainAxle.id}`}
                                    >
                                        {value.modelOfMainAxle.title}
                                    </Link>
                                </td>
                                <td>{value.factoryNumberOfMainAxle}</td>
                                <td>
                                    <Link
                                        href={`steeringaxle/${value.modelOfSteeringAxle.id}`}
                                    >
                                        {value.modelOfSteeringAxle.title}
                                    </Link>
                                </td>
                                <td>{value.factoryNumberOfSteeringAxle}</td>
                                <td>{value.dateOfShipment}</td>
                                <td>
                                    <Link
                                        href={`client/${value.client.id}`}
                                    >
                                        {value.client.first_name}
                                    </Link>
                                </td>
                                <td>{value.consumer}</td>

                                <td>{value.operationAddress}</td>
                                <td style={{ textAlign: "left" }}>
                                    {value.additionalOptions
                                        .split(";")
                                        .map((item, i) => (
                                            <div key={i}>{item}</div>
                                        ))}
                                </td>
                                <td>
                                    <Link
                                        href={`serviceCompany/${value.serviceCompany.id}`}
                                    >
                                        {value.serviceCompany.first_name}
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="17">Загрузка</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export { Info };
