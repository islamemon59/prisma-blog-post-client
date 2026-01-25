import HistoryTable from '@/components/modules/user/history/HistoryTable';
import { blogService } from '@/services/blog.service';
import React from 'react';

const HistoryPage = async () => {
    const response = await blogService.getBlog();
    const posts = response?.data.data || []
    console.log(posts);
    return (
        <div>
            <HistoryTable posts={posts.data}/>
        </div>
    );
};

export default HistoryPage;