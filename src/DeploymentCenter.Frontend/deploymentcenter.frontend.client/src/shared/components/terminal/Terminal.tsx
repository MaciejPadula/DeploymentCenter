import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { saveFileWithDialog } from "../../helpers/file-saver";

type Props = {
  name: string;
  text: string;
};

export function Terminal(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [props.text]);

  function saveLogsToFile() {
    const blob = new Blob([props.text], { type: "text/plain;charset=utf-8" });
    saveFileWithDialog(blob, `${props.name}-logs.txt`);
  }

  return (
    <>
      <div className="w-full flex justify-end">
        <Button onClick={() => saveLogsToFile()}>Export logs</Button>
      </div>
      <div
        className="whitespace-pre-wrap bg-black text-white p-4 overflow-auto h-96 relative"
        ref={ref}
      >
        {props.text}
      </div>
    </>
  );
}
