import { useState } from 'react';

import Modal from '@/components/modals/Modal';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import { VacancyDetailNew } from '@/constant/types';
import { getJobDetailById2025 } from '@/pages/api/jobsApi';

type ModalReturnType = {
  openModal: (id: string) => void;
};

import { MapPinIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

import Tag from '@/components/tag/Tag';

const HtmlParser = ({ htmlString }: { htmlString: string }) => {
  // Function to decode HTML entities
  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Decode the HTML string
  const decodedHtml = decodeHtml(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />;
};

function DetailModalNew({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [detailJob, setDetailJob] = useState<VacancyDetailNew | null>(null);

  const modalReturn: ModalReturnType = {
    openModal: async (id) => {
      setOpen(true);
      const res = await getJobDetailById2025(id);

      if (res.data === undefined || res.data === null) {
        return;
      }
      setDetailJob(res?.data as unknown as VacancyDetailNew);
    },
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={detailJob?.title}>
        <Modal.Section className='mb-6'>
          <div className='flex flex-row justify-between'>
            <div>
              <Typography variant='h4'>{detailJob?.company_name}</Typography>
              <Typography variant='b2'>
                {detailJob?.stream_name} - Kuota: {detailJob?.total_quota}
              </Typography>
            </div>
            <div>
              <NextImage
                useSkeleton
                width={130}
                height={130}
                src={detailJob?.company_logo || ''}
                alt='logo'
              ></NextImage>
            </div>
          </div>
          <Typography variant='h5' className='mt-6'>
            Min. Pendidikan
          </Typography>
          <div>
            {detailJob?.qualifications.education_level.map((edu) => (
              <div key={edu.education_level}>
                <Typography variant='b2'>
                  {edu.education_level} - IPK = {edu.score_min}
                </Typography>
                <Typography variant='b2'>
                  Maks. Usia = {edu.age_min + ' Tahun'}
                </Typography>
              </div>
            ))}
          </div>
          <Typography variant='h5' className='mt-6'>
            Deskripsi Pekerjaan
          </Typography>
          <HtmlParser htmlString={detailJob?.description || ''} />
          <Typography variant='h5' className='mt-6'>
            Persyaratan
          </Typography>
          <HtmlParser htmlString={detailJob?.requirement || ''} />

          {detailJob?.placement_region_name &&
            detailJob?.placement_region_name.length != null && (
              <div className=''>
                <Typography variant='h5' className='mb-2 mt-6'>
                  Provinsi Penempatan
                </Typography>
                {JSON.parse(detailJob?.placement_region_name).map(
                  (province: string) => (
                    <Tag
                      key={province}
                      color='primary'
                      className='mb-2 mr-2'
                      leftIcon={MapPinIcon}
                    >
                      {province}
                    </Tag>
                  )
                )}
              </div>
            )}
        </Modal.Section>
      </Modal>
    </>
  );
}

export default dynamic(() => Promise.resolve(DetailModalNew), {
  ssr: false,
});
