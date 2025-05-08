import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { cn } from "@/utils/cn";

type Option = {
  value: string;
  label: string;
};

interface FilterSelectProps {
  placeholder: string;
  options: Option[];
  selected: string;
  onChange: (val: string) => void;
  className?: string;
}

const FilterSelect = ({
  placeholder,
  options,
  selected,
  onChange,
  className,
}: FilterSelectProps) => {
  return (
    <div className={cn("w-full", className)}>
      <Autocomplete
        labelPlacement="outside"
        items={options}
        selectedKey={selected || ""}
        placeholder={placeholder}
        onSelectionChange={(key) => {
          onChange(String(key || ""));
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.value} textValue={item.label}>
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default FilterSelect;
