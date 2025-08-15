// app/dashboard/layout.tsx
import { AuthProvider } from "@/components/AuthGuard";
import { MainLayout } from "@/components/layout/main-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}
