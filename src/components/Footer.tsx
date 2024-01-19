import React, { FC } from "react";

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer fixed inset-x-0 bottom-0 footer-center p-4 bg-base-200 text-base-content">
      <aside>
        <p>What to put here? ʕ •ᴥ•ʔ | Created by Declan Fitzpatrick</p>
      </aside>
    </footer>
  );
};

export default Footer;
