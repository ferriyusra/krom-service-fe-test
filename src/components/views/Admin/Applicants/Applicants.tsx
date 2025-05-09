import DataTable from '@/components/ui/DataTable';
import { useRouter } from 'next/router';
import { Key, ReactNode, useCallback, useEffect, useState } from 'react';
import useApplicants from './useApplicants';
import useChangeUrl from '@/hooks/useChangeUrl';
import DropdownAction from '@/components/commons/DropdownAction';
import DetailApplicant from '../DetailApplicant';
import { useDisclosure } from '@heroui/react';
import { COLUMN_LISTS_APPLICANTS } from './Applicants.constants';
import {
  JOB_ROLES,
  LOCATIONS,
  STATUS,
  STATUS_COLOR,
  STATUS_LABELS,
} from '@/constants/list.constants';
import { Chip } from '@heroui/react';
import FilterSelect from '@/components/commons/FilterSelect';
import AddApplicationsModal from '../Applications/AddApplicationsModal';

type Option = { value: string; label: string };
const toOptionList = (list: string[], defaultLabel: string): Option[] => [
  { value: "", label: defaultLabel },
  ...list.map((item) => ({ value: item, label: item })),
];

const locationOptions = toOptionList(LOCATIONS, 'Default');
const statusOptions = toOptionList(STATUS, 'Default');
const jobRoleOptions = toOptionList(JOB_ROLES, 'Default');

const Applicants = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataApplicants,
    isLoadingApplicants,
    refetchApplicants,
    isRefetchingApplicants,
  } = useApplicants();

  const {
    setUrl,
    currentCountry,
    currentStatus,
    currentJobRole,
    handleChangeLocation,
    handleChangeStatus,
    handleChangeJobRole,
  } = useChangeUrl();

  const add = useDisclosure();
  const drawer = useDisclosure();

  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  useEffect(() => {
    if (!isReady) return;
    setUrl();
    refetchApplicants();
  }, [isReady, currentCountry, currentStatus, currentJobRole]);

  const renderCell = useCallback(
    (applicants: Record<string, unknown>, columnKey: Key) => {
      const cellValue = applicants[columnKey as keyof typeof applicants];

      switch (columnKey) {
        case 'applicantFullName':
          return <span className='capitalize'>{String(cellValue)}</span>;

        case 'status': {
          const key = String(cellValue);
          const label = STATUS_LABELS[key] ?? key;
          const color = STATUS_COLOR[key] ?? 'secondary';
          return (
            <Chip color={color} size='sm' variant='flat'>
              {label}
            </Chip>
          );
        }

        case 'actions':
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                setSelectedApplicant(applicants);
                drawer.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push]
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingApplicants || isRefetchingApplicants}
          columns={COLUMN_LISTS_APPLICANTS}
          onClickButtonTopContent={add.onOpen}
          buttonTopContentLabel="Add Aplication"
          emptyContent='Applicants is empty'
          renderCell={renderCell}
          totalPages={Math.ceil(
            dataApplicants?.pagination.total /
            dataApplicants?.pagination.perPage
          )}
          data={dataApplicants?.data || []}
          topLeftContent={
            <div className="flex flex-wrap items-end gap-3">
              <FilterSelect
                className="w-[180px]"
                placeholder="Location"
                options={locationOptions}
                selected={String(currentCountry || "")}
                onChange={handleChangeLocation}
              />
              <FilterSelect
                className="w-[180px]"
                placeholder="Status"
                options={statusOptions}
                selected={String(currentStatus || "")}
                onChange={handleChangeStatus}
              />
              <FilterSelect
                className="w-[180px]"
                placeholder="Job Role"
                options={jobRoleOptions}
                selected={String(currentJobRole || "")}
                onChange={handleChangeJobRole}
              />
            </div>
          }
        />
      )}
      <AddApplicationsModal
        refetechApplicants={refetchApplicants}
        {...add}
      />

      {selectedApplicant && (
        <DetailApplicant
          isOpen={drawer.isOpen}
          onOpenChange={drawer.onOpenChange}
          dataApplicant={selectedApplicant}
        />
      )}
    </section>
  );
};

export default Applicants;
