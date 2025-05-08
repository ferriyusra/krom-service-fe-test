import useChangeUrl from '@/hooks/useChangeUrl';
import applicantsService from '@/services/applicants.service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useApplicants = () => {
	const [selectedId, setSelectedId] = useState<string>('');
	const router = useRouter();
	const {
		currentPerPage,
		currentPage,
		currentSearch,
		currentCountry,
		currentJobRole,
		currentStatus,
	} = useChangeUrl();

	const getApplicants = async () => {
		let params = `page=${currentPage}&perPage=${currentPerPage}`;

		if (currentSearch) {
			params += `&fullName[like]=${currentSearch}`;
		}

		if (currentCountry) {
			params += `&country=${currentCountry}`;
		}

		if (currentJobRole) {
			params += `&jobRole=${currentJobRole}`;
		}

		if (currentStatus) {
			params += `&status=${currentStatus}`;
		}

		const res = await applicantsService.getApplicants(params);

		const { data } = res;

		return data;
	};

	const {
		data: dataApplicants,
		isLoading: isLoadingApplicants,
		isRefetching: isRefetchingApplicants,
		refetch: refetchApplicants,
	} = useQuery({
		queryKey: [
			'Applicants',
			currentPage,
			currentPerPage,
			currentSearch,
			currentCountry,
			currentJobRole,
			currentStatus,
		],
		queryFn: () => getApplicants(),
		enabled: router.isReady && !!currentPage && !!currentPerPage,
	});

	return {
		dataApplicants,
		isRefetchingApplicants,
		isLoadingApplicants,
		refetchApplicants,
		selectedId,
		setSelectedId,
	};
};

export default useApplicants;
