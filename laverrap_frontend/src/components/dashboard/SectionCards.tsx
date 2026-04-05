import { CardPage } from "@/components/shared";
import { CarIcon, DollarSignIcon, Users2Icon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardPage title="Ingresos del mes" value={245000} Icon={DollarSignIcon} isLoading={false} isMoney />
      <CardPage title="Ingresos totales" value={600000} Icon={DollarSignIcon} isLoading={false} isMoney />
      <CardPage title="Lavados totales" value={342} Icon={CarIcon} isLoading={false} />
      <CardPage title="Clientes activos" value={25} Icon={Users2Icon} isLoading={false} />
    </section>
  );
};