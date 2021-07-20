import React, { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";
import { createMedia } from "@artsy/fresnel";
import CropImageModal from "./CropImageModal";

const AppMedia = createMedia({
  breakpoints: { zero: 0, mobile: 411, tablet: 768, computer: 1025 },
});
const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function CreatePost({ user, setPosts }) {
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;

    if (media !== null) {
      picUrl = await uploadPic(media);
      if (!picUrl) {
        setLoading(false);
        return setError("Error Uploading Image");
      }
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );

    setMedia(null);

    if (mediaPreview !== null && URL.revokeObjectURL(mediaPreview))
      setTimeout(() => setMediaPreview(null), 3000);

    setMediaPreview(null);
    setLoading(false);
  };

  return (
    <>
      {showModal && (
        <CropImageModal
          mediaPreview={mediaPreview}
          setMedia={setMedia}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <style>{mediaStyles}</style>
      <MediaContextProvider>
        <Media greaterThanOrEqual="tablet">
          <Form error={error !== null} onSubmit={handleSubmit}>
            <Message
              error
              onDismiss={() => setError(null)}
              content={error}
              header="Oops!"
            />

            <Form.Group>
              <Image src={user.profilePicUrl} circular avatar inline />
              <Form.TextArea
                placeholder="Whats Happening"
                name="text"
                value={newPost.text}
                onChange={handleChange}
                rows={3}
                width={15}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                style={{ position: "relative", left: "31px" }}
                width={8}
                value={newPost.location}
                name="location"
                onChange={handleChange}
                // label="Add Location"
                icon="map marker alternate"
                placeholder="Want to add Location?"
              />
              <input
                ref={inputRef}
                onChange={handleChange}
                name="media"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
              />
            </Form.Group>

            <div
              onClick={() => inputRef.current.click()}
              style={{
                position: "relative",
                left: "31px",
                textAlign: "center",
                height: "50px",
                width: "50px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "4px",
                paddingTop: media === null && "14px",
                cursor: "pointer",
                borderColor: highlighted ? "green" : "#DCDCDC",
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setHighlighted(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setHighlighted(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHighlighted(true);

                const droppedFile = Array.from(e.dataTransfer.files);

                setMedia(droppedFile[0]);
                setMediaPreview(URL.createObjectURL(droppedFile[0]));
              }}
            >
              {media === null ? (
                <Icon style={{ color: "#DCDCDC" }} name="plus" size="small" />
              ) : (
                <>
                  <Image
                    style={{ height: "50px", width: "50px" }}
                    src={mediaPreview}
                    alt="PostImage"
                    centered
                    size="medium"
                  />
                </>
              )}
            </div>

            {mediaPreview !== null && (
              <>
                <Divider hidden />
                <Button
                  content="Crop Image"
                  type="button"
                  primary
                  circular
                  onClick={() => setShowModal(true)}
                />
              </>
            )}

            <Divider hidden />

            <Button
              fluid
              disabled={newPost.text === "" || loading}
              content={<strong>Post</strong>}
              style={{ backgroundColor: "#1DA1F2", color: "white" }}
              loading={loading}
            />
          </Form>
          <Divider />
        </Media>

        <Media between={["zero", "tablet"]}>
          <Form error={error !== null} onSubmit={handleSubmit}>
            <Message
              error
              onDismiss={() => setError(null)}
              content={error}
              header="Oops!"
            />

            <Form.Group>
              <Image src={user.profilePicUrl} circular avatar inline />
              <Form.TextArea
                placeholder="Whats Happening"
                name="text"
                value={newPost.text}
                onChange={handleChange}
                rows={3}
                width={13}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                width={8}
                value={newPost.location}
                name="location"
                onChange={handleChange}
                icon="map marker alternate"
                placeholder="Want to add Location?"
              />
              <input
                ref={inputRef}
                onChange={handleChange}
                name="media"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
              />
            </Form.Group>

            <div
              onClick={() => inputRef.current.click()}
              style={{
                position: "relative",

                textAlign: "center",
                height: "50px",
                width: "50px",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "4px",
                paddingTop: media === null && "14px",
                cursor: "pointer",
                borderColor: highlighted ? "green" : "#DCDCDC",
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setHighlighted(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setHighlighted(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHighlighted(true);

                const droppedFile = Array.from(e.dataTransfer.files);

                setMedia(droppedFile[0]);
                setMediaPreview(URL.createObjectURL(droppedFile[0]));
              }}
            >
              {media === null ? (
                <Icon style={{ color: "#DCDCDC" }} name="plus" size="small" />
              ) : (
                <>
                  <Image
                    style={{ height: "50px", width: "50px" }}
                    src={mediaPreview}
                    alt="PostImage"
                    centered
                    size="medium"
                  />
                </>
              )}
            </div>
            <Divider hidden />

            <Button
              fluid
              disabled={newPost.text === "" || loading}
              content={<strong>Post</strong>}
              style={{ backgroundColor: "#1DA1F2", color: "white" }}
              icon="send"
              loading={loading}
            />
          </Form>
          <Divider />
        </Media>
      </MediaContextProvider>
    </>
  );
}

export default CreatePost;
