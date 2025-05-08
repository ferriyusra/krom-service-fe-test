import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@heroui/react";
import Link from "next/link";
import { IApplicants } from "@/types/Applicants";
import { STATUS_COLOR, STATUS_LABELS } from "@/constants/list.constants";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dataApplicant: IApplicants;
}

const InfoDrawer = ({
  isOpen,
  onOpenChange,
  dataApplicant,
}: PropTypes) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onOpenChange={onOpenChange}>
      <DrawerContent
        className=" h-screen flex flex-col
          w-full
          sm:max-w-sm
          md:max-w-md
          lg:max-w-lg
          xl:max-w-xl
          p-0 bg-white">
        <DrawerHeader className="px-4 py-2 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold">Applicant Details</h3>
        </DrawerHeader>
        <DrawerBody className="p-4 flex-1 overflow-auto min-h-0">
          <Card className="w-full h-full flex flex-col p-4">
            <div>
              <CardHeader className="flex flex-col items-center space-y-2 flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src="/images/general/user-default.jpg"
                    alt="Foto Pelamar"
                    width={80}
                    height={80}
                    objectFit="cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{dataApplicant.applicantFullName}</h2>
                <p className="text-sm text-default-400">{dataApplicant.jobRole}</p>
              </CardHeader>

              <CardBody className="mt-4">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="font-medium">Name:</dt>
                  <dd className="capitalize">{dataApplicant.applicantFullName}</dd>

                  <dt className="font-medium">Email:</dt>
                  <dd>
                    <Link
                      href={`mailto:${dataApplicant.applicantEmail}`}
                      className="text-blue-600 underline"
                    >
                      {dataApplicant.applicantEmail}
                    </Link>
                  </dd>

                  <dt className="font-medium">Phone No:</dt>
                  <dd>{dataApplicant.applicantPhone}</dd>

                  <dt className="font-medium">Years of Exp:</dt>
                  <dd>{dataApplicant.applicantYoE}</dd>

                  <dt className="font-medium">Role Applied For:</dt>
                  <dd className="capitalize">{dataApplicant.jobRole}</dd>

                  <dt className="font-medium">Location:</dt>
                  <dd>{dataApplicant.applicantCountry}</dd>

                  <dt className="font-medium">Resume:</dt>
                  <dd>
                    <Link
                      href={dataApplicant.resumeUrl}
                      className="text-blue-600 underline"
                    >
                      Resume
                    </Link>
                  </dd>

                  <dt className="font-medium">Status:</dt>
                  <dd>
                    <Chip
                      color={STATUS_COLOR[dataApplicant.status] ?? "secondary"}
                      radius="sm"
                      size="sm"
                      variant="flat"
                    >
                      {STATUS_LABELS[dataApplicant.status] ?? dataApplicant.status}
                    </Chip>
                  </dd>
                </dl>
              </CardBody>
              <CardFooter className="flex gap-2 pt-4">
                <Button variant="solid" color="success" className="flex-1 bg-teal-600">
                  <p className="text-white">Schedule Interview</p>
                </Button>
                <Button className="flex-1">
                  <p className="text-black">Review</p>
                </Button>
              </CardFooter>
            </div>
          </Card>
        </DrawerBody>


      </DrawerContent>
    </Drawer>
  );
};

export default InfoDrawer;
