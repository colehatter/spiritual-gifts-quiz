import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// A/B test: split traffic 50/50 between /landing (control) and /landing-b (video variant)
// Cookie ensures a user always sees the same variant once assigned
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept the root landing entry point — direct hits to /landing or /landing-b skip splitting
  if (pathname !== '/landing-ab') {
    return NextResponse.next();
  }

  const cookieName = 'ab_landing';
  const existingVariant = request.cookies.get(cookieName)?.value;

  // Assign variant if not already set
  const variant = existingVariant === 'b' ? 'b' : existingVariant === 'a' ? 'a' : Math.random() < 0.5 ? 'a' : 'b';
  const destination = variant === 'b' ? '/landing-b' : '/landing';

  const response = NextResponse.rewrite(new URL(destination, request.url));

  // Set cookie if newly assigned (30 day expiry)
  if (!existingVariant) {
    response.cookies.set(cookieName, variant, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/landing-ab'],
};
