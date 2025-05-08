import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
  hideButtonDelete?: boolean;
}

const DropdownAction = (props: PropTypes) => {

  const { onPressButtonDetail, onPressButtonDelete, hideButtonDelete = false } = props

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="detail-event-button"
          onPress={onPressButtonDetail}
        >
          Detail
        </DropdownItem>
        {hideButtonDelete ? (
          <DropdownItem
            key="delete-event"
            onPress={onPressButtonDelete}
            className="text-teal-500"
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownAction