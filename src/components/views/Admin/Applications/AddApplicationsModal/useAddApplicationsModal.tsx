import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import applicationsService from "@/services/applications.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  yearsOfExperience: yup
    .number(),
  phone: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 10 digits.")
    .max(13, "Phone number must be at most 13 digits.")
    .matches(/^0\d{9,12}$/, "Phone number must start with 0 and contain only digits."),
  jobRole: yup
    .string()
    .required("Job Role is required."),
  country: yup
    .string()
    .required("Country is required."),
  resumeUrl: yup
    .string()
    .required("Resume file is required."),
});

const useAddApplicationsModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("resumeUrl");
  const fileUrl = getValues("resumeUrl");

  const handleUploadResume = (
    files: FileList,
    _onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, _onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("resumeUrl", fileUrl);
      }
    });
  };

  const handleDeleteResume = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addApplications = async (payload: any) => {
    const res = await applicationsService.addApplications(payload);
    return res;
  };

  const {
    mutate: mutateAddApplications,
    isPending: isPendingMutateAddApplications,
    isSuccess: isSuccessMutateAddApplications,
  } = useMutation({
    mutationFn: addApplications,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add applications!",
      });
      reset();
    },
  });

  const handleAddApplications = (data: any) => {
    mutateAddApplications(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddApplications,
    isPendingMutateAddApplications,
    isSuccessMutateAddApplications,

    preview,
    handleOnClose,
    handleUploadResume,
    handleDeleteResume,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

  };
};

export default useAddApplicationsModal;
