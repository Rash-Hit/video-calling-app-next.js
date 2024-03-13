import React from "react";

type Props = {};

const ErrorPage = (props: Props) => {
  return (
    <div className="space-y-3 text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>Sorry Something went wrong, Please try again </p>
    </div>
  );
};

export default ErrorPage;
