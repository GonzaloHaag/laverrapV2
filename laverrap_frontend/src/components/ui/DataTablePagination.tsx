import type { Table } from "@tanstack/react-table";
import { NativeSelect, NativeSelectOption } from "./NativeSelect";
import { Button } from "./Button";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

export const DataTablePagination = <TData,>({ table } : { table: Table<TData> })=> {
  return (
    <div className="flex items-center gap-x-6 lg:gap-x-8">
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-medium">Filas por página</p>
        <NativeSelect value={`${table.getState().pagination.pageSize}`} onChange={(e) => { table.setPageSize(Number(e.target.value));}}>
          {[10, 20, 25, 30, 40, 50].map((pageSize) => (
            <NativeSelectOption key={pageSize} value={pageSize}>
              {pageSize}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="flex w-25 items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Ir a la primera página</span>
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Página anterior</span>
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Página siguiente</span>
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Ir a la última página</span>
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
};