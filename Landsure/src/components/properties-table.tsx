"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Property = {
  id: string;
  name: string;
  area: number;
  location: string;
  status: "Active" | "Disputed";
};

type PropertyWithActions = Property & {
  onSelect: (property: Property) => void;
};

export const columns: ColumnDef<PropertyWithActions>[] = [
  {
    accessorKey: "name",
    header: "Property Name",
  },
  {
    accessorKey: "area",
    header: "Area (sq.m)",
    cell: ({ row }) => `${row.getValue("area")} m²`,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <Button
        variant="link"
        className="h-auto p-0"
        onClick={() => row.original.onSelect(row.original)}
      >
        View on Map
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue("status") === "Active" ? "default" : "destructive"
        }
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        size="sm"
        onClick={() => row.original.onSelect(row.original)}
      >
        View Details
      </Button>
    ),
  },
];

interface DataTableProps {
  data: Property[];
  onSelect: (property: Property) => void;
}

export function DataTable({ data, onSelect }: DataTableProps) {
  const tableData = data.map(property => ({
    ...property,
    onSelect,
  }));

  const table = useReactTable<PropertyWithActions>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
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
                No properties found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}