import React from "react";
import { Box, H3 } from "@adminjs/design-system";
import { BasePropertyProps } from "adminjs";

const Dashboard: React.FC<BasePropertyProps> = ({ record }) => {
  return (
    <Box>
      <Box
        flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        p="xl"
        boxShadow="card"
        borderRadius="lg"
        mb="xl"
      >
        <H3>Welcome to Admin Dashboard</H3>
      </Box>
    </Box>
  );
};

export default Dashboard;
