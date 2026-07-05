import { Fields } from '@/types/Form/field.types';

const sendMessage = async (fields: Fields) => {

    const response = await fetch(

        "http://localhost:3001/api/message",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(fields)

        }

    );

    return response.json();

};

export default sendMessage;