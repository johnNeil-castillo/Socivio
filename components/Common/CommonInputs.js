import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Message, TextArea } from "semantic-ui-react";

const CommonInputs = ({
  user: { bio, facebook, instagram, youtube, twitter },
  handleChange,
  showSocialLinks,
  setShowSocialLinks,
}) => {
  return (
    <>
      <Form.Field
        required
        control={TextArea}
        name="bio"
        value={bio}
        onChange={handleChange}
        placeholder="Please tell us more about yourself"
      />

      <Button
        fluid
        size="small"
        content="Add Social Media Links"
        color="red"
        type="button"
        onClick={() => setShowSocialLinks(!showSocialLinks)}
      />

      {showSocialLinks && (
        <>
          <Form style={{ top: "1rem" }}>
            <Form.Input
              icon="facebook f"
              iconPosition="left"
              name="facebook"
              value={facebook}
              onChange={handleChange}
            />

            <Form.Input
              icon="twitter"
              iconPosition="left"
              name="twitter"
              value={twitter}
              onChange={handleChange}
            />

            <Form.Input
              icon="instagram"
              iconPosition="left"
              name="instagram"
              value={instagram}
              onChange={handleChange}
            />

            <Form.Input
              icon="youtube"
              iconPosition="left"
              name="youtube"
              value={youtube}
              onChange={handleChange}
            />
            <Message size="small" content="Social Media Links Are Optional" />
          </Form>
        </>
      )}
    </>
  );
};

export default CommonInputs;
