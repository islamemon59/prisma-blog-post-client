import { BlogPost } from '@/types';
import React from 'react';

const BlogCard = ({post}: {post: BlogPost}) => {
    return (
        <div>
            <p>{post?.title}</p>
            <p>{post?.content}</p>
        </div>
    );
};

export default BlogCard;