import React, { FC } from "react";

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content">
      <aside>
        <p>
          Copyright © {currentYear} - All right reserved | Created by Declan
          Fitzpatrick
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
