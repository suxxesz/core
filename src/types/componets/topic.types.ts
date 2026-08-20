export interface TopicProps {
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur: React.FocusEventHandler<HTMLInputElement>
    errors?: string[] | string
    touched?: boolean
}