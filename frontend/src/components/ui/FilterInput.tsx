import React, { useEffect, useState, useMemo } from "react";
import { Input } from "antd";
import debounce from "lodash.debounce";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceDelay?: number;
};

export const FilterInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Поиск...",
  debounceDelay = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedChange = useMemo(
    () =>
      debounce((val: string) => {
        onChange(val);
      }, debounceDelay),
    [onChange, debounceDelay]
  );

  useEffect(() => {
    debouncedChange(localValue);
    return () => {
      debouncedChange.cancel();
    };
  }, [localValue, debouncedChange]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        allowClear
        style={{ width: "100%", }}
      />
    </div>
  );
};
