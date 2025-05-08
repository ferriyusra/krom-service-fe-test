const LIMIT_LISTS = [
	{
		label: '10',
		value: 10,
	},
	{
		label: '15',
		value: 15,
	},
	{
		label: '50',
		value: 50,
	},
];

const PER_PAGE_DEFAULT = LIMIT_LISTS[0].value;

const PAGE_DEFAULT = 1;

const DELAY = 1000;

const STATUS_LABELS: Record<string, string> = {
	CANDIDATE_REJECTED: 'Candidate Rejected',
	OFFER_ACCEPTED: 'Offer Accepted',
	INTERVIEW_DONE: 'Interview Done',
	APPLIED: 'Applied',
	CONTACTED: 'Contacted',
	HIRED: 'Hired',
	OFFER_MADE: 'Offer Made',
	INTERVIEW_SCHEDULED: 'Interview Scheduled',
};

const STATUS_COLOR: Record<
	string,
	'primary' | 'success' | 'warning' | 'danger' | 'secondary'
> = {
	CANDIDATE_REJECTED: 'danger',
	OFFER_ACCEPTED: 'success',
	INTERVIEW_DONE: 'secondary',
	APPLIED: 'primary',
	CONTACTED: 'warning',
	HIRED: 'success',
	OFFER_MADE: 'primary',
	INTERVIEW_SCHEDULED: 'secondary',
};

const LOCATIONS = [
	'Jakarta',
	'Bandung',
	'Surabaya',
	'Bali',
	'Aceh',
	'Bogor',
	'Bekasi',
	'Tangerang',
];
const STATUS = ['APPLIED', 'INTERVIEWED', 'OFFERED', 'HIRED'];
const JOB_ROLES = [
	'System Architect',
	'Project Manager',
	'Product Designer',
	'QA Engineer',
	'Data Engineer',
	'Full Stack Developer',
	'Backend Developer',
	'UX Designer',
	'Frontend Developer',
	'Data Scientist',
	'Data Analyst',
	'Software Developer',
];

export {
	LIMIT_LISTS,
	PER_PAGE_DEFAULT,
	PAGE_DEFAULT,
	DELAY,
	STATUS_LABELS,
	STATUS_COLOR,
	LOCATIONS,
	STATUS,
	JOB_ROLES,
};
