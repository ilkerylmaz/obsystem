import {NotelistStatus} from "@/app/enum/NotelistStatus";

export type Notelist = {
    id: number;
    semesterName?: string;
    notes: {
        id: number;
        lessonName?: string;
        courseCode?: string;
        midtermNote?: number | null | undefined;
        finalNote?: number | null | undefined;
        makeupExam?: number | null | undefined;
        average?: number | null | undefined;
        status?: NotelistStatus | null | undefined;
        absenteeismCount?: number | 0 | undefined;
        grade ?: string | null | undefined;
    }[];
};