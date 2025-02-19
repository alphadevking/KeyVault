import axios from 'axios';
import { serverApiKey, keyvaultServerUrl } from '.';

const viewDB = async () => {
    await axios.post(
        `${keyvaultServerUrl}/viewDB`,
        {}, // Empty Request Body object
        {
            headers: {
                "x-api-key": serverApiKey,
            },
        }
    ).then(response => {
        console.log('Data fetched successfully:', response.data);
        return response.data;
    }).catch(error => {
        console.error(error);
        throw new Error(error);
    });
};

export default viewDB;