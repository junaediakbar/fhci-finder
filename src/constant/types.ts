export declare type Vacancy = {
  vacancy_id: string;
  tenant_id: string | null;
  vacancy_name: string | null;
  tenant_name: string | null;
  vacancy_base_url: string | null;
  jenjang: string | null;
  stream_name: string | null;
  jurusan_name: string | null;
  jurusan_filter_type: string | null;
  total_job_available: string | null;
  check_certificate: string | null;
  major_group_non_sma: string | null;
  major_group_sma: string | null;
  allow_sma: string | null;
  highest_age_sma: string | null;
  lowest_ipk_sma: string | null;
  allow_d3: string | null;
  highest_age_d3: string | null;
  lowest_ipk_d3: string | null;
  allow_s1: string | null;
  highest_age_s1: string | null;
  lowest_ipk_s1: string | null;
  allow_s2: string | null;
  highest_age_s2: string | null;
  lowest_ipk_s2: string | null;
  vacancy_type: string | null;
  major_sma_custom: string | null;
  major_non_sma_custom: string | null;
};

export declare type VacancyDetail = {
  vacancy_id: string;
  tenant_name: string;
  no_ig: string | undefined;
  vacancy_name: string;
  vacancy_type: string;
  vacancy_requirements: string;
  vacancy_description: string;
  logo: string | undefined;
  list_province_text: null | string;
  quota: string;
  applied: null;
  job_function: string;
  major_education_filter_type: string;
  jenis_kelamin: string;
  kota_penempatan: null;
  employee_type_vac: string;
  check_certificate: string;
  list_certificate: null;
  major_group_non_sma: string;
  major_group_sma: string;
  allow_sma: string;
  highest_age_sma: null;
  lowest_ipk_sma: null;
  allow_d3: string;
  highest_age_d3: null;
  lowest_ipk_d3: null;
  allow_s1: string;
  highest_age_s1: string;
  lowest_ipk_s1: string;
  allow_s2: string;
  highest_age_s2: null;
  lowest_ipk_s2: null;
};

export declare type VacancyNew = {
  vacancy_id: string | null;
  title: string | null;
  company_name: string | null;
  total_quota: number | null;
  show_quota: number | null;
  stream_id: string | null;
  stream_name: string | null;
  employment_status: string | null;
  selected_job: boolean | null;
  is_saved: boolean | null;
  experience_level: string | null;
};

export interface VacancyDetailNew {
  vacancy_id: string;
  title: string;
  description: string;
  requirement: string;
  publication_type: string;
  company_name: string;
  total_quota: number;
  total_applied: number;
  show_quota: number;
  placement_region_name: string;
  stream_name: string;
  industry_name: string;
  list_benefit: string;
  start_date: string;
  end_date: string;
  employment_status: string;
  company_logo: string;
  private_type: string;
  experience_level_name: string;
  experience_level_id: string;
  selected_job: boolean;
  is_saved: boolean;
  qualifications: Qualifications;
}

export interface Qualifications {
  salary: Salary;
  certification: Certification[];
  skill: string[];
  major: Major;
  education_level: EducationLevel[];
  score: Score;
  age: Age;
  gender: string;
  experience_level: string;
  min_experience: number;
}

export interface Salary {
  salary_min: string;
  salary_max: number;
}

export interface Certification {
  certification_name: string;
  score_min: string;
}

export interface Major {
  major_type: string;
  major_category: string;
  list_major: string[];
}

export interface EducationLevel {
  education_level: string;
  age_min: number;
  age_max: string;
  score_min: string;
}

export interface Score {
  score_min: number | string;
}

export interface Age {
  age_min: number | string;
  age_max: number | string;
}
