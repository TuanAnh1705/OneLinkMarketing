// app/api/post/[id]/route.ts (Client FE - localhost:3000)
import { NextResponse } from 'next/server';
import { STATIC_POSTS } from '@/lib/staticBlogData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ⚠️ TẠM THỜI: backend đang không đổ data về → fallback sang bài viết tĩnh theo id/slug.
function findStaticPost(id: string) {
  return (
    STATIC_POSTS.find((p) => String(p.id) === id) ||
    STATIC_POSTS.find((p) => p.slug === id) ||
    null
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // ✅ Await params trước khi sử dụng
  const { id } = await params;

  // Thử gọi backend; nếu không dùng được thì im lặng fallback sang bài viết tĩnh.
  try {
    const response = await fetch(`${API_URL}/api/post/${id}`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      const post = data?.post ?? (data?.id ? data : null);
      if (post) {
        return NextResponse.json(data);
      }
    }
  } catch {
    // Backend không phản hồi — bỏ qua, dùng fallback bên dưới.
  }

  const post = findStaticPost(id);
  if (post) {
    console.info(`[post ${id}] backend unavailable → dùng data tĩnh tạm thời`);
    return NextResponse.json({ success: true, post });
  }
  return NextResponse.json({ error: 'Failed to fetch post' }, { status: 404 });
}