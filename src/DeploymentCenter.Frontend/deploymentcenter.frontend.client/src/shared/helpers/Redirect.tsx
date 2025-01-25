import { useAppRouting } from "../hooks/navigation";

export function Redirect(props: { to: string }) {
  const navigation = useAppRouting();
  navigation.navigateToUrl(props.to);
  return <></>;
}