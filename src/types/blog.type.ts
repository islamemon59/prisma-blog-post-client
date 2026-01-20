export interface BlogPost {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    isFeatured: boolean;
    status: string;
    tags: string[];
    views: number;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        comments: number
    }
}