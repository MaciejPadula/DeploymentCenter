import { useMediaQuery, useTheme } from "@mui/material";

export function useMobile() { 
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}