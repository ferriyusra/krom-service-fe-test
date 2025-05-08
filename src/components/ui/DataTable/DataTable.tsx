import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { IoCloudUpload } from "react-icons/io5";

interface PropTypes {

  topLeftContent?: ReactNode;
  topRightContent?: ReactNode;
  buttonTopContentLabel?: string;

  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;

  onClickButtonFilterTopContent?: () => void;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;

  showLimit?: boolean;
  showSearch?: boolean;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {

  const {
    currentPerPage,
    currentPage,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    showLimit = true,
    showSearch = true,
    totalPages,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 w-full">
        <div className="flex flex-wrap items-end gap-3 w-full lg:max-w-[70%]">
          {props.topLeftContent}
        </div>
        {showSearch && (
          <Input
            isClearable
            className="flex-1 min-w-[220px] max-w-md"
            placeholder="Search..."
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleSearch}
          />
        )}
        {props.topRightContent}
        <div className="flex gap-2 w-full sm:w-auto">
          {buttonTopContentLabel && (
            <Button
              color="success"
              onPress={onClickButtonTopContent}
              className=" bg-teal-600 border-white flex items-center gap-2"
            >
              <IoCloudUpload color="white" />
              <p className="text-white">{buttonTopContentLabel}</p>
            </Button>
          )}

        </div>

      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
    showSearch,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        {showLimit && (
          <Select
            disallowEmptySelection
            className="hidden max-w-36 lg:block"
            size="md"
            selectedKeys={[`${currentPerPage}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-small">Limit:</p>}
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="default"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [currentPerPage, currentPage, totalPages, handleChangeLimit, handleChangePage]);

  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading })
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="success" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
