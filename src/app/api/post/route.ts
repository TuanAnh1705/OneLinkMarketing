// app/api/post/route.ts (Client FE - localhost:3000)
import { NextRequest, NextResponse } from 'next/server';
import { STATIC_POSTS, type StaticBlogPost } from '@/lib/staticBlogData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ⚠️ TẠM THỜI: backend đang không đổ data về → fallback sang bài viết tĩnh.
// Hỗ trợ các query đang được FE dùng: per_page, category (theo tên category).
function buildStaticResponse(searchParams: URLSearchParams) {
  const category = searchParams.get('category');
  const perPage = Number(searchParams.get('per_page')) || STATIC_POSTS.length;

  let posts: StaticBlogPost[] = [...STATIC_POSTS];

  if (category && category !== 'All') {
    posts = posts.filter((p) =>
      p.categories.some((c) => c.name === category || c.slug === category)
    );
  }

  // Sắp xếp theo displayOrder ASC rồi wpCreatedAt DESC (giống backend cũ)
  posts.sort((a, b) => {
    const oa = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const ob = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    if (oa !== ob) return oa - ob;
    return new Date(b.wpCreatedAt).getTime() - new Date(a.wpCreatedAt).getTime();
  });

  const total = posts.length;
  posts = posts.slice(0, perPage);

  return { posts, total };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();

  // Thử gọi backend; nếu không dùng được thì im lặng fallback sang data tĩnh.
  try {
    const response = await fetch(`${API_URL}/api/post?${queryString}`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data?.posts) && data.posts.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch {
    // Backend không phản hồi (đang lỗi/không đổ data) — bỏ qua, dùng fallback bên dưới.
  }

  console.info('[posts] backend unavailable → dùng data tĩnh tạm thời');
  return NextResponse.json(buildStaticResponse(searchParams));
}