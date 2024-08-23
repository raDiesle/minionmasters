import css from "footer/footer.module.scss";
import React from "react";
import { toast } from "react-toastify";

export default function Footer() {
  return (
    <div className={css.FooterStyle}>
      <button
        className={css.SubheaderLinkStyle}
        onClick={() =>
          toast("Contact me in Discord: raDies_chen#4904 or amend6@gmail.com", {
            position: "bottom-right",
          })
        }
      >
        Ideas for new features or you want to contribute?
      </button>
    </div>
  );
}
