import { Toast } from "./field.types"

export type TFormContext = {
     fields: {
        [key: string] : {
            value: string,
            errors: Array<string>,
            touched: boolean
        }
     },
     onChange: any,
     onBlur: any,
     onSubmit: any,
     isValid: any,
     submitStatus: any
    countOfWords: any,
    toast: Toast,
    setToast: React.Dispatch<React.SetStateAction<Toast>>

}
