import { Segment, Button } from "semantic-ui-react";

export const NoProfilePosts = () => (
  <>
    <Segment size="mini" content="User has not posted anything yet!" />
    <Button
      icon="long arrow alternate left"
      content="Go Back"
      as="a"
      href="/"
    />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Segment size="mini" content="User does not have followers" />
    )}

    {followingComponent && (
      <Segment size="mini" content="User does not follow any users" />
    )}
  </>
);

export const NoMessages = () => (
  <Segment
    size="mini"
    content="You have not messaged anyone yet. Search above to message someone!"
  />
);

export const NoPosts = () => (
  <Segment
    size="mini"
    content="No Posts. Make sure you have followed someone."
  />
);

export const NoProfile = () => (
  <Segment size="mini" content="No Profile Found." />
);

export const NoNotifications = () => <Segment content="No Notifications" />;

export const NoPostFound = () => <Segment content="No Post Found." />;
