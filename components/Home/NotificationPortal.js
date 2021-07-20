import React from "react";
import { Segment, TransitionablePortal, Icon, Feed } from "semantic-ui-react";
import newMsgSound from "../../utils/newMsgSound";
import { useRouter } from "next/router";
import calculateTime from "../../utils/calculateTime";

const NotificationPortal = ({
  newNotification,
  notificationPopup,
  showNotificationPopup,
}) => {
  const router = useRouter();

  const { name, profilePicUrl, username, postId } = newNotification;

  return (
    <TransitionablePortal
      transition={{ animation: "fade left", duration: "500" }}
      onClose={() => notificationPopup && showNotificationPopup(false)}
      onOpen={newMsgSound}
      open={notificationPopup}
    >
      <Segment
        style={{
          right: "2%",
          position: "fixed",
          bottom: "10%",
          zIndex: 1000,
          width: "25%",
        }}
      >
        <Icon
          name="close"
          size="small"
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => showNotificationPopup(false)}
        />
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <img src={profilePicUrl} />
            </Feed.Label>
            <Feed.Content style={{ position: "relative", bottom: "8px" }}>
              <Feed.Summary>
                <Feed.User onClick={() => router.push(`/${username}`)}>
                  {name}{" "}
                </Feed.User>{" "}
                liked your{" "}
                <a onClick={() => router.push(`/post/${postId}`)}> post</a>
                <Feed.Date>{calculateTime(Date.now())}</Feed.Date>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Segment>
    </TransitionablePortal>
  );
};

export default NotificationPortal;
