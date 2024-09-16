"use client";
import { Drama } from "@write-with-laika/drama-engine";
import { ChatHistoryContainer } from "./ChatHistoryContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";


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
        <Tabs defaultValue={activeTabIndex + "_tab"} onValueChange={(value) => setActiveTabIndex(parseInt(value))}>
            <TabsList>
                {drama.chats.map((item, index) => (
                    <TabsTrigger key={index} value={index + "_tab"}>{item.id}</TabsTrigger>
                ))}
            </TabsList>
            {drama.chats.map((item, index) => (
                <TabsContent value={index + "_tab"} key={index}>
                    <Separator className="w-full my-2" />
                    <ChatHistoryContainer messages={item.history} />
                </TabsContent>
            ))}
        </Tabs>
    );
};
