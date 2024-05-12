import React from "react";
import { Table } from "@mui/material";

const Maintenance = ({ maintenance }) => {
    return (
        <div style={{ overflowX: "scroll" }}>
            <Table style={{ marginBottom: '100px' }}>
                <tbody>
                <tr>
                    <th>№ п/п</th>
                    <th>Вид ТО</th>
                    <th>Дата проведения ТО</th>
                    <th>Наработка, м/час</th>
                    <th>№ заказ-наряда</th>
                    <th>дата заказ-наряда</th>
                    <th>Организация проводившая ТО</th>
                </tr>
                {maintenance?.machine?.loading || !maintenance?.machine?.success ? (
                    <tr>
                        <td>Загрузка</td>
                    </tr>
                ) : (
                    maintenance?.machine?.data?.machine?.map((value, idx) => (
                        <tr key={value?.id}>
                            <td>{idx + 1}</td>
                            <td>{value?.typeOfMaintenance?.title}</td>
                            <td>{value?.dateOfMaintenance}</td>
                            <td>{value?.operatingTime}</td>
                            <td>{value?.numberOrderWork}</td>
                            <td>{value?.dateOrderWork}</td>
                            <td>{value?.maintenanceServiceCompany?.first_name}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        </div>
    );
};

export { Maintenance };
