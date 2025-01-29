import { ConfirmationDialog } from "../confirmation-dialog/ConfirmationDialog";

type Props = {
  resourceName: string;
  onDelete: () => void;
  children: React.ReactNode;
};

export function DeleteResource(props: Props) {
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
