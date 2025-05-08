import { DELAY, PER_PAGE_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent } from "react";

const useChangeUrl = () => {

  const router = useRouter();
  const debounce = useDebounce();
  const currentPerPage = router.query.perPage;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCountry = router.query.country;
  const currentJobRole = router.query.jobRole;
  const currentStatus = router.query.status;

  const setUrl = () => {
    router.replace({
      query: {
        page: currentPage || PAGE_DEFAULT,
        perPage: currentPerPage || PER_PAGE_DEFAULT,
        search: currentSearch || "",
        ...(currentStatus ? { status: currentStatus } : {}),
        ...(currentJobRole ? { jobRole: currentJobRole } : {}),
        ...(currentCountry ? { country: currentCountry } : {}),
      },
    });
  }

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        page: PAGE_DEFAULT,
        perPage: selectedLimit,
      },
    });
  };

  const handleChangeLocation = (country: string) => {
    router.push({
      query: {
        ...router.query,
        country,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeStatus = (status: string) => {
    router.push({
      query: {
        ...router.query,
        status,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeJobRole = (jobRole: string) => {
    router.push({
      query: {
        ...router.query,
        jobRole,
        page: PAGE_DEFAULT,
      },
    });
  };


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };


  return {
    currentPerPage,
    currentPage,
    currentSearch,
    currentJobRole,
    currentCountry,
    currentStatus,
    setUrl,
    handleChangeLocation,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeJobRole,
    handleChangeStatus,
  };

}

export default useChangeUrl;