import detailJobs from 'public/data/detail_jobs.json';
import allJobs from 'public/data/jobs.json';

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
