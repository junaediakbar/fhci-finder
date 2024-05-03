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

export default function DetailModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = useState(false);
  const [vacancy, setVacancy] = useState<VacancyDetail | null>(null);

  const modalReturn: ModalReturnType = {
    openModal: async (id) => {
      setOpen(true);

      if (id != null) {
        const detail = getJobDetailById(id);
        setVacancy((await detail).data as VacancyDetail);
      }
    },
  };

  function getImageCompanyUrl(url: string, company_id: string) {
    return `https://rekrutmenbersama2024.fhcibumn.id/assets/images/company_logo/${company_id}/${url}`;
  }

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={vacancy?.vacancy_name}>
        <Modal.Section className='mb-6'>
          <div className='flex flex-row justify-between'>
            <div>
              <Typography variant='h4'>{vacancy?.tenant_name}</Typography>
              <Typography variant='b2'>
                {vacancy?.job_function} - Kuota: {vacancy?.quota}
              </Typography>
            </div>
            <div>
              <NextImage
                useSkeleton
                width={130}
                height={130}
                src={getImageCompanyUrl(
                  vacancy?.logo as string,
                  vacancy?.no_ig as string
                )}
                alt='logo'
              ></NextImage>
            </div>
          </div>
          <Typography variant='h5' className='mt-6'>
            Deskripsi Pekerjaan
          </Typography>
          {vacancy?.vacancy_description && (
            <div>{parse(vacancy?.vacancy_description)}</div>
          )}
          <Typography variant='h5' className='mt-6'>
            Persyaratan
          </Typography>
          {vacancy?.vacancy_requirements && (
            <div>{parse(vacancy?.vacancy_requirements)}</div>
          )}
        </Modal.Section>
      </Modal>
    </>
  );
}
