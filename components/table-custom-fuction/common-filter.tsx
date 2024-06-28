import type { Row } from "@tanstack/react-table";

export const FilterFn = (row: Row<any>, id: string, value: any) => {
  return Array.isArray(value) && value.includes(String(row.getValue(id)));
};
