import * as allJobs from 'public/data/jobs.json';
import * as detailJobs from 'public/data/detail_jobs.json';

export function getAllJobs() {
  return {
    status: 200,
    data: allJobs,
    message: 'Success get data',
  };
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
    return {
      status: 200,
      data: data,
      message: 'Success get data',
    };
  } catch (e) {
    alert(e);
    return {
      status: 500,
      data: data,
      // @ts-ignore
      message: e.toString(),
    };
  }
}
