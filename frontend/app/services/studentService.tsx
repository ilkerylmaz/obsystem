import api from "./axiosInstance";


export const getStudentInfo = async (userId: Number) => {

    try {
        const response = await api.get(`/student/${userId}/info`)
        return response.data;
    } catch (error) {
        console.error("student info çekilirken hata oluştu", error);
        throw error;
    }
};

export const getStudentGpa = async (userId: Number) => {
    try {
        const response = await api.get(`/student/${userId}/gpa`);
        return response.data;
    } catch (error) {
        console.error("student gpa çekilirken hata oluştu", error);
        throw error;
    }
};