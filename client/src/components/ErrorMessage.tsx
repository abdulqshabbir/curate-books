import React from "react";

export const ErrorMessage = ({ errorMessage }: IProps) => {
  return (
    <div>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
};

interface IProps {
  errorMessage: string
}