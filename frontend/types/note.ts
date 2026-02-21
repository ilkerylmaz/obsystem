export interface Lesson {
    id: number;
    courseCode: string;
    createdAt: string;
    updatedAt: string;
}

export interface NoteList {
    id: number;
    studentId: number;
    lessonId: number;
    midtermNote: number | null;
    finalNote: number | null;
    makeupExam: number | null;
    average: number | null;
    letterGrade: string | null;
    status: string | null;
    absenteeismCount: number;
}

export interface TranscriptItem {
    courseCode: string;
    semester: string;
    midtermNote: number | null;
    finalNote: number | null;
    average: number | null;
    letterGrade: string | null;
    status: string | null;
}
