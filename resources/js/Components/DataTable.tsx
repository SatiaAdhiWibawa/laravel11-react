// resources/js/Components/DataTable.tsx
import React from 'react';
import {
  useTable,
  useSortBy,
  Column,
  TableInstance,
} from 'react-table';

// Define types for the data and columns
type DataTableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
};

const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }: TableInstance<T> = useTable(
    {
      columns,
      data,
    },
    useSortBy // Use sorting!
  );

  return (
    <div>
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 mb-4">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.accessor || column.Header} {...column.getHeaderProps(column.getSortByToggleProps())} className="text-left font-semibold text-gray-800 p-4 bg-gray-100 border-b border-gray-300">
              {column.render('Header')}
              <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      ' ↓'
                    ) : (
                      ' ↑'
                    )
                  ) : (
                    ''
                  )}
                </span>
              </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="odd:bg-gray-50 even:bg-white">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="p-4 border-t border-gray-300">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
