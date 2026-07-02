// app/api/categories/route.ts (Client FE - localhost:3000)
import { NextResponse } from 'next/server';
import { STATIC_CATEGORIES } from '@/lib/staticBlogData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ⚠️ TẠM THỜI: backend đang không đổ data về → fallback sang categories tĩnh.
// Vẫn thử gọi backend trước; nếu lỗi/empty thì trả về STATIC_CATEGORIES.
export async function GET() {
  // Thử gọi backend; nếu không dùng được thì im lặng fallback sang categories tĩnh.
  try {
    const response = await fetch(`${API_URL}/api/categories`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      const list = data?.categories;
      if (Array.isArray(list) && list.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch {
    // Backend không phản hồi — bỏ qua, dùng fallback bên dưới.
  }

  console.info('[categories] backend unavailable → dùng data tĩnh tạm thời');
  return NextResponse.json({ categories: STATIC_CATEGORIES });
}