import React, { useState, forwardRef, ChangeEvent, RefObject } from "react";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line react/display-name
const URLInputMask = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [url, setUrl] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // A simple regex for URL validation; you might need a more complex one depending on your requirements
  const urlPattern = new RegExp(
    "^https?:\\/\\/" + // protocol (http:// or https://)
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value && value.length > 0) {
      const valid = urlPattern.test(value);
      setIsValid(valid);
      setErrorMessage(valid ? "" : "Please use a valid URL");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
    setUrl(value);
  };

  return (
    <>
      <Input
        type="text"
        ref={ref}
        value={url}
        onChange={handleChange}
        style={{
          borderColor: getBorderColor(isValid, url.length),
          borderWidth: "2px",
        }}
        {...props}
      />
      {errorMessage && (
        <div id="errorMessageUrl" className="text-red-500">
          {errorMessage}
        </div>
      )}
    </>
  );
});

const getBorderColor = (isValid: boolean, urlLength: number): string => {
  if (urlLength > 1) {
    return isValid ? "green" : "red";
  } else {
    return "#ccc";
  }
};

export default URLInputMask;
