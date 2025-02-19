import axios from 'axios';
import { serverApiKey, keyvaultServerUrl } from '.';

export interface GenerateProps {
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeDigits: boolean;
    includeSymbols: boolean;
};

const generate = async ({ includeUppercase, includeLowercase, includeDigits, includeSymbols }: GenerateProps): Promise<string> => {

    const length = Math.floor(Math.random() * (16 - 8 + 1)) + 8;

    const data = JSON.stringify({
        "includeUppercase": includeUppercase,
        "includeLowercase": includeLowercase,
        "includeDigits": includeDigits,
        "includeSymbols": includeSymbols,
        "length": length
    });

    const response = await axios.post(
        `${keyvaultServerUrl}/keyvault/generate`,
        data, // Empty Request Body object
        {
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": serverApiKey,
            },
        }
    ).catch(error => {
        console.error(error);
        throw new Error(error);
    });

    return response.data.password;
};

export default generate;