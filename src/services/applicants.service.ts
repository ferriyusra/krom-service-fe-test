import instance from '@/libs/axios/instance';
import endpoint from './endpoint.constant';

const applicantsService = {
	getApplicants: (params?: string) =>
		instance.get(`${endpoint.APPLICANTS}?${params}`),
	getOneApplicant: (id?: string) =>
		instance.get(`${endpoint.APPLICANTS}/${id}`),
};

export default applicantsService;
