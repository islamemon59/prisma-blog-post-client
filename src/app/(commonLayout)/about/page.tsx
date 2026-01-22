"use client"


import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [data, setData] = useState<unknown>(null);

  console.log(data);

useEffect(() => {
( async() => {
  const data = await getBlogs()
  if(data){
    setData(data);
  }
})()
}, [])
  return <div>This is about page.</div>;
};

export default AboutPage;
