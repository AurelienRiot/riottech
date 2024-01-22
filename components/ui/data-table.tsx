"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    initialData: TData[];
    searchKey: string;
}

export function DataTable<TData, TValue>({
    columns,
    initialData,
    searchKey,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [selectValue, setSelectValue] = useState(searchKey);
    const [data, setData] = useState(initialData);

    const [sorting, setSorting] = useState<SortingState>([]);

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const flatHeaders = table.getFlatHeaders();
    const searchKeys = flatHeaders
        .filter(
            (header) => header.id !== "actions" && header.id !== "createdAt",
        )
        .map((header) => header.id);

    const removeKeys = ["aucune", ...searchKeys];

    const displayKeys = flatHeaders.map(
        (header) => header.column.columnDef.header,
    );

    const displayRemovesKeys = ["aucune", ...displayKeys];

    function removeDuplicates(array: any[], key: string) {
        const seen: { [key: string]: boolean } = {};
        const result = [];
        if (key === "aucune") {
            return array;
        }
        for (const obj of array) {
            if (!(obj[key] in seen)) {
                seen[obj[key]] = true;
                result.push(obj);
            }
        }
        return result;
    }

    return (
        <div className="">
            <div className="justify-content-center grid grid-cols-1 gap-4 py-4 md:grid-cols-5">
                <Input
                    placeholder="Recherche"
                    value={
                        (table
                            .getColumn(selectValue)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(selectValue)
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm "
                />
                <div className="relative inline-flex sm:pl-2 ">
                    <Select
                        defaultValue={selectValue}
                        onValueChange={(newValue) => {
                            table.getColumn(selectValue)?.setFilterValue("");
                            setSelectValue(newValue);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            {searchKeys.map((key, index) => (
                                <SelectItem key={key} value={key}>
                                    {String(displayKeys[index])}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Select
                        defaultValue={String(
                            table.getState().pagination.pageSize,
                        )}
                        onValueChange={(newPageSize) => {
                            table.setPageSize(Number(newPageSize));
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a page size" />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={String(pageSize)}
                                >
                                    {pageSize} lignes
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="sm:pl-2">
                    <Select
                        onValueChange={(selectedKey) => {
                            setData(removeDuplicates(initialData, selectedKey));
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Supprimer récurence" />
                        </SelectTrigger>
                        <SelectContent>
                            {removeKeys.map((key, index) => (
                                <SelectItem key={key} value={key}>
                                    {String(displayRemovesKeys[index])}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="bg-gray-400 text-white dark:bg-black"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={
                                        "even:bg-gray-200 odd:dark:bg-blue-950 even:dark:bg-gray-900"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Pas de résultats
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Précedent
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
}
