import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Selora Health — Authentication',
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
            {/* Alien AI Theme Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-purple-600 opacity-[0.05] blur-[150px]" />
                <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500 opacity-[0.03] blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-pink-500 opacity-[0.03] blur-[120px]" />
            </div>
            <div className="relative z-10 w-full max-w-md">
                {children}
            </div>
        </div>
    )
}
