import { CardChartIncome, CardChartWashed, SectionCards } from "@/components/dashboard";
import { useStats } from "@/hooks";

export const DashboardPage = () => {
  const { isLoading, isError, data } = useStats();
  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-0">
        <h1 className="text-2xl font-semibold">DASHBOARD</h1>
        <span className="text-sm text-gray-500">
          Resumen general del negocio
        </span>
      </div>
      {
        isError ? (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            Error al cargar las estadísticas. Por favor, inténtalo de nuevo más tarde.
          </div>
        ) : (
          <SectionCards 
            totalIncome={data?.totalIncome ?? 0} 
            totalWashed={data?.totalWashed ?? 0} 
            totalActiveClients={data?.totalActiveClients ?? 0} 
            isLoading={isLoading} 
          />
        )
      }
      <div className="grid md:grid-cols-2 gap-4">
        <CardChartIncome />
        <CardChartWashed />
      </div>
    </section>
  );
};