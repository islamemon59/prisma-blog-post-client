import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';
import React from 'react';

export async function generateStaticParams(){
    const data = await blogService.getBlog();
    return data?.data?.data?.data.map((blog: BlogPost) => ({
        id: blog.id
    }))
}

const DynamicBlogPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;

    const blog = await blogService.getBlogPosts(id);

    console.log(blog); 
    console.log(id);
    return (
        <div>
            <p>This is dynamic page {id}</p>
        </div>
    );
};

export default DynamicBlogPage;