import React, { Children } from "react";
import Banner from "../Banner/Banner";

function WonBanner({ attempts }) {
  return (
    <Banner status="happy">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong>
          {" " + attempts} guess{attempts > 1 ? "es" : ""}
        </strong>
        .
      </p>
    </Banner>
  );
}

export default WonBanner;
