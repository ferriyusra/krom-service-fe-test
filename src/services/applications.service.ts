import instance from '@/libs/axios/instance';
import endpoint from './endpoint.constant';

const applicationsService = {
	addApplications: (payload: any) =>
		instance.post(`${endpoint.APPLICATIONS}`, payload),
};

export default applicationsService;
