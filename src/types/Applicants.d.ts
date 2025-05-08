interface IApplicants {
	id: string;
	resumeUrl: string;
	jobRole: string;
	status: string;
	appliedAt: string | DateTime;
	updatedAt: string | DateTime;
	applicantFullName: string | DateTime;
	applicantEmail: string | DateTime;
	applicantPhone: number;
	applicantCountry: string;
	applicantYoE: number;
}

export { IApplicants };
