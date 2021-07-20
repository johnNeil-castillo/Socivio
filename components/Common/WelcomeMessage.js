import { Segment, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Grid>
            <Grid.Row>
              <Grid.Column>Create New Account</Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <h4>Login with Email and Password</h4>
      )}
    </>
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Segment
            textAlign="center"
            style={{ fontSize: "13px" }}
            basic
            size="tiny"
          >
            Existing User?
            <Link href="/login"> Login Here Instead</Link>
          </Segment>
        </>
      ) : (
        <>
          <Grid style={{ fontSize: "13px" }}>
            <Grid.Column floated="left" width={8}>
              <Link href="/">Forgot Password?</Link>
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <Link href="/signup">Sign Up Here</Link>
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  );
};
