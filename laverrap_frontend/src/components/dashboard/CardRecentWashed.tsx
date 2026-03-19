import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Link } from "react-router";

const COLSPAN = 4;
export const CardRecentWashed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos lavados</CardTitle>
        <CardDescription>Lavados recientes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="h-full max-h-80 overflow-y-auto">
          <TableCaption>
            <Link
              to={"/washed"}
              title="Ver todos los lavados"
              className="w-full text-blue-600 hover:underline"
            >
              Ver todos
            </Link>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>N°</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={COLSPAN} className="text-gray-500 text-center">
                Cargando datos...
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};