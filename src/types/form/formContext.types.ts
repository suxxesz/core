import { Toast } from "./field.types"

export type TFormContext = {
     fields: {
        [key: string] : {
            value: string,
            errors: Array<string>,
            touched: boolean
        }
     },
     onChange: (name : string, value : string) => void  ,
     onBlur: (name : string) => void  ,
     onSubmit: React.SubmitEventHandler<HTMLFormElement>  ,
     isValid: boolean,
     submitStatus: 'idle' | 'loading' | 'success' | 'error',
    countOfWords: number,
    toast: Toast,
    setToast: React.Dispatch<React.SetStateAction<Toast>>
}
