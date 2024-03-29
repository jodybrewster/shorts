'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import ShortList from "./short-list";
export default function NewShort() {
  let inputRef = useRef(null);
  const [short, setShort] = useState(null);

    const shortenUrl = () => {
      const ref: any =inputRef?.current;
      const url = ref.value;
      
      
      fetch('http://localhost:3001/api/v1/create', {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Indicate that we're sending JSON data
        },
        body: JSON.stringify({
          url
        }), // Convert the JavaScript object to a JSON string
      })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
          console.log(data); // Handle the data from the response
          setShort(data)
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    }
  return (
    <>
    <div className="NewShort self-stretch justify-start items-start gap-2.5 inline-flex">
      {/** <div className="Input w-40 flex-col justify-start items-start gap-1.5 inline-flex">
    <div className="Shortcode text-slate-900 text-sm font-medium font-['Inter'] leading-tight">
        Shortcode
      </div>
      <Input placeholder="Shortcode" value={"FDFDSre3"} />
      <div className="EnterYourShortcode text-slate-500 text-sm font-normal font-['Inter'] leading-tight">
        Enter your shortcode
      </div>
    </div> */}
      <div className="Input grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
        <div className="Url text-slate-900 text-sm font-medium font-['Inter'] leading-tight">
          Url
        </div>
        <Input ref={inputRef}  placeholder="https://www.yourlongurl.com" />
        <div className="EnterYourUrl text-slate-500 text-sm font-normal font-['Inter'] leading-tight">
          Enter your url
        </div>
      </div>
      <div className="Frame1 self-stretch py-6 flex-col justify-start items-start inline-flex">
        <Button onClick={shortenUrl}>Shorten!</Button>
      </div>
    </div>
     <ShortList newShort={short} />
     </>
  );
}
