"use client";

import { useEffect, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import ClipboardIcon from "../icons/ClipboardIcon";
import EditIcon from "../icons/EditIcon";
import { settings } from "../../constants";

/**
 * Gets a collection of shorts on startup
 *
 * @returns collection of shorts
 */
const getShorts = async () => {
  try {
    const url = `${settings.API_URL}/api/v1/shorts`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error("Network response was not ok");
  }
};

export default function ShortList({ newShort }: { newShort: string | null }) {
  const [shorts, setShorts] = useState([]);

  /**
   * Deletes a single shortcode
   * @param shortCode string
   * @returns bool
   */
  const deleteShort = async (shortCode: string) => {
    try {
      const url = `${settings.API_URL}/api/v1/shorts/${shortCode}`;
      console.log(url);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Indicates the content
        },
      });

      const ok = response.status === 204;
      if (ok) {
        const s = shorts.filter((short: any) => short.shortcode !== shortCode);
        setShorts(s);
      }

      return ok;
    } catch (err) {
      throw new Error("Network response was not ok");
    }
  };

  const copyTextToClipboard = (text: string): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Url copied to clipboard successfully!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    getShorts().then((data) => {
      setShorts(data);
    });
  }, [newShort]);

  const shortList = shorts.map((short: any, i) => {
    return (
      <div
        key={i}
        className="Row self-stretch px-2.5 py-3.5 bg-slate-100 justify-start items-center gap-2.5 inline-flex"
      >
        <div className="Frame7 grow shrink basis-0 h-6 justify-start items-center gap-2.5 flex">
          <div className="Gsha3xg text-slate-700 text-base font-medium font-['Inter'] leading-normal">
            <a
              href={`http://localhost:3000/a/${short.shortcode}`}
              className="underline"
            >
              {short.shortcode}
            </a>
          </div>
          <div className="Visits w-16 text-slate-700 text-base font-normal font-['Inter'] leading-normal">
            {/** 15 visits */}
          </div>
          <div className="HttpsWwwLongurlCom grow shrink basis-0 text-slate-700 text-base font-normal font-['Inter'] leading-normal">
            {short.url}
          </div>
        </div>
        <div className="Buttons justify-start items-start gap-2.5 flex">
          <div className="OouiShare w-6 h-6 px-px pt-0.5 pb-1 justify-center items-center flex">
            <ClipboardIcon
              onClick={() => {
                copyTextToClipboard(`${settings.API_URL}/a/${short.shortcode}`);
              }}
            />
          </div>
          <div className="MdiEdit w-6 h-6 p-0.5 justify-center items-center flex">
            <EditIcon />
          </div>
          <div className="TypcnDelete w-6 h-6 p-1 justify-center items-center flex">
            <DeleteIcon
              onClick={() => {
                deleteShort(short.shortcode);
              }}
            />
          </div>
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
