import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { saveFileWithDialog } from "../../helpers/file-saver";

export function Terminal(props: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [props.text]);

  async function saveLogsToFile() {
    const blob = new Blob([props.text], { type: "text/plain;charset=utf-8" });
    saveFileWithDialog(blob, "logs.txt");
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
