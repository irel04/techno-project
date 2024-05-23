import React from "react";

function NoData({ img, title }) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <img
        src={img}
        className="max-h-[10rem]"
      />
      <h1 className="">{title}</h1>
    </div>
  );
}

export default NoData;
