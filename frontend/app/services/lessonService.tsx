import api from './axiosInstance';
// Backend URL'ini merkezi bir yerden yönetelim


export const getStudentLessonsById = async (userId: number) => {
    try {
        const response = await api.get(`/student/${userId}/courses`);
        return response.data;
    } catch (error) {
        console.error("Dersler çekilirken hata oluştu:", error);
        throw error;
    }
};

