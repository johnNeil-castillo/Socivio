const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "https://localhost:3000"
    : "https://socivio.herokuapp.com";

export default baseUrl;
