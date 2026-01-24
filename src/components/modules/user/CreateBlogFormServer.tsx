import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


const API_URL = process.env.API_URL;

const CreateBlogFormServer = () => {
  const createBlog = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };
    console.log(JSON.stringify(blogData));
    const cookieStore = await cookies()

    const res = await fetch(`${API_URL}/api/v1/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString()
      },
      body: JSON.stringify(blogData)
    })

    if(res.ok){
      revalidateTag("blogPost", "max");
      // redirect("/dashboard/create-blog?asdfasdf")
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>You can write you blog here</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="blog-form" action={createBlog}>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                id="title"
                placeholder="Blog Title"
                type=" text"
                name="title"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Content</FieldLabel>
              <textarea
                id="content"
                placeholder="Write your blog"
                name="content"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Tags</FieldLabel>
              <Input
                type=" text"
                id="tags"
                name="tags"
                placeholder="nextjs, web"
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="blog-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateBlogFormServer;
