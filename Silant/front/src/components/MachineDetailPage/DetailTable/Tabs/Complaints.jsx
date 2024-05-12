import React from "react";
import { Table } from "@mui/material";

const Complaints = ({ complaints }) => {
    const renderComplaints = () => {
        if (complaints.machine.loading || !complaints.machine.success) {
            // Отображаем сообщение о загрузке
            return (
                <tr>
                    <td colSpan="9">Загрузка...</td>
                </tr>
            );
        } else if (complaints.machine.data.complaints_machine.length === 0) {
            // Отображаем сообщение об отсутствии данных
            return (
                <tr>
                    <td colSpan="9">Нет данных о жалобах</td>
                </tr>
            );
        } else {
            // Отображаем данные о жалобах
            return complaints.machine.data.complaints_machine.map((value, idx) => (
                <tr key={value.id}>
                    <td>{idx + 1}</td>
                    <td>{value.dateOfFailure}</td>
                    <td>{value.operatingTime}</td>
                    <td>{value.nodeOfFailure.title}</td>
                    <td>{value.descriptionOfFailure}</td>
                    <td>{value.recoveryMethod.title}</td>
                    <td>{value.usedSpareParts}</td>
                    <td>{value.dateOfRecovery}</td>
                    <td>{value.downtimeOfMachine}</td>
                </tr>
            ));
        }
    };

    return (
        <div style={{ overflowX: "scroll" }}>
            <Table style={{ marginBottom: '100px' }}>
                <tbody>
                <tr>
                    <th>№ п/п</th>
                    <th>Дата отказа</th>
                    <th>Наработка, м/час</th>
                    <th>Узел отказа</th>
                    <th>Описание отказа</th>
                    <th>Способ восстановления</th>
                    <th>Используемые запасные части</th>
                    <th>Дата восстановления</th>
                    <th>Время простоя техники</th>
                </tr>
                {renderComplaints()}
                </tbody>
            </Table>
        </div>
    );
};

export { Complaints };
