import React, { createContext, useContext } from "react";
export type StudentInfo = {
    studentNo?: string;
    fullName?: string;
    email?: string;
    telephone?: string;
    departmentName?: string;
    advisorFullName?: string;
    enrollmentYear?: number;
    classYear?: number;
    createdAt?: string;
}
type StudentContextValue = { studentInfo: StudentInfo | null };

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export function StudentProvider({ children, studentInfo }: { children: React.ReactNode; studentInfo: StudentInfo | null }) {
    return <StudentContext.Provider value={{ studentInfo }}>{children}</StudentContext.Provider>;
}

export function useStudent() {
    const ctx = useContext(StudentContext);
    if (!ctx) throw new Error("useStudent must be used within StudentProvider");
    return ctx;
}