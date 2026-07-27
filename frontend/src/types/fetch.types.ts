export interface IFormData  {
    name : string , 
    email : string
    field? : string , 
    subname? : string | null , 
    topic : string , 
    country : string  , 
    message :  string , 
}

export type TAsyncData<T> =  (formData : IFormData ) => Promise<T>