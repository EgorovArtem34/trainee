import { ColumnDef } from "@tanstack/react-table";

export interface ApiEndpoints {
  users: string;
}

export interface ColumnSizes {
  size: number;
  minSize: number;
  maxSize: number;
}

export interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  defaultColumn: ColumnSizes;
  isTrBodyBtn?: boolean;
  handleClick?: (id: number) => void;
}
