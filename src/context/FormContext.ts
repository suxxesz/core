import { TFormContext } from "@/types/form/formContext.types";
import { createContext } from "react";

export const FormContext = createContext<TFormContext | null>(null)