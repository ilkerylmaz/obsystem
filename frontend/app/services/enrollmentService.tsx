import api from "./axiosInstance";

export const createStudentEnrollmentRequest = async (userId: number, teacherLessonId: number, requestNote?: string) => {
    try {
        const response = await api.post(`/enrollments/student/${userId}/request`, {
            teacherLessonId,
            requestNote: requestNote || ""
        });
        return response.data;
    } catch (error) {
        console.error("kayıt isteği oluşturulurken hata oluştu.", error);
        throw error;
    }
}

export const getAvailableCourses = async (userId: number) => {
    try {
        const response = await api.get(`/enrollments/student/${userId}/available-courses`);
        return response.data;
    } catch (error) {
        console.error("uygun dersler çekilirken hata oluştu.", error);
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
        const response = await api.get(`/enrollments/advisor/${userId}/pending`);
        return response.data;
    } catch (error) {
        console.error("danışman öğretmen kayıt isteklerini çekerken sorun yaşandı.", error);
        throw error;
    }
}

export const putTeacherEnrollmentsById = async (userId: number, requestId: number, status: string, reviewNote: string) => {
    try {
        const response = await api.put(`/enrollments/advisor/${userId}/request/${requestId}/review`, { status, reviewNote });
        return response.data;
    } catch (error) {
        console.error("danışman öğretmen kayıt isteklerini çekerken sorun yaşandı.", error);
        throw error;
    }
}
