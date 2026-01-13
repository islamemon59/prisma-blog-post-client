
import React from "react";

const AboutPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  throw new Error()
  return <div>This is about page.</div>;
};

export default AboutPage;
