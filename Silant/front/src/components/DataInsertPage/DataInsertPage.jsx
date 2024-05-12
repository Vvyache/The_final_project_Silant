import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddMachine } from "./AddMachine";
import { Button } from "@mui/material";
import { AddMaintenance } from "./AddMaintenance";
import { AddComplaints } from "./AddComplaints";
import { CustomContainer } from "../CustomComponents/CustomContainer";

const DataInsertPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    // Определение компонента на основе параметра type
    const getComponentByType = () => {
        switch (params.type) {
            case "machine":
                return <AddMachine />;
            case "maintenance":
                return <AddMaintenance />;
            case "complaints":
                return <AddComplaints />;
            default:
                return null;
        }
    };

    return (
        <CustomContainer>
            {/* Отображение компонента на основе параметра type */}
            {getComponentByType()}
            <Button onClick={() => navigate("/")}>Назад</Button>
        </CustomContainer>
    );
};

export { DataInsertPage };
