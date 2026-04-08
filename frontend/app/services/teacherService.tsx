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

export const getTeacherDashboardStats = async (userId: number) => {
    try {
        const response = await api.get(`/teacher/dashboard/${userId}`);
        return response.data;
    } catch (error) {
        console.error("öğretmen dashboard istatistikleri çekilirken hata oluştu.", error);
        throw error;
    }
}

export const getStudentsByTeacherLesson = async (teacherLessonId: number) => {
    try {
        const response = await api.get(`/teacher/lessons/${teacherLessonId}/students`);
        return response.data;
    } catch (error) {
        console.error("Öğrenci notları çekilirken hata oluştu.", error);
        return { data: [] }; // Safe fallback
    }
};

export const updateGrades = async (updates: any[]) => {
    try {
        const response = await api.put(`/teacher/grades/update`, updates);
        return response.data;
    } catch (error) {
        console.error("Notlar kaydedilirken hata oluştu.", error);
        throw error;
    }
};