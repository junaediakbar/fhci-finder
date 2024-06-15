import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import InfoPopover from '@/components/popover/InfoPopover';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';
interface CountScoreGradType {
  twk: number;
  tkd: number;
  tbi: number;
  akhlak: number;
  learning_agility: number;
  tbi_convert: number;
  learning_agility_convert: number;
}
interface CountScoreSMAType {
  twk_sma: number;
  tkd_sma: number;
  akhlak_sma: number;
  learning_agility_sma: number;
  learning_agility_sma_convert: number;
}
interface ResultScoreType {
  stage1: number;
  stage2: number;
  score: number;
}

export default function CountScore() {
  const methodsGrad = useForm<CountScoreGradType>({
    mode: 'onChange',
  });
  const methodsSMA = useForm<CountScoreSMAType>({
    mode: 'onChange',
  });

  const [resultScore, setResultScore] = React.useState<ResultScoreType>({
    stage1: 0,
    stage2: 0,
    score: 0,
  });

  const [resultScoreSMA, setResultScoreSMA] = React.useState<ResultScoreType>({
    stage1: 0,
    stage2: 0,
    score: 0,
  });

  const handleSubmitSMA = methodsSMA.handleSubmit;
  const handleSubmitGrad = methodsGrad.handleSubmit;
  const scoreLearningAgilityGrad = methodsGrad.watch('learning_agility');
  const scoreLearningAgilityGradSMA = methodsSMA.watch('learning_agility_sma');
  const scoreEnglishTestGrad = methodsGrad.watch('tbi');

  useEffect(() => {
    if (scoreLearningAgilityGrad != undefined && scoreLearningAgilityGrad > 0) {
      const score = Number((scoreLearningAgilityGrad / 3).toFixed(2));
      methodsGrad.setValue('learning_agility_convert', score);
    }
  }, [methodsGrad, scoreLearningAgilityGrad]);

  useEffect(() => {
    if (
      scoreLearningAgilityGradSMA != undefined &&
      scoreLearningAgilityGradSMA > 0
    ) {
      const score = Number((scoreLearningAgilityGradSMA / 3).toFixed(2));
      methodsSMA.setValue('learning_agility_sma_convert', score);
    }
  }, [methodsSMA, scoreLearningAgilityGradSMA]);

  useEffect(() => {
    if (scoreEnglishTestGrad != undefined && scoreEnglishTestGrad > 0) {
      if (scoreEnglishTestGrad > 675) {
        methodsGrad.setValue('tbi_convert', 100);
      } else {
        const score = Number(((scoreEnglishTestGrad * 100) / 675).toFixed(2));
        methodsGrad.setValue('tbi_convert', score);
      }
    }
  }, [methodsGrad, scoreEnglishTestGrad]);

  const onSubmit = async (data: CountScoreGradType) => {
    const { tkd, twk, akhlak, tbi_convert, learning_agility_convert } = data;
    const scoreStage1 = Number(
      (tkd * 40 + twk * 10 + akhlak * 50) / 100
    ).toFixed(2);

    const scoreStage2 = Number(
      (tbi_convert * 80 + learning_agility_convert * 20) / 100
    ).toFixed(2);
    const finalScore = Number(
      Number(scoreStage1) * 0.6 + Number(scoreStage2) * 0.4
    ).toFixed(2);

    setResultScore({
      stage1: Number(scoreStage1),
      stage2: Number(scoreStage2),
      score: Number(finalScore),
    });
  };

  const onSubmitSMA = async (data: CountScoreSMAType) => {
    const { tkd_sma, twk_sma, akhlak_sma, learning_agility_sma_convert } = data;
    const scoreStage1 = Number(tkd_sma).toFixed(2);

    const scoreStage2 = Number(
      (twk_sma * 10 + akhlak_sma * 60 + learning_agility_sma_convert * 30) / 100
    ).toFixed(2);
    const finalScore = Number(
      Number(scoreStage1) * 0.4 + Number(scoreStage2) * 0.6
    ).toFixed(2);

    setResultScoreSMA({
      stage1: Number(scoreStage1),
      stage2: Number(scoreStage2),
      score: Number(finalScore),
    });
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col py-12'>
            <div className='flex w-full flex-col justify-between space-y-8 md:flex-row md:space-x-10 md:space-y-0'>
              {/* {FORM D3 s.d S2} */}
              <FormProvider {...methodsGrad}>
                <form
                  onSubmit={handleSubmitGrad(onSubmit)}
                  className='w-full space-y-2.5'
                >
                  <Typography variant='h2' className='mb-6'>
                    Hitung Skor D3 s/d S2
                  </Typography>
                  <Input
                    type='number'
                    id='tkd'
                    label='Skor TKD (Tes Kemampuan Dasar)'
                    placeholder='0-100'
                    validation={{ required: 'Skor TKD must be filled' }}
                  />
                  <Input
                    type='number'
                    id='twk'
                    label='Skor TWK (Tes Wawasan Kebangsaan)'
                    placeholder='0-100'
                    validation={{ required: 'Skor TWK must be filled' }}
                  />
                  <Input
                    type='number'
                    id='akhlak'
                    label='Skor AKHLAK (Tes AKHLAK)'
                    placeholder='0-100'
                    validation={{ required: 'Skor AKHLAK must be filled' }}
                  />
                  <div className='flex w-full flex-row items-end justify-between space-x-3'>
                    <Input
                      containerClassName='w-full'
                      className='w-full'
                      type='number'
                      id='tbi'
                      label='Skor TBI (Tes Bahasa Inggris)'
                      placeholder='310-675'
                      validation={{ required: 'Skor TBI must be filled' }}
                    />
                    <Input
                      containerClassName='w-full'
                      disabled
                      withInfo={{
                        isShow: true,
                        children: (
                          <Typography className='p-2' variant='b3'>
                            Konversi bahasa inggris = Nilai bahasa inggris / 675
                            x 100
                          </Typography>
                        ),
                      }}
                      className='w-full'
                      type='number'
                      id='tbi_convert'
                      label='Konversi Skor TBI'
                      placeholder='0-100'
                      validation={{ required: 'Skor TBI must be filled' }}
                    />
                  </div>
                  <div className='flex w-full flex-row items-end justify-between space-x-3'>
                    <Input
                      containerClassName='w-full'
                      type='number'
                      id='learning_agility'
                      label='Skor Learning Agility'
                      placeholder='0-300'
                      validation={{
                        required: 'Skor Learning Agility must be filled',
                      }}
                    />
                    <Input
                      containerClassName='w-full'
                      withInfo={{
                        isShow: true,
                        children: (
                          <Typography className='p-2' variant='b3'>
                            Konversi Learning Agility = Nilai Learning Agility /
                            3
                          </Typography>
                        ),
                      }}
                      disabled
                      className='w-full'
                      type='number'
                      id='learning_agility_convert'
                      label='Konversi Skor LA'
                      placeholder='0-100'
                      validation={{
                        required: 'Skor Learning Agility must be filled',
                      }}
                    />
                  </div>

                  <Button type='submit' className='!mt-6 w-full'>
                    Hitung
                  </Button>

                  <div className='pt-4'>
                    <Typography variant='h2'>Hasil Perhitungan</Typography>
                    <div className='flex w-[260px] flex-row justify-between'>
                      <Typography>Skor Tahap I:</Typography>
                      <Typography>{resultScore.stage1}</Typography>
                    </div>
                    <div className='flex w-[260px] flex-row justify-between'>
                      <Typography>Skor Tahap II:</Typography>
                      <Typography>{resultScore.stage2}</Typography>
                    </div>
                    <div className='background-blue mt-2 flex h-4 w-full'>
                      <hr className='flex-grow'></hr>
                    </div>
                    <div className='flex w-[260px] flex-row justify-between'>
                      <div className='flex items-center justify-center'>
                        <Typography variant='h3'>Skor Akhir </Typography>
                        <InfoPopover
                          classNames={{
                            content: 'text-sm',
                          }}
                          children='Skor Akhir = (Skor Tahap I * 60 % + Skor Tahap II *40%)'
                        />
                      </div>
                      <Typography variant='h3'>{resultScore.score}</Typography>
                    </div>
                  </div>
                </form>
              </FormProvider>
              {/* {END FORM D3 s.d S2} */}
              {/* {FORM SMA} */}
              <FormProvider {...methodsSMA}>
                <form
                  onSubmit={handleSubmitSMA(onSubmitSMA)}
                  className='w-full space-y-2.5'
                >
                  <Typography variant='h2' className='mb-6'>
                    Hitung Skor SMA
                  </Typography>
                  <Input
                    type='number'
                    id='tkd_sma'
                    label='Skor TKD (Tes Kemampuan Dasar)'
                    placeholder='0-100'
                    validation={{ required: 'Skor TKD must be filled' }}
                  />
                  <Input
                    type='number'
                    id='twk_sma'
                    label='Skor TWK (Tes Wawasan Kebangsaan)'
                    placeholder='0-100'
                    validation={{ required: 'Skor TWK must be filled' }}
                  />
                  <Input
                    type='number'
                    id='akhlak_sma'
                    label='Skor AKHLAK (Tes AKHLAK)'
                    placeholder='0-100'
                    validation={{ required: 'Skor AKHLAK must be filled' }}
                  />
                  <div className='flex w-full flex-row items-center justify-between space-x-3'>
                    <Input
                      containerClassName='w-full'
                      type='number'
                      id='learning_agility_sma'
                      label='Skor Learning Agility'
                      placeholder='0-300'
                      validation={{
                        required: 'Skor Learning Agility must be filled',
                      }}
                    />
                    <Input
                      containerClassName='w-full'
                      withInfo={{
                        isShow: true,
                        children: (
                          <Typography className='p-2' variant='b3'>
                            Konversi Learning Agility = Nilai Learning Agility /
                            3
                          </Typography>
                        ),
                      }}
                      disabled
                      className='w-full'
                      type='number'
                      id='learning_agility_sma_convert'
                      label='Konversi Skor LA'
                      placeholder='0-100'
                      validation={{
                        required: 'Skor Learning Agility must be filled',
                      }}
                    />
                  </div>

                  <Button type='submit' className='!mt-6 w-full'>
                    Hitung
                  </Button>

                  <div className='pt-4'>
                    <Typography variant='h2'>Hasil Perhitungan</Typography>
                    <div className='flex w-[260px] flex-row justify-between'>
                      <Typography>Skor Tahap I:</Typography>
                      <Typography>{resultScoreSMA.stage1}</Typography>
                    </div>
                    <div className='flex w-[260px] flex-row justify-between'>
                      <Typography>Skor Tahap II:</Typography>
                      <Typography>{resultScoreSMA.stage2}</Typography>
                    </div>
                    <div className='background-blue mt-2 flex h-4 w-full'>
                      <hr className='flex-grow'></hr>
                    </div>
                    <div className='flex w-[260px] flex-row justify-between'>
                      <div className='flex items-center justify-center'>
                        <Typography variant='h3'>Skor Akhir </Typography>
                        <InfoPopover
                          classNames={{
                            content: 'text-sm',
                          }}
                          children='Skor Akhir = (Skor Tahap I * 40 % + Skor Tahap II *60%)'
                        />
                      </div>
                      <Typography variant='h3'>
                        {resultScoreSMA.score}
                      </Typography>
                    </div>
                  </div>
                </form>
              </FormProvider>
              {/* {END FORM SMA} */}
            </div>
            <div className='py-8'></div>
          </div>
        </section>

        <footer className=' mb-4 flex w-full justify-center text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink className='ml-1' href='https://junaediakbar.com'>
            Junaedi Akbar
          </UnderlineLink>
        </footer>
      </main>
    </Layout>
  );
}
