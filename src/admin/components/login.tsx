import React from "react";

import {
  Box,
  BoxProps,
  Button,
  FormGroup,
  H5,
  Input,
  Label,
  MessageBox,
  Text,
  themeGet,
} from "@adminjs/design-system";
import { styled } from "@adminjs/design-system/styled-components";
import { ReduxState } from "adminjs";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)<BoxProps>`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const StyledLogo = styled.img`
  max-width: 200px;
  margin: ${themeGet("space", "md")} 0;
`;

const IllustrationsWrapper = styled(Box)<BoxProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  & svg [stroke="#3B3552"] {
    stroke: rgba(255, 255, 255, 0.5);
  }
  & svg [fill="#3040D6"] {
    fill: rgba(255, 255, 255, 1);
  }
`;

export type LoginProps = {
  action: string;
  errorMessage?: string;
  children?: any;
};

export const Login: React.FC<LoginProps> = (props) => {
  const { action, errorMessage } = props;
  console.log("props :>> ", props);

  const year = new Date().getFullYear();
  const APP_NAME = (window as any).AdminJS.env.APP_NAME;

  const branding = useSelector((state: ReduxState) => state.branding);

  return (
    <React.Fragment>
      <Wrapper flex variant="grey">
        <Box
          bg="white"
          height="auto"
          flex
          boxShadow="login"
          width={[1, 2 / 3, "auto"]}
        >
          <Box
            as="form"
            action={action}
            method="POST"
            p="x3"
            flexGrow={1}
            width={["100%", "100%", "480px"]}
          >
            <H5 marginBottom="xxl" style={{ textAlign: "center" }}>
              {branding.logo ? (
                <StyledLogo
                  height="144px"
                  width="auto"
                  src={branding.logo}
                  alt={branding.companyName}
                />
              ) : (
                branding.companyName
              )}
            </H5>
            {/* <MessageBox my="lg" message={message} variant="info" style={{ whiteSpace: 'pre-wrap' }} /> */}
            {errorMessage && (
              <MessageBox
                my="lg"
                message={
                  errorMessage.split(" ").length > 1
                    ? errorMessage
                    : errorMessage
                }
                variant="danger"
              />
            )}
            <FormGroup>
              <Label required>Email</Label>
              <Input name="email" placeholder="email" />
            </FormGroup>
            <FormGroup>
              <Label required>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="password"
                autoComplete="new-password"
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button variant="contained">Login</Button>
            </Text>
          </Box>
        </Box>
        <Box mt="xxl">
          Copyright &copy; {year} {APP_NAME}
        </Box>
      </Wrapper>
    </React.Fragment>
  );
};

export default Login;
