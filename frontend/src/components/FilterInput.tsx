import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Input } from "./ui/Input";

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

  useEffect(() => {
    const handler = debounce(() => {
      onChange(localValue);
    }, debounceDelay);

    handler();

    return () => {
      handler.cancel(); // Отменяем при размонтировании или новом вводе
    };
  }, [localValue, onChange, debounceDelay]);

  return (
    <Input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};
