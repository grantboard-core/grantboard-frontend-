import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface Milestone {
  description: string;
  amount: number;
}

export interface Grant {
  id: string;
  title: string;
  description: string;
  poster: string;
  reviewer: string;
  token: string;
  totalAmount: number;
  milestones: Milestone[];
  applicants: string[];
  selectedApplicant: string | null;
  currentMilestone: number;
  createdAt: string;
}

export const getGrants = () => api.get<Grant[]>('/grants').then(r => r.data);
export const getGrant = (id: string) => api.get<Grant>(`/grants/${id}`).then(r => r.data);
export const createGrant = (data: Omit<Grant, 'id' | 'applicants' | 'selectedApplicant' | 'currentMilestone' | 'createdAt'>) =>
  api.post<Grant>('/grants', data).then(r => r.data);
export const applyToGrant = (id: string, applicant: string) =>
  api.post<Grant>(`/grants/${id}/apply`, { applicant }).then(r => r.data);
export const selectApplicant = (id: string, applicant: string) =>
  api.post<Grant>(`/grants/${id}/select`, { applicant }).then(r => r.data);
export const approveMilestone = (id: string) =>
  api.post<Grant>(`/grants/${id}/approve-milestone`).then(r => r.data);