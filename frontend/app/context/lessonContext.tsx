import React, { createContext, useContext } from "react";

export type LessonItem = {
    courseCode?: string;
    lessonName?: string;
    credit?: number;
    ects?: number;
    departmentId?: number;
    lessonType?: string;
    teacherFullName?: string;
    semesterName?: string;
}

type LessonContextValue = { lessons: LessonItem[] };

const LessonContext = createContext<LessonContextValue | undefined>(undefined);

export default function LessonProvider({
    children,
    lessons
}: {
    children: React.ReactNode;
    lessons: LessonItem[]
}) {
    return <LessonContext.Provider value={{ lessons }}> {children} </LessonContext.Provider>
}

export function useLesson() {
    const ctx = useContext(LessonContext);
    if (!ctx) throw new Error("error");
    return ctx;
}