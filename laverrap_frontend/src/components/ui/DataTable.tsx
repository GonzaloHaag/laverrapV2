import { useState, type ChangeEvent } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { InputSearch } from "../shared";
import { DataTablePagination } from "./DataTablePagination";
import { NativeSelect, NativeSelectOption } from "./NativeSelect";
import type { Option } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  isLoading:boolean;
  isError: boolean;
  searchFilter: string;
  searchPlaceholder?: string;
  filterByStatus?: boolean;
  options?: Option[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  searchFilter,
  searchPlaceholder = "Buscar...",
  isError,
  filterByStatus = false,
  options
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters
    },
    initialState: {
      pagination: {
        pageSize: 10,
      }
    }
  });

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    table.getColumn(searchFilter)?.setFilterValue(value);
  };

  const onChangeFilterStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    table.getColumn("status")?.setFilterValue(value);
  };
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-x-6 gap-y-4">
        <InputSearch placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onChangeFilter} />
        { filterByStatus && (
          <NativeSelect
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onChange={onChangeFilterStatus}
            className="w-full max-w-60"
          >
            <NativeSelectOption value="">Todos los estados</NativeSelectOption>
            {
              options && options.map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
              ))
            }
          </NativeSelect>
        )}
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                     Cargando datos...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                     Ocurrió un error al cargar los datos.
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                No se encontraron resultados.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
   
  );
}