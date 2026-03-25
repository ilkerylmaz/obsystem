import api from "./axiosInstance";

export const putStudentEnrollmentById = async (userId: number) => {
    try {
        const response = await api.get(`/enrollments/student/${userId}/request`);
        return response.data;
    } catch (error) {
        console.error("kayıt istekleri çekilirken hata oluştu.", error)
        throw error;
    }
}

export const getStudentEnrollmentById = async (userId: number) => {
    try {
        const response = await api.get(`/enrollments/student/${userId}`);
        return response.data;
    } catch (error) {
        console.error("kayıt istekleri çekilirken hata oluştu.", error)
        throw error;
    }
}

export const getTeacherEnrollmentsById = async (userId: number) => {
    try {
        const response = await api.get(`/advisor/${userId}/pending`);
        return response.data;
    } catch (error) {
        console.error("danışman öğretmen kayıt isteklerini çekerken sorun yaşandı.", error);
        throw error;

    }
}

export const putTeacherEnrollmentsById = async (userId: number, requestId: number) => {
    try {
        const response = await api.get(`/advisor/${userId}/request/${requestId}/review`);
        return response.data;
    } catch (error) {
        console.error("danışman öğretmen kayıt isteklerini çekerken sorun yaşandı.", error);
        throw error;

    }
}
