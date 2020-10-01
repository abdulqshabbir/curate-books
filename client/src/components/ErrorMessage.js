import React from "react";

export const ErrorMessage = ({ errorMesage }) => {
  return (
    <div>
      <p style={{ color: "red" }}>{errorMesage}</p>
    </div>
  );
};
