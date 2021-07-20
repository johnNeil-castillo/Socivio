import React from "react";
import { Menu, Container, Icon, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Grid>
      <Grid.Row>
        <Menu fluid borderless>
          <Grid.Column floated="right" width={2}>
            <Link href="/login">
              <Menu.Item header active={isActive("/login")}>
                <Icon size="large" name="sign in" />
                Login
              </Menu.Item>
            </Link>
          </Grid.Column>

          <Grid.Column floated="right" width={2}>
            <Link href="/signup">
              <Menu.Item header active={isActive("/signup")}>
                <Icon size="large" name="signup" />
                Signup
              </Menu.Item>
            </Link>
          </Grid.Column>
        </Menu>
      </Grid.Row>
    </Grid>
  );
}

export default Navbar;
