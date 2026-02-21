import type { ReactNode } from "react";

// TODO: Student role guard
export default function StudentLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
