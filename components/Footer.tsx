import { FC} from "react";

export const Footer: FC = () => {

    const year = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-4 bg-neutral text-neutral-content">
        <p>Copyright © {year} - All right reserved. Created by Declan Fitzpatrick</p>
    </footer>
  );
};
