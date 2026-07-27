import { TFormContext } from "@/types/Form/formContext.types";
import { createContext } from "react";

export const FormContext = createContext<TFormContext | null>(null)