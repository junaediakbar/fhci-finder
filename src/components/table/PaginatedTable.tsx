import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { List } from 'lucide-react';
import * as React from 'react';

import { clsxm } from '@/lib/utils';

import Filter from '@/components/table/Filter';
import PaginationControl from '@/components/table/PaginationControl';
import TBody from '@/components/table/TBody';
import THead from '@/components/table/THead';
import TOption from '@/components/table/TOption';

type PaginatedTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  omitSort?: boolean;
  withFilter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function PaginatedTable<T extends object>({
  className,
  columns,
  data,
  pageSize = 10,
  omitSort = false,
  withFilter = false,
  ...rest
}: PaginatedTableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      <div
        className={clsx(
          'flex flex-col items-stretch gap-3 sm:flex-row',
          withFilter ? 'sm:justify-between' : 'sm:justify-end'
        )}
      >
        {withFilter && <Filter table={table} />}
        <div className='flex gap-3'>
          <TOption
            icon={<List size={16} className='text-typo-secondary' />}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              if (e.target.value === 'All') {
                table.setPageSize(data.length);
              } else {
                table.setPageSize(Number(e.target.value));
              }
            }}
          >
            {[5, 10, 25, 50, 100].map((page) => (
              <option key={page} value={page}>
                {page} Entries
              </option>
            ))}
          </TOption>
        </div>
      </div>
      <div className='-mx-4 -my-2 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} />
            </table>
          </div>
        </div>
      </div>

      <PaginationControl table={table} data={data} className='mt-4' />
    </div>
  );
}
