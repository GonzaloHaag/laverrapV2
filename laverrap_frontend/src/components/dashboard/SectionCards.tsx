import { CardPage } from "@/components/shared";
import { CarIcon, DollarSignIcon, Users2Icon } from "lucide-react";
interface Props {
  totalIncome: number;
  totalWashed: number;
  totalActiveClients: number;
  isLoading: boolean;
}
export const SectionCards = ({ totalIncome, totalWashed, totalActiveClients, isLoading }: Props) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardPage title="Ingresos del mes" value={700} Icon={DollarSignIcon} isLoading={isLoading} isMoney />
      <CardPage title="Ingresos totales" value={totalIncome} Icon={DollarSignIcon} isLoading={isLoading} isMoney />
      <CardPage title="Lavados totales" value={totalWashed} Icon={CarIcon} isLoading={isLoading} />
      <CardPage title="Clientes activos" value={totalActiveClients} Icon={Users2Icon} isLoading={isLoading} />
    </section>
  );
};