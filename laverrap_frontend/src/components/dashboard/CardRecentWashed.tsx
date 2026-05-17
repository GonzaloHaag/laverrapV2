import type { Washing } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { TableRecentWashed } from "./TableRecentWashed";
interface Props {
  isLoading: boolean;
  isError: boolean;
  data: Washing[];
}
export const CardRecentWashed = ({ isLoading, isError, data }: Props) => {
  if (isError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded text-sm">
        Error al cargar las estadísticas. Por favor, inténtalo de nuevo más
        tarde.
      </div>
    );
  }
  const recentData = data.slice(0, 5);

  const renderData = () => {
    if (isLoading) {
      return (
        <span className="text-gray-600 text-sm">
          Cargando lavados recientes...
        </span>
      );
    }
    if(recentData.length === 0) {
      return (
        <span className="text-gray-600 text-sm">
          No hay lavados recientes para mostrar.
        </span>
      );
    }
    return <TableRecentWashed data={recentData} />;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos lavados</CardTitle>
        <CardDescription>Mostrando los {recentData.length} últimos lavados</CardDescription>
      </CardHeader>
      <CardContent>
        {renderData()}
      </CardContent>
    </Card>
  );
};
