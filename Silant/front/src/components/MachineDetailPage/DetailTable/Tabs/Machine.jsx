import React from "react";
import { Table } from "@mui/material";

const Machine = ({ machine }) => {
    return (
        <div style={{ overflowX: "scroll" }}>
            <Table style={{ marginBottom: '100px' }}>
                <tbody>
                <tr>
                    <th colSpan="8">ОБЩИЕ СВЕДЕНИЯ</th>
                </tr>
                <tr>
                    <th>Модель двигателя</th>
                    <th>Зав. № двигателя</th>
                    <th>Модель трансмиссии (производитель, артикул)</th>
                    <th>Зав. № трансмиссии</th>
                    <th>Модель ведущего моста</th>
                    <th>Зав. № ведущего моста</th>
                    <th>Модель управляемого моста</th>
                    <th>Зав. № управляемого моста</th>
                </tr>
                {machine?.machine?.loading || !machine?.machine?.success ? (
                    <tr>
                        <td colSpan="8">Загрузка</td>
                    </tr>
                ) : (
                    <tr>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.modelOfEngine?.title}</td>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.factoryNumberOfEngine}</td>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.modelOfTransmission?.title}</td>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.factoryNumberOfTransmission}</td>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.modelOfMainAxle?.title}</td>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.factoryNumberOfMainAxle}</td>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.modelOfSteeringAxle?.title}</td>
                        <td>{machine?.machine?.data?.machine[0]?.machine?.factoryNumberOfSteeringAxle}</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
};

export { Machine };
