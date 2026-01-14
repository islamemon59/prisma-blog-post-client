import React from "react";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return <div><h1>This is about root</h1>{children}</div>;
};

export default AboutLayout;
