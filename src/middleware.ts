export const config = {
  matcher: '/api/:path*',
};

export function middleware(request: Request) {
  console.log('Authorization header', request.headers.get('authorization'));
}
