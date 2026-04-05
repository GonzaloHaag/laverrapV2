
import { HeaderDesktop, HeaderMobile } from "@/components/layout";
import { Toaster } from "@/components/ui";
import { AuthGuard } from "@/guards";
import { Outlet } from "react-router";

export const ProtectedLayout = () => {
  return (
    <AuthGuard>
      <HeaderDesktop />
      <HeaderMobile />
      <main className="min-h-[calc(100svh-5rem)] bg-background">
        <div className="container max-w-7xl w-full mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Toaster position="top-right" richColors duration={3000} />
    </AuthGuard>
  );
};