import { useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";

const MaintenanceFilters = () => {
    const queryTheme = useTheme();
    const queryMd = useMediaQuery(queryTheme.breakpoints.down("md"));

    function filter(id, item) {
        const inputValue = document.getElementById(item).value.toLowerCase();
        const tbody = document.querySelector("tbody");
        const tr = tbody.querySelectorAll("tr");

        for (let index = 1; index < tr.length; index++) {
            const td = tr[index].querySelectorAll("td")[id];
            if (td) {
                const textContent = (td.textContent || td.querySelector("a").textContent).toLowerCase();
                tr[index].style.display = textContent.includes(inputValue) ? "table-row" : "none";
            }
        }
    }

    function clearOtherInputs(id) {
        const inputs = document.querySelectorAll("input");
        inputs.forEach((item) => {
            if (id !== item.id) {
                item.value = "";
            }
        });
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: queryMd ? "column" : "row",
                justifyContent: "space-evenly",
            }}
        >
            <label>
                Зав № техники
                <br />
                <input
                    type="text"
                    placeholder="техника"
                    id="machine"
                    onClick={() => clearOtherInputs("machine")}
                    onChange={() => filter(1, "machine")}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Вид ТО
                <br />
                <input
                    type="text"
                    placeholder="ТО"
                    id="TO"
                    onClick={() => clearOtherInputs("TO")}
                    onChange={() => filter(2, "TO")}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
            <label>
                Сервисная компания
                <br />
                <input
                    type="text"
                    placeholder="Сервисная компания"
                    id="serviceCompany"
                    onClick={() => clearOtherInputs("serviceCompany")}
                    onChange={() => filter(7, "serviceCompany")}
                    style={{ margin: "10px 0", width: "100%" }}
                />
            </label>
        </div>
    );
};

export { MaintenanceFilters };
