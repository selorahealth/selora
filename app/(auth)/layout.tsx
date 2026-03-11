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
        <div className="min-h-screen bg-[#0A0B14] flex items-center justify-center p-4">
            {/* Ambient background glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#6183FF] opacity-[0.06] blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#5DFFAD] opacity-[0.05] blur-[120px]" />
            </div>
            <div className="relative z-10 w-full max-w-md">
                {children}
            </div>
        </div>
    )
}
