import React, { useState, useEffect } from "react";

import {
  Form,
  Button,
  Message,
  Segment,
  Divider,
  Grid,
} from "semantic-ui-react";

import { loggedinUser } from "../utils/authUser";
import cookie from "js-cookie";

import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );

    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loggedinUser(user, setErrorMsg, setFormLoading);
  };

  useEffect(() => {
    document.title = "Socivio";
    const userEmail = cookie.get("userEmail");
    if (userEmail) setUser((prev) => ({ ...prev, email: userEmail }));
  }, []);

  return (
    <>
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Grid centered>
          <Grid.Column
            style={{ position: "relative", top: "20vh" }}
            computer={10}
            tablet={10}
            mobile={16}
            padded="vertically"
          >
            <Grid>
              <Grid.Column textAlign="center">
                <Message
                  centered
                  attached="top"
                  size="small"
                  error
                  content={errorMsg}
                  onDismiss={() => setErrorMsg(null)}
                />
              </Grid.Column>
            </Grid>
            <Segment size="large">
              <Form.Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                fluid
                icon="envelope"
                iconPosition="left"
                type="email"
              />
              <Form.Input
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                fluid
                icon={{
                  name: "eye",
                  circular: true,
                  link: true,
                  onClick: () => setShowPassword(!showPassword),
                }}
                iconPosition="left"
                type={showPassword ? "text" : "password"}
              />
              <Grid>
                <Grid.Column textAlign="center">
                  <Button
                    fluid
                    content="Login"
                    type="submit"
                    color="orange"
                    disabled={submitDisabled}
                  />
                </Grid.Column>
              </Grid>
              <Divider />

              <FooterMessage />
            </Segment>
          </Grid.Column>
        </Grid>
      </Form>
    </>
  );
};

export default Login;
