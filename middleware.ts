import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const allowedMethods = ['GET', 'POST', 'HEAD'];
    if (!allowedMethods.includes(request.method)) {
        return new NextResponse(null, { status: 405, statusText: 'Method Not Allowed' });
    }

    // Bypass middleware on prefetch requests, which can crash on Vercel's Edge network
    if (request.headers.has('x-middleware-prefetch') || request.headers.has('x-invoke-path')) {
        return NextResponse.next();
    }

    if (process.env.NODE_ENV === 'production' && request.nextUrl.protocol === 'http:') {
        const url = request.nextUrl.clone()
        url.protocol = 'https:'
        return NextResponse.redirect(url)
    }

    const nonce = crypto.randomUUID();
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    let supabaseResponse = NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
    supabaseResponse.headers.set('Content-Security-Policy', cspHeader);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If environment variables are missing, prevent the middleware from crashing the app
    if (!supabaseUrl || !supabaseKey) {
        console.error('Middleware: Supabase environment variables missing!');
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

    const { pathname } = request.nextUrl

    // Redirect logged-in users away from auth pages
    if (user && (pathname === '/login' || pathname === '/signup')) {
        const url = request.nextUrl.clone()
        url.pathname = '/patient' // default redirect — middleware will refine based on role
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

    return supabaseResponse
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
