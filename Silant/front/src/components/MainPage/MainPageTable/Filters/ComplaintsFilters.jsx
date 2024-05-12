import { useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";

const ComplaintsFilters = () => {
    const queryTheme = useTheme();
    const query_md = useMediaQuery(queryTheme.breakpoints.down("md"));
    const [filterValues, setFilterValues] = React.useState({
        nodeOfFailure: "",
        recoveryMethod: "",
        serviceCompany: "",
    });

    const handleInputChange = (event, field) => {
        const value = event.target.value.toLowerCase(); // Приведение к нижнему регистру
        setFilterValues({ ...filterValues, [field]: value });
        filter(field, value);
    };

    const clearOtherInputs = (field) => {
        setFilterValues({ ...filterValues, [field]: "" });
        filter(field, ""); // Пустая строка для сброса фильтра
    };

    const filter = (field, value) => {
        const tbody = document.querySelector("tbody");
        const tr = tbody.querySelectorAll("tr");

        for (let index = 1; index < tr.length; index++) {
            const element =
                tr[index]
                    .querySelectorAll("td")
                    [getFilterFieldIndex(field)].textContent.toLowerCase() || "";

            if (!element.includes(value)) { // Исправлено использование includes
                tr[index].style.display = "none";
            } else {
                tr[index].style.display = "table-row";
            }
        }
    };

    const getFilterFieldIndex = (field) => {
        switch (field) {
            case "nodeOfFailure":
                return 4;
            case "recoveryMethod":
                return 6;
            case "serviceCompany":
                return 10;
            default:
                return -1;
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: query_md ? "column" : "row", justifyContent: "space-evenly" }}>
            <label>
                Узел отказа
                <br />
                <input
                    type="text"
                    placeholder="Узел отказа"
                    value={filterValues.nodeOfFailure}
                    onClick={() => clearOtherInputs("nodeOfFailure")}
                    onChange={(event) => handleInputChange(event, "nodeOfFailure")}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Способ Восстановления
                <br />
                <input
                    type="text"
                    placeholder="Способ Восстановления"
                    value={filterValues.recoveryMethod}
                    onClick={() => clearOtherInputs("recoveryMethod")}
                    onChange={(event) => handleInputChange(event, "recoveryMethod")}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Сервисная компания
                <br />
                <input
                    type="text"
                    placeholder="Сервисная компания"
                    value={filterValues.serviceCompany}
                    onClick={() => clearOtherInputs("serviceCompany")}
                    onChange={(event) => handleInputChange(event, "serviceCompany")}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
        </div>
    );
};

export { ComplaintsFilters };
