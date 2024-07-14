// react-table.d.ts
declare module 'react-table' {
  import { ComponentType, ReactNode } from 'react';

  export interface Column<D extends object = {}> {
    Header: string | ReactNode | (() => ReactNode);
    accessor: keyof D | ((row: D) => any);
    disableSortBy?: boolean;
    Cell?: ComponentType<{ value: any; row: { original: D } }> | ((cell: { value: any; row: { original: D } }) => ReactNode);
    Filter?: ComponentType<any> | ((column: any) => ReactNode);
    [key: string]: any;
  }

  export interface TableOptions<D extends object = {}> {
    columns: Array<Column<D>>;
    data: Array<D>;
    defaultColumn?: Partial<Column<D>>;
  }

  export interface Hooks<D extends object = {}> {}

  export interface TableInstance<D extends object = {}> extends TableOptions<D> {
    hooks: Hooks<D>;
    rows: Array<Row<D>>;
    prepareRow: (row: Row<D>) => void;
    getTableProps: (propGetter?: any) => any;
    getTableBodyProps: (propGetter?: any) => any;
    headerGroups: Array<HeaderGroup<D>>;
    state: any;
    setGlobalFilter: (filterValue: any) => void;
    preGlobalFilteredRows: Array<Row<D>>;
  }

  export interface Row<D extends object = {}> {
    cells: Array<Cell<D>>;
    getRowProps: (propGetter?: any) => any;
    original: D;
  }

  export interface Cell<D extends object = {}> {
    getCellProps: (propGetter?: any) => any;
    render: (type: string) => any;
  }

  export interface HeaderGroup<D extends object = {}> {
    headers: Array<ColumnInstance<D>>;
    getHeaderGroupProps: (propGetter?: any) => any;
  }

  export interface ColumnInstance<D extends object = {}> extends Column<D> {
    getHeaderProps: (propGetter?: any) => any;
    getSortByToggleProps: (propGetter?: any) => any;
    isSorted: boolean;
    isSortedDesc: boolean;
    canFilter: boolean;
    render: (type: string) => any;
  }

  export function useTable<D extends object = {}>(options: TableOptions<D>, ...plugins: Array<PluginHook<D>>): TableInstance<D>;

  export function useFilters<D extends object = {}>(hooks: Hooks<D>): void;
  export function useGlobalFilter<D extends object = {}>(hooks: Hooks<D>): void;
  export function useSortBy<D extends object = {}>(hooks: Hooks<D>): void;

  export type PluginHook<D extends object = {}> = (hooks: Hooks<D>) => void;
}
