import detailJobs from 'public/data/detail_jobs.json';
import detailJobs2025 from 'public/data/detail_jobs_2025.json';
import allJobs2024 from 'public/data/jobs.json';
import allJobs from 'public/data/jobs_2025.json';

import { VacancyDetailNew } from '@/constant/types';

export async function getAllJobs2024() {
  return await Promise.resolve({
    status: 200,
    data: allJobs2024,
    message: 'Success get data',
  });
}

export async function getAllJobs() {
  return await Promise.resolve({
    status: 200,
    data: allJobs,
    message: 'Success get data',
  });
}

export async function getJobDetailById(id: string) {
  let data = null;
  try {
    data = detailJobs.find((item) => item.vacancy_id === id);
    if (data === undefined || data === null) {
      return {
        status: 500,
        data: null,
        message: 'Vacancy not found',
      };
    }
    return Promise.resolve({
      status: 200,
      data: data,
      message: 'Success get data',
    });
  } catch (e) {
    return Promise.resolve({
      status: 500,
      data: data,
      message: "Can't get data",
    });
  }
}

export async function getJobDetailById2025(id: string) {
  let data = null;
  try {
    data = (detailJobs2025 as VacancyDetailNew[]).find(
      (item) => item.vacancy_id === id
    );
    if (data === undefined || data === null) {
      return {
        status: 500,
        data: null,
        message: 'Vacancy not found',
      };
    }
    return Promise.resolve({
      status: 200,
      data: data,
      message: 'Success get data',
    });
  } catch (e) {
    return Promise.resolve({
      status: 500,
      data: data,
      message: "Can't get data",
    });
  }
}
