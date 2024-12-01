import { Alert } from "@mui/material";

type Props = {
  children?: React.ReactNode;
};

export function ErrorBadge(props: Props) {
  return <Alert severity="error">{props.children}</Alert>;
}