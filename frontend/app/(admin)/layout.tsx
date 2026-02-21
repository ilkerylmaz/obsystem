import type { ReactNode } from "react";

// TODO: Admin role guard - JWT cookie'den role kontrol edilecek
export default function AdminLayout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
