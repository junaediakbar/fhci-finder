import parse from 'html-react-parser';
import { useState } from 'react';

import Modal from '@/components/modals/Modal';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import { VacancyDetail } from '@/constant/types';
import { getJobDetailById } from '@/pages/api/jobsApi';

type ModalReturnType = {
  openModal: (id: string) => void;
};

import dynamic from 'next/dynamic';

function DetailModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [detailJob, setDetailJob] = useState<VacancyDetail | null>(null);

  const modalReturn: ModalReturnType = {
    openModal: async (id) => {
      setOpen(true);
      const res = await getJobDetailById(id);

      if (res.data === undefined || res.data === null) {
        return;
      }
      setDetailJob(res?.data as VacancyDetail);
    },
  };

  function getImageCompanyUrl(url: string, company_id: string) {
    return `https://rekrutmenbersama2024.fhcibumn.id/assets/images/company_logo/${company_id}/${url}`;
  }

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={detailJob?.vacancy_name}>
        <Modal.Section className='mb-6'>
          <div className='flex flex-row justify-between'>
            <div>
              <Typography variant='h4'>{detailJob?.tenant_name}</Typography>
              <Typography variant='b2'>
                {detailJob?.job_function} - Kuota: {detailJob?.quota}
              </Typography>
            </div>
            <div>
              <NextImage
                useSkeleton
                width={130}
                height={130}
                src={getImageCompanyUrl(
                  detailJob?.logo as string,
                  detailJob?.no_ig as string
                )}
                alt='logo'
              ></NextImage>
            </div>
          </div>
          <Typography variant='h5' className='mt-6'>
            Deskripsi Pekerjaan
          </Typography>
          {detailJob?.vacancy_description && (
            <div>{parse(detailJob?.vacancy_description)}</div>
          )}
          <Typography variant='h5' className='mt-6'>
            Persyaratan
          </Typography>
          {detailJob?.vacancy_requirements && (
            <div>{parse(detailJob?.vacancy_requirements)}</div>
          )}
        </Modal.Section>
      </Modal>
    </>
  );
}

export default dynamic(() => Promise.resolve(DetailModal), {
  ssr: false,
});
