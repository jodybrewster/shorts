import React, { useState, forwardRef, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line react/display-name
const URLInputMask = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const [url, setUrl] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

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
    setUrl(value);
    setIsValid(urlPattern.test(value));
  };

  return (
    <Input
      type="text"
      ref={ref}
      value={url}
      onChange={handleChange}
      style={{
        borderColor: isValid ? "green" : "red",
        borderWidth: "2px",
      }}
      {...props}
    />
  );
});

export default URLInputMask;
