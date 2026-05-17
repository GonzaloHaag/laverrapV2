import { Link } from "react-router";
import { Badge, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui";
import { PRIVATE_ROUTES } from "@/utils/routes";
import { buttonVariants } from "../ui/Button/button-variants";
import type { Washing } from "@/types";
import { formatCurrency, formatDate, formatWashingStatus } from "@/utils/formatters";
interface Props {
    data: Washing[];
}
export const TableRecentWashed = ({ data }: Props) => {
  return (
    <Table>
      <TableCaption>
        <Link to={PRIVATE_ROUTES.WASHED.path} title="Ver todos" className={buttonVariants({ variant: "link" })}>
            Ver todos los lavados
        </Link>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Empleado</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((washing) => (
          <TableRow key={washing.id}>
            <TableCell className="font-medium">{washing.id}</TableCell>
            <TableCell>{washing.client.name}</TableCell>
            <TableCell>{washing.employee.name}</TableCell>
            <TableCell>{formatCurrency(washing.price)}</TableCell>
            <TableCell>{formatDate(washing.created_at)}</TableCell>
            <TableCell>
              <Badge variant={washing.status === "COMPLETED" ? "success" : "outline"} title={formatWashingStatus[washing.status]}>
                {formatWashingStatus[washing.status]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
