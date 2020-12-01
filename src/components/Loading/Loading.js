import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="col-12 d-flex-column mt-5">
      <div className="row justify-content-center">
        <Spinner animation="grow" />
        <Spinner animation="border" />
        <Spinner animation="grow" />
      </div>
      <div className="row justify-content-center mt-3">
        <p>Loading...</p>
      </div>
      <div className="row justify-content-center">
        <Spinner animation="grow" />
        <Spinner animation="border" />
        <Spinner animation="grow" />
      </div>
    </div>
  );
}

export default Loading;
