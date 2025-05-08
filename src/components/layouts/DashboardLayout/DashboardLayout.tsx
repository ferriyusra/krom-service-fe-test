import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "./DashboardLayout.constans";
import { Navbar, NavbarMenuToggle } from "@heroui/react";


interface PropTypes {
  children: ReactNode;
  title?: string;
  type: string;
  description?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = 'ADMIN' } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "ADMIN" ? SIDEBAR_ADMIN : SIDEBAR_USER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: 'p-0' }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close" : "Open"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />

          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </Fragment>
  )
}

export default DashboardLayout;
