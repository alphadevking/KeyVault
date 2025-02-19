import axiosInstance from "../../utils/axiosInstance";

async function getUserProfile(email: string) {
    const jsonData = JSON.stringify({ email });
    try {
        const response = await axiosInstance.post('/users/profile/me', jsonData);
        return response.data;
    } catch (error: any) {
        console.error(error.response?.data.message || error.message);
        throw new Error(error);
    }
}

export { getUserProfile };
