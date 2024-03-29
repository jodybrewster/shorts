"use client";

import { useEffect, useState } from "react";
import DeleteIcon from "../icons/delete";

export default function ShortList({newShort}: {newShort: string | null}) {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/shorts")
      .then((response) => {
        if (!response.ok) {
          // If the response is not 2xx, throw an error
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setShorts(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [newShort]);

  const shortList = shorts.map((short: any, i) => {
    return (
      <div key={i} className="Row self-stretch px-2.5 py-3.5 bg-slate-100 justify-start items-center gap-2.5 inline-flex">
        <div className="Frame7 grow shrink basis-0 h-6 justify-start items-center gap-2.5 flex">
          <div className="Gsha3xg text-slate-700 text-base font-medium font-['Inter'] leading-normal">
           <a href={`http://localhost:3001/a/${short.shortcode}`} className="underline">{short.shortcode}</a>
          </div>
          <div className="Visits w-16 text-slate-700 text-base font-normal font-['Inter'] leading-normal">
            {/** 15 visits */}
          </div>
          <div className="HttpsWwwLongurlCom grow shrink basis-0 text-slate-700 text-base font-normal font-['Inter'] leading-normal">
            {short.url}
          </div>
        </div>
        <div className="Buttons justify-start items-start gap-2.5 flex">
          <div className="OouiShare w-6 h-6 px-px pt-0.5 pb-1 justify-center items-center flex"><DeleteIcon /></div>
         {/**<div className="MdiEdit w-6 h-6 p-0.5 justify-center items-center flex" ><DeleteIcon /></div>
          <div className="TypcnDelete w-6 h-6 p-1 justify-center items-center flex" ><DeleteIcon /></div> */} 
        </div>
      </div>
    );
  });

  return (
    <div className="ShortRows self-stretch h-28 flex-col justify-start items-center gap-0.5 flex">
      {shortList}
    </div>
  );
}
