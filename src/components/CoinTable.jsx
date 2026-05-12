import { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

const CoinTable = ({ coins }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: '#',
        id: 'serial_number',
      },
      {
        header: 'Coin',
        accessorKey: 'name',
        cell: (info) => (
          <div className="table-coin-info">
            <img src={info.row.original.image} alt={info.getValue()} className="table-coin-img" />
            <span className="table-coin-name">{info.getValue()}</span>
            <span className="table-coin-symbol">{info.row.original.symbol.toUpperCase()}</span>
          </div>
        ),
      },
      {
        header: 'Price',
        accessorKey: 'current_price',
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      },
      {
        header: '24h Change',
        accessorKey: 'price_change_percentage_24h',
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={value >= 0 ? 'positive' : 'negative'}>
              {value >= 0 ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
            </span>
          );
        },
      },
      {
        header: 'Market Cap',
        accessorKey: 'market_cap',
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: coins,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id, // Stable row IDs
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="table-container">
      <table className="premium-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr 
              key={row.id} 
              onClick={() => navigate(`/coin/${row.original.id}`)}
              className="table-row"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {cell.column.id === 'serial_number' 
                    ? (table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + index + 1
                    : flexRender(cell.column.columnDef.cell, cell.getContext())
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoinTable;
