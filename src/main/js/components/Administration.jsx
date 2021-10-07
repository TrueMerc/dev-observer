import React from "react";
import "react-tabs/style/react-tabs.css";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

export const Administration = (props) => {
    return  (
        <div className='main-area'>
            <Tabs forceRenderTabPanel>
                <TabList>
                    <Tab>Управление пользователями</Tab>
                    <Tab>Управление устройством</Tab>
                </TabList>

                <TabPanel>
                    <h2>Управление пользователями</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Управление устройством</h2>
                </TabPanel>
            </Tabs>
        </div>

    );
}