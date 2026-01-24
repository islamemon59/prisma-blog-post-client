import CreateBlogFormServer from '@/components/modules/user/CreateBlogFormServer';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';
import React from 'react';

const CreateBlog = async () => {
    const data = await blogService.getBlog({}, {cache: "no-store"});
    return (
        <div>
            <CreateBlogFormServer/>
            {data?.data?.data?.data.map((post: BlogPost) => {
                 return <p key={post.id}>{post?.title}</p>
            })}
        </div>
    );
};

export default CreateBlog;