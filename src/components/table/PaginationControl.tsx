import { RowData, Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { buildPaginationControl } from '@/lib/pagination';
import { clsxm } from '@/lib/utils';

import Button from '@/components/buttons/Button';

type PaginationControlProps<T extends RowData> = {
  data: T[];
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 *
 * @see https://javascript.plainenglish.io/create-a-pagination-in-a-react-way-df5c6fe1e0c7
 */
export default function PaginationControl<T extends RowData>({
  className,
  data,
  table,
  ...rest
}: PaginationControlProps<T>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const paginationControl = buildPaginationControl(currentPage, pageCount);

  const handlePageControlClick = (page: string | number) => {
    if (page !== '...') {
      table.setPageIndex((page as number) - 1);
    }
  };

  return (
    <div
      className={clsxm(
        'flex items-center justify-between gap-x-2  md:justify-end',
        className
      )}
      {...rest}
    >
      <div className='flex gap-1'>
        <Button
          variant='ghost'
          size='sm'
          leftIcon={ChevronLeft}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Prev
        </Button>
        {paginationControl.map((page, index) => (
          <Button
            key={index}
            variant='ghost'
            size='sm'
            className={clsxm(
              currentPage === page && 'bg-primary-400 text-white',
              'min-w-[2rem]'
            )}
            onClick={() => handlePageControlClick(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant='ghost'
          size='sm'
          rightIcon={ChevronRight}
          disabled={
            !table.getCanNextPage() ||
            data.length < table.getState().pagination.pageSize
          }
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
