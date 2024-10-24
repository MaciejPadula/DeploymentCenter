export async function saveFileWithDialog(
  blob: Blob,
  suggestedName: string = "name.txt"
) {
  const handle = await showSaveFilePicker({
    suggestedName: suggestedName,
    types: [
      {
        description: "Text file",
        accept: { "text/plain": [".txt"] },
      },
    ],
  });
  const writableStream = await handle.createWritable();
  await writableStream.write(blob);
  await writableStream.close();
}
