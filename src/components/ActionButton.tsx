import { FC } from "react";

interface Props {
  onClick: () => void;
  loading: boolean;
  text: string;
}

const ActionButton: FC<Props> = ({ onClick, loading, text }) => {
  return (
    <button
      className="btn w-[150px] btn-primary font-bold btn-lg"
      onClick={onClick}
    >
      {loading ? <span className="loading loading-spinner"></span> : text}
    </button>
  );
};

export default ActionButton;
