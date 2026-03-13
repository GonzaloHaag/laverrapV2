import { Header } from "@/components/layout";
import { Toaster } from "@/components/ui";
import { AuthGuard } from "@/guards";
import { Outlet } from "react-router";

export const ProtectedLayout = () => {
  return (
    <AuthGuard>
      <Header />
      <main className="bg-red-200 min-h-[calc(100svh-5rem)]">
        <div className="container max-w-7xl w-full mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Toaster position="top-right" richColors duration={3000} />
    </AuthGuard>
  );
};