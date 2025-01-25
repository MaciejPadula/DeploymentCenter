import { SearchSectionHeader } from "./SearchSectionHeader";

interface SearchIconListItemDefinition {
  text: string;
  image: string;
  onClick?: () => void;
}

type Props = {
  header?: string;
  items: SearchIconListItemDefinition[];
}

export function SearchIconsList(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      {props.header && <SearchSectionHeader header={props.header} />}
      <div className="grid grid-cols-4 gap-4">
        {
          props.items.map(definition => (
            <div key={definition.text} className="flex flex-col items-center cursor-pointer" onClick={() => definition.onClick?.()}>
              <img className="w-12 aspect-square" src={definition.image} />
              <div className="text-sm mt-2">{definition.text}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}