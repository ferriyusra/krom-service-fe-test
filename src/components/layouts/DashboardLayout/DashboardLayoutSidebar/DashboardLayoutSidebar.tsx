import { useRouter } from 'next/router';
import { cn } from '@/utils/cn';

import Image from 'next/image';
import Link from 'next/link';
import { CiLogout, CiCircleQuestion, CiGrid41 } from 'react-icons/ci';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  User,
} from '@heroui/react';
import useLayoutSidebar from './useLayoutSidebar';
import { signOut } from 'next-auth/react';

type SidebarItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

type PropTypes = {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
};

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }: PropTypes) => {
  const router = useRouter();
  const { dataProfile } = useLayoutSidebar();

  const fullName = dataProfile?.fullName || "-";
  const email = dataProfile?.email || "-";
  const firstInitial = fullName.split(" ")[0]?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen }
      )}
    >
      <div>
        <div className="flex justify-center w-full">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={100}
            height={60}
            className="mb-6 w-32"
            onClick={() => router.push("/")}
          />
        </div>

        <Listbox items={sidebarItems} variant="solid" aria-label="Dashboard Menu">
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-teal-500 text-white": router.pathname.startsWith(item.href),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-default-100 px-3 py-2">
          <Avatar name={firstInitial} />
          <div className="flex flex-col">
            <p className="text-sm font-medium">{fullName}</p>
            <p className="text-xs text-default-500">{email}</p>
          </div>
        </div>

        <Button
          fullWidth
          variant="light"
          className="flex items-center justify-start gap-2 rounded-lg px-2 py-2 hover:bg-white hover:text-black text-default-700"
          size="lg"
          onPress={() => signOut()}
        >
          <CiLogout className="text-lg" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
