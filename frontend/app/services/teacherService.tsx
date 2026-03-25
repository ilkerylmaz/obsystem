import api from "./axiosInstance";

export const getTeacherInfoById = async (userId: number) => {
    try {
        const response = await api.get(`/teacher/info/${userId}`);
        return response.data;

    } catch (error) {
        console.error("öğretmen bilgileri çekilirken hata oluştu.", error);
        throw error;
    }
}