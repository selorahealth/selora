import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    try {
        let supabaseResponse = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return supabaseResponse;
        }

        const supabase = createServerClient(
            supabaseUrl,
            supabaseKey,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) =>
                            request.cookies.set(name, value)
                        )
                        supabaseResponse = NextResponse.next({ request })
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        )
                    },
                },
            }
        )

        const { data: { user } } = await supabase.auth.getUser()

        const pathname = request.nextUrl.pathname;

        // Redirect logged-in users away from auth pages
        if (user && (pathname === '/login' || pathname === '/signup')) {
            const url = request.nextUrl.clone()
            url.pathname = '/patient'
            return NextResponse.redirect(url)
        }

        // Protect dashboard routes
        const protectedPaths = ['/patient', '/hospital', '/researcher', '/admin']
        const isProtected = protectedPaths.some(p => pathname.startsWith(p))

        if (!user && isProtected) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            url.searchParams.set('redirectTo', pathname)
            return NextResponse.redirect(url)
        }

        return supabaseResponse;
    } catch (error) {
        // Fallback for Vercel Edge Runtime
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
