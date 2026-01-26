import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service";
import React from "react";

const HistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  console.log(page);
  const response = await blogService.getBlog({ page });
  const posts = response?.data.data || [];
  console.log(response?.data.data.pagination);
  const meta = response?.data.data.pagination || {limit: 5, page: 1, total: 20, totalPages: 4}
  return (
    <div>
      <HistoryTable posts={posts.data} />
      <PaginationControls meta={meta}/>
    </div>
  );
};

export default HistoryPage;
