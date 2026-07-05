import { IAudioContext } from "@/types/providers.interfaces";
import { createContext } from "react";

export const AudioContext = createContext<Partial<IAudioContext> | null>(null)