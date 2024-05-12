import * as React from "react";
import { Info } from "./Tabs/Info";
import { Maintenance } from "./Tabs/Maintenance";
import { Complaints } from "./Tabs/Complaints";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import "./MainPageTable.css";

const MainPageTable = (props) => {
    const { complaints, maintenance, machine, user } = props;
    const [value, setValue] = React.useState(0);

    const tabChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ padding: '40px 0 0' }}>
                        <div>{children}</div>
                    </Box>
                )}
            </div>
        );
    };

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const a11yProps = (index) => {
        return {
            id: `tab-${index}`,
            "aria-controls": `tabpanel-${index}`,
        };
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={tabChange}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Общая Информация" {...a11yProps(0)} />
                    <Tab label="ТО" {...a11yProps(1)} />
                    <Tab label="Рекламация" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Info machine={machine} user={user} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Maintenance maintenance={maintenance} user={user} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Complaints complaints={complaints} user={user} />
            </TabPanel>
        </Box>
    );
};

export { MainPageTable };
