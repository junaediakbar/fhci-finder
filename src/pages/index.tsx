import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';
import * as React from 'react';

import IconButton from '@/components/buttons/IconButton';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import PaginatedTable from '@/components/table/PaginatedTable';

import { Vacancy } from '@/constant/types';
import { getAllJobs } from '@/pages/api/jobsApi';
import DetailModal from '@/pages/components/DetailModal';

export default function HomePage({ listJob: listJob }: { listJob: Vacancy[] }) {
  const columns: ColumnDef<Vacancy>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: 'vacancy_name',
      header: 'Nama',
    },
    {
      accessorKey: 'tenant_name',
      header: 'Perusahaan',
    },
    {
      accessorKey: 'total_job_available',
      header: 'Kuota',
    },
    {
      accessorKey: 'vacancy_id',
      header: 'Detail',
      cell: (data) => {
        return (
          <DetailModal id={data.getValue() as string}>
            {({ openModal }) => (
              <IconButton
                icon={EyeIcon}
                variant='ghost'
                color='secondary'
                className='text-secondary'
                onClick={() => openModal(data.getValue() as string)}
              >
                Open Modal
              </IconButton>
            )}
          </DetailModal>
        );
      },
    },
  ];

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex-colpy-12 r relative flex min-h-screen'>
            <div className='layout min-h-screen py-20'>
              <div>
                <h1 className='mb-3 mt-2'>FHCI BUMN Jobs Table</h1>
                <ArrowLink href='/count-score'>Hitung Skor</ArrowLink>
              </div>

              <PaginatedTable
                columns={columns}
                data={listJob}
                className='mt-4'
                omitSort
                withFilter
              />
            </div>
            <footer className='absolute bottom-2 mb-4 flex w-full justify-center text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink className='ml-1' href='https://junaediakbar.com'>
                Junaedi Akbar
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await getAllJobs();
  const listJob = res.data;
  return {
    props: {
      listJob,
    },
    revalidate: 60 * 60 * 24,
  };
}
