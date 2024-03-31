"use client";
import React, {useContext} from 'react';
import { useForm, SubmitHandler, } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppContext } from '@/services/AppContext';

import { useRef, useState } from "react";
import ShortList from "@/components/modules/ShortList";
import { settings } from "@/constants";
import UrlInputMask from "@/components/modules/UrlInputMask";

const NewShort: React.FC = () => {
  let inputRef = useRef(null);
  const [short, setShort] = useState(null);
  const form = useForm<any>();
  const {addShort} = useContext(AppContext);


  const onSubmit = (event: any) => {
    // TODO: make this async
    //console.log('shortenUrl');
    const ref: any = inputRef?.current;
    const url = ref.value;

    addShort(url);
  };
  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="NewShort self-stretch justify-start items-start gap-2.5 inline-flex w-full">
          <div className="Input grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="Url text-slate-900 text-sm font-medium font-['Inter'] leading-tight">
              Url
            </div>
            <UrlInputMask
              ref={inputRef}
              placeholder="https://www.yourlongurl.com"
            />
            <div className="EnterYourUrl text-slate-500 text-sm font-normal font-['Inter'] leading-tight">
              Enter your url
            </div>
          </div>
          <div className="Frame1 self-stretch py-6 flex-col justify-start items-start inline-flex">
            <Button>Shorten!</Button>
          </div>
        </div>
      </form>
      <ShortList newShort={short} />
    </>
  );
};

export default NewShort;
