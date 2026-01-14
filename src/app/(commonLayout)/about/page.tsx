
import React from "react";

export const dynamic = 'force-dynamic'

const AboutPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <div>This is about page.</div>;
};

export default AboutPage;
