export function Terminal(props: { text: string }) {
  return (
    <div className="whitespace-pre-wrap bg-black text-white p-4 overflow-auto">
      {props.text}
    </div>
  );
}
