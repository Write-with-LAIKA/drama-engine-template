"use client"

import { Drama } from "@write-with-laika/drama-engine";
import { createContext, useEffect, useState } from 'react';
import { testCompanionConfigs } from '../config/companions';

export const DramaContext = createContext<Drama | undefined>(undefined);

interface DramaProps {
    children: React.ReactNode;
    baseUrl: string;
    endpoint: string;
    apiKey: string;
    modelName: string;
}

export const DramaProvider = ({ children, baseUrl, endpoint, apiKey, modelName }: DramaProps) => {
    const [drama, setDrama] = useState<Drama | undefined>();

    useEffect(() => {
        process.env.DE_ENDPOINT_URL = endpoint

        const httpClient = (url: string, requestData: any, headers: Headers) => {
            return fetch(url, {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: { ...headers, "DE_BASE_URL": baseUrl, "DE_BACKEND_API_KEY": apiKey },
            })
        }

        const initialiseDrama = async () => {
            const d = await Drama.initialize("co-working", testCompanionConfigs, undefined, {
                defaultModel: { model: modelName, max_tokens: 200 }, summaryModel: undefined, chatModeOverride: undefined, httpClient
            });
            setDrama(d);

            d.addChat("water-cooler", "water-cooler", [...d.companions.filter(c => c.configuration.kind == "npc").map(c => c.id), "you"], 8, "auto");
        }
        !drama && initialiseDrama();
    }, [apiKey, baseUrl, drama, endpoint, modelName])

    return (
        <DramaContext.Provider value={drama} >
            {children}
        </DramaContext.Provider>
    );
}