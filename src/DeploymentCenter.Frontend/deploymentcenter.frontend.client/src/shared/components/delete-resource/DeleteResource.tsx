import { ConfirmationDialog } from "../confirmation-dialog/ConfirmationDialog";

type Props = {
  resourceName: string;
  onDelete: () => void;
  children: React.ReactNode;
};

export function DeleteResource(props: Props) {
  const showDialog = props.resourceName.length > 0;

  if (!showDialog) {
    return <div onClick={props.onDelete}>{props.children}</div>;
  }

  return (
    <ConfirmationDialog
      title="Are you sure?"
      description="You are trying to delete resource. To confirm, type "
      requiredConfirmationText={props.resourceName}
      onConfirm={props.onDelete}
    >
      {props.children}
    </ConfirmationDialog>
  );
}
