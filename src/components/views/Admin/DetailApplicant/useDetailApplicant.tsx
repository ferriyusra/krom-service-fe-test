import applicantsService from "@/services/applicants.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailApplicant = () => {
  const { query, isReady } = useRouter();

  const getOneApplicant = async () => {
    const { data } = await applicantsService.getOneApplicant(`${query.id}`);
    return data.data;
  };

  const { data: dataApplicant } = useQuery({
    queryKey: ["ApplicantById"],
    queryFn: getOneApplicant,
    enabled: isReady,
  });

  return {
    dataApplicant,
  };
};

export default useDetailApplicant;
