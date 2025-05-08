import { FaFile } from "react-icons/fa6"

const SIDEBAR_USER = [
  {
    key: "",
    label: "",
    href: "",
    icon: <></>,
  },
]

const SIDEBAR_ADMIN = [
  {
    key: "applicants",
    label: "Applicants",
    href: "/admin/applicants",
    icon: <FaFile />
  },
]

export {
  SIDEBAR_ADMIN,
  SIDEBAR_USER
}