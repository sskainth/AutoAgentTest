export type LoginRole = 'jobseeker' | 'recruiter' | 'freelancer';

export interface JobseekerLoginProfile {
  role: 'jobseeker';
  email: string;
  password: string;
  jobseekerloginUrl: string;
}

export interface RecruiterLoginProfile {
  role: 'recruiter';
  email: string;
  password: string;
  recruiterloginUrl: string;
}

export interface FreelancerLoginProfile {
  role: 'freelancer';
  email: string;
  password: string;
  freelancerloginUrl: string;
}

export type LoginProfile = JobseekerLoginProfile | RecruiterLoginProfile | FreelancerLoginProfile;

export const loginProfiles: Record<LoginRole, LoginProfile> = {
  jobseeker: {
    role: 'jobseeker',
    email: process.env.JOBSEEKER_EMAIL ?? 'ssktestmail@zohomzil.eu',
    password: process.env.JOBSEEKER_PASSWORD ?? 'Plmokn@1234',
    jobseekerloginUrl: 'https://jobs.gaddr.com/job-seeker',
  },
  recruiter: {
    role: 'recruiter',
    email: process.env.RECRUITER_EMAIL ?? 'shalutheone11@gmail.com',
    password: process.env.RECRUITER_PASSWORD ?? 'Plmokn@1234',
    recruiterloginUrl: 'https://jobs.gaddr.com/recruiter',
  },
  freelancer: {
    role: 'freelancer',
    email: process.env.FREELANCER_EMAIL ?? 'srivastavashikta@gmail.com',
    password: process.env.FREELANCER_PASSWORD ?? 'Plmokn@1234',
    freelancerloginUrl: 'https://jobs.gaddr.com/freelancer',
  },
};
