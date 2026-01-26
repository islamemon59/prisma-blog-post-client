import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BlogPost } from '@/types';
import React from 'react';

const HistoryTable = ({posts}: {posts: BlogPost[]}) => {
    return (
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-25">Title</TableHead>
      <TableHead>Content</TableHead>
      <TableHead>Views</TableHead>
      <TableHead className="text-right">Featured</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {posts.map((item => <TableRow key={item.id}>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.content}</TableCell>
        <TableCell>{item.views}</TableCell>
        <TableCell>{item.isFeatured}</TableCell>
    </TableRow> ))}
  </TableBody>
</Table>
    );
};

export default HistoryTable;