"use client"

import { defaultModelConfig, Drama } from "@write-with-laika/drama-engine";
import { createContext, useEffect, useState } from 'react';
import { testCompanionConfigs } from '../config/companions';

export const DramaContext = createContext<Drama | undefined>(undefined);

interface DramaProps {
    children: React.ReactNode;
}

export const DramaProvider = ({ children }: DramaProps) => {
    const [drama, setDrama] = useState<Drama | undefined>();

    useEffect(() => {
        const initialiseDrama = async () => {
            const d = await Drama.initialize("co-working", testCompanionConfigs, {
                ...defaultModelConfig, model: "meta-llama/Llama-3-8b-chat-hf", max_tokens: 50
            });
            setDrama(d);

            d.addChat("water-cooler", "water-cooler", [...d.companions.filter(c => c.configuration.kind == "npc").map(c => c.id), "you"], 8, "auto");
        }
        !drama && initialiseDrama();
    }, [drama])

    return (
        <DramaContext.Provider value={drama} >
            {children}
        </DramaContext.Provider>
    );
}