import api from "./axiosInstance";

export const getStudentNotesById = async (userId: number) => {
    try{
        const response = await api.get(`/student/${userId}/notes`)
        return response.data;
    }catch(err){
        console.error("öğrenci not bilgisi çekilirken hata oluştu. ",err);
        throw err;
    }
}