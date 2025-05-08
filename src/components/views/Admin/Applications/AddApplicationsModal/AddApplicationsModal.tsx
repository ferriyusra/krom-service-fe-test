import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput, Select, SelectItem, Spinner } from "@heroui/react"
import useAddApplicationsModal from "./useAddApplicationsModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import InputFile from "@/components/ui/InputFile";
import {
  JOB_ROLES,
  LOCATIONS,
} from '@/constants/list.constants';

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetechApplicants: () => void;
}

const JOB_ROLE_OPTIONS = JOB_ROLES.map((role) => ({
  key: role,
  label: role,
}));

const LOCATION_OPTIONS = LOCATIONS.map((location) => ({
  key: location,
  label: location,
}))

const AddApplicationsModal = (props: PropTypes) => {

  const { isOpen, onClose, onOpenChange, refetechApplicants } = props;

  const {
    preview,
    control,
    errors,
    handleSubmitForm,
    handleAddApplications,
    isPendingMutateAddApplications,
    isSuccessMutateAddApplications,
    isPendingMutateUploadFile,
    handleUploadResume,
    handleDeleteResume,
    handleOnClose,
    isPendingMutateDeleteFile,
  } = useAddApplicationsModal();

  useEffect(() => {
    if (isSuccessMutateAddApplications) {
      onClose();
      refetechApplicants();
    }

  }, [isSuccessMutateAddApplications])

  const disbaledSubmit = isPendingMutateAddApplications || isPendingMutateUploadFile || isPendingMutateDeleteFile

  const normalizePhoneNumber = (input: string) => {
    return input
      .replace(/^(\+62|\+620|620)/, "0") // ganti +62 atau 620 di awal dengan 0
      .replace(/^\+/, ""); // buang sisa simbol + jika masih ada
  };

  return (
    <Modal
      size="4xl"
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form onSubmit={handleSubmitForm(handleAddApplications)}>
        <ModalContent className="m-4">
          <ModalHeader>Upload new candidate application</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold">Full Name</p>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Enter first & last name"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.fullName !== undefined}
                      errorMessage={errors.fullName?.message}
                      className="mb-2"
                    />
                  )}
                />
                <p className="text-sm font-bold">Email</p>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Enter email address"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.email !== undefined}
                      errorMessage={errors.email?.message}
                      className="mb-2"
                    />
                  )}
                />

                <p className="text-sm font-bold">Years of experience</p>
                <Controller
                  name="yearsOfExperience"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      value={field.value ?? 0}
                      onChange={(val) => field.onChange(Number(val))}
                      label="e.g 5"
                      variant="bordered"
                      isInvalid={errors.yearsOfExperience !== undefined}
                      errorMessage={errors.yearsOfExperience?.message}
                      className="mb-2"
                    />
                  )}
                />
              </div>

              <div>
                <p className="text-sm font-bold">Phone.No</p>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <Input
                      {...rest}
                      value={value}
                      label="Enter phone number including country prefix"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.phone !== undefined}
                      errorMessage={errors.phone?.message}
                      className="mb-2"
                      onChange={(e) => {
                        const normalized = normalizePhoneNumber(e.target.value);
                        onChange(normalized);
                      }}
                    />
                  )}
                />

                <p className="text-sm font-bold">Role</p>
                <Controller
                  name="jobRole"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      label="Choose Role Applicant"
                      variant="bordered"
                      isInvalid={errors.jobRole !== undefined}
                      errorMessage={errors.jobRole?.message}
                      onSelectionChange={(value) => onChange(value)}
                      className="mb-2"
                    >
                      {JOB_ROLE_OPTIONS.map((location) => (
                        <AutocompleteItem key={location.key}>{location.label}</AutocompleteItem>
                      ))}
                    </Autocomplete>
                  )}
                />

                <p className="text-sm font-bold">Location</p>
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      label="Enter the country"
                      variant="bordered"
                      isInvalid={errors.country !== undefined}
                      errorMessage={errors.country?.message}
                      onSelectionChange={(value) => onChange(value)}
                      className="mb-2"
                    >
                      {LOCATION_OPTIONS.map((country) => (
                        <AutocompleteItem key={country.key}>{country.label}</AutocompleteItem>
                      ))}
                    </Autocomplete>
                  )}
                />
              </div>
            </div>
            <p className="text-sm font-bold">Resume</p>
            <Controller
              name="resumeUrl"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onUpload={(files) => handleUploadResume(files, onChange)}
                  onDelete={() => handleDeleteResume(onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errors.resumeUrl !== undefined}
                  isDropable
                  errorMessage={errors.resumeUrl?.message}
                  preview={typeof preview === 'string' ? preview : ""}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disbaledSubmit}
            >Cancel</Button>
            <Button
              color="success"
              type="submit"
              disabled={disbaledSubmit}
              className="disabled:bg-default-600 bg-teal-600"
            >{
                isPendingMutateAddApplications ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <p className="text-white">Add</p>
                )
              }</Button>
          </ModalFooter>
        </ModalContent>
      </form >
    </Modal >
  )
}

export default AddApplicationsModal;