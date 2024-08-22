"use client";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Drama } from "@write-with-laika/drama-engine";
import { ChatHistoryContainer } from "./ChatHistoryContainer";


type ChatTabsContainerProps = {
    drama: Drama | undefined
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
};

export const ChatTabsContainer: React.FC<ChatTabsContainerProps> = ({ drama, activeTabIndex, setActiveTabIndex }) => {
    if (!drama) {
        return <div>Loading ...</div>;
    }
    return (
        <Tabs selectedIndex={activeTabIndex} onSelect={(index) => { setActiveTabIndex(index); }}>
            <TabList>
                {drama.chats.map((item, index) => (
                    <Tab key={index}>{item.id}</Tab>
                ))}
            </TabList>
            {drama.chats.map((item, index) => (
                <TabPanel key={index}>
                    <ChatHistoryContainer messages={item.history} />
                </TabPanel>
            ))}
        </Tabs>
    );
};
