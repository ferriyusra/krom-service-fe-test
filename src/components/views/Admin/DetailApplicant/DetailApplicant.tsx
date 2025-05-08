// components/DetailApplicant.tsx
import { IApplicants } from "@/types/Applicants";
import InfoDrawer from "./InfoDrawer";

interface DetailApplicantProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dataApplicant: IApplicants;
}

const DetailApplicant = ({
  isOpen,
  onOpenChange,
  dataApplicant,
}: DetailApplicantProps) => {
  return (
    <InfoDrawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      dataApplicant={dataApplicant}
    />
  );
};

export default DetailApplicant;
