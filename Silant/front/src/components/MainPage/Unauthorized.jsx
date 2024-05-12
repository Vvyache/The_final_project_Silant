import React, { useState } from "react";
import { Button, Input, Table, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import { oneMachineData } from "../../Store/Slicers/MachineSlicer";
import { theme } from "../../Theme/Theme";

function Unauthorized() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.machine);
    const { oneData, status } = data;

    const [machineNumber, setMachineNumber] = useState("");

    const submit = () => {
        dispatch(oneMachineData(machineNumber));
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            submit();
        }
    };

    const renderTableContent = () => {
        if (!oneData || !oneData.modelOfMachine) {
            return (
                <tr>
                    <td colSpan={10}>{status === 'BAD' ? 'Техника с таким заводским номером отсутствует' : ''}</td>
                </tr>
            );
        }

        return (
            <tr>
                <td>{oneData.modelOfMachine.title}</td>
                <td>{oneData.factoryNumberOfMachine}</td>
                <td>{oneData.modelOfEngine.title}</td>
                <td>{oneData.factoryNumberOfEngine}</td>
                <td>{oneData.modelOfTransmission.title}</td>
                <td>{oneData.factoryNumberOfTransmission}</td>
                <td>{oneData.modelOfMainAxle.title}</td>
                <td>{oneData.factoryNumberOfMainAxle}</td>
                <td>{oneData.modelOfSteeringAxle.title}</td>
                <td>{oneData.factoryNumberOfSteeringAxle}</td>
            </tr>
        );
    };

    return (
        <CustomContainer>
            <h1 style={{ textAlign: "center", color: "var(--main_color)" }}>
                Проверьте комплектацию и технические характеристики техники Силант
            </h1>
            <hr />
            <div style={{ textAlign: "center", margin: "30px 0" }}>
                <Input
                    type="text"
                    placeholder="Зав. № техники"
                    value={machineNumber}
                    onChange={(e) => setMachineNumber(e.target.value)}
                    onKeyPress={handleEnterPress}
                />
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        onClick={submit}
                        style={{ marginLeft: "10px", color: "white", backgroundColor: "var(--main_color)" }}
                    >
                        Искать
                    </Button>
                </ThemeProvider>
            </div>
            <h3 style={{ textAlign: "center", color: "var(--main_color)" }}>
                Информация о комплектации и технических характеристиках Вашей техники
            </h3>
            <div style={{ overflowX: "scroll" }}>
                <Table style={{ marginBottom: '100px' }}>
                    <tbody>
                    <tr>
                        <th colSpan="10">ОБЩИЕ СВЕДЕНИЯ</th>
                    </tr>
                    <tr>
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
                    </tr>
                    {renderTableContent()}
                    </tbody>
                </Table>
            </div>
        </CustomContainer>
    );
}

export { Unauthorized };
