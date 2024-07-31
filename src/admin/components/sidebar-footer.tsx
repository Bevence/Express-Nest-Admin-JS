import React from "react";

import { Box } from "@adminjs/design-system";

export const Login: React.FC = () => {
  const year = new Date().getFullYear();
  const APP_NAME = (window as any).AdminJS.env.APP_NAME;

  return (
    <Box m={20}>
      Copyright &copy; {year} {APP_NAME}
    </Box>
  );
};

export default Login;
