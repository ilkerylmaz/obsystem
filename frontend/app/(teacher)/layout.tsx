import type { ReactNode } from "react";

// TODO: Teacher role guard
export default function TeacherLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
