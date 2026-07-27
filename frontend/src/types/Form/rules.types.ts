export type TRules = {
    name : {
        min : number
        max : number
        required : boolean
    },
    subname : {
        min : number
        max : number
        required : boolean
    },
    email : {
        min : number
        max : number
        required? : boolean
        pattern? : RegExp
        patternMessage ?: string
    },
    topic : {
        required : boolean
    },
    country : {
        min : number
        max : number
        required : boolean
    },
    message : {
        min : number
        max : number
        required : boolean
    }
}