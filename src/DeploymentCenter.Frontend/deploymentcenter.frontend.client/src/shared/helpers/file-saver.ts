export function saveFileWithDialog(
  blob: Blob,
  suggestedName: string = "name.txt"
) {
  const virtualAnchor = document.createElement("a");
  virtualAnchor.href = URL.createObjectURL(blob);
  virtualAnchor.download = suggestedName;
  virtualAnchor.click();
  URL.revokeObjectURL(virtualAnchor.href);
}