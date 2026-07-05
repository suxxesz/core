import { ICopyContext, IUseCopy } from "@/types/providers.interfaces";
import { createContext } from "react";

type CopyContextType = ICopyContext & IUseCopy

export const CopyContext = createContext<Partial<CopyContextType> | ICopyContext |null>(null)