import { Version } from "@/types/Conversion";
import { FC } from "react";

interface Props {
  version: Version;
  onChange: (version: Version) => void;
  disabled?: boolean;
}

export const VersionSelect: FC<Props> = ({ version, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Version);
  };

  return (
    <select
      className="select select-bordered h-[65px] select-primary"
      value={version}
      disabled={disabled}
      onChange={handleChange}
    >
      <option value={4}>Godot Engine 4</option>
      <option value={3}>Godot Engine 3</option>
    </select>
  );
};
