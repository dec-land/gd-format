import { Conversion } from "@/types/Conversion";
import { FC } from "react";

interface Props {
  conversion: Conversion;
  onChange: (conversion: Conversion) => void;
  disabled?: boolean;
}

export const ConversionSelect: FC<Props> = ({
  conversion,
  onChange,
  disabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Conversion);
  };

  return (
    <select
      className="select select-bordered h-[65px] w-[335px] select-secondary "
      value={conversion}
      disabled={disabled}
      onChange={handleChange}
    >
      <option value="gdscript-c#">GDScript to C#</option>
      <option value="c#-gdscript">C# to GDScript</option>
    </select>
  );
};
