import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment, useState } from "react";
import { SelectNamespace } from "../../shared/components/select-namespaces/SelectNamespace";
import { useNavigate } from "react-router-dom";
import { useNamespaceContext } from "../../shared/contexts/namespace-context-helpers";

export function SelectNamespaceDialog(props: {onClose?: () => void}) {
  const navigate = useNavigate();
  const { namespace, setNamespace } = useNamespaceContext();
  const [selectedNamespace, setSelectedNamespace] = useState(namespace);
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSave() {
    setNamespace(selectedNamespace);
    navigate('/');
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>Select Namespace</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Available Namespace</DialogTitle>
        <DialogContent>
          <SelectNamespace
            namespace={selectedNamespace}
            onNamespaceChanged={ns => setSelectedNamespace(ns)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
