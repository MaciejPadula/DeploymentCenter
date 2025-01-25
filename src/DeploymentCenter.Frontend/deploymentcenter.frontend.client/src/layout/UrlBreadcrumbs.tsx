import { Breadcrumbs, Typography } from "@mui/material";
import Link from '@mui/material/Link';

export function UrlBreadcrumbs() {
  const currentUrl = window.location.pathname;
  const segments = currentUrl.split('/');

  return (
    <Breadcrumbs>
      {
        segments.slice(0, segments.length - 1).map((segment, index) => {
          const url = segments.slice(0, index + 1).join('/');
          return (
            <Link
              underline="hover"
              color="inherit"
              href={url}
              key={index}
            >
              {segment}
            </Link>
          );
        })
      }
      <Typography sx={{ color: 'text.primary' }}>{segments[segments.length - 1]}</Typography>
    </Breadcrumbs>
  );
}