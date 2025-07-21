'use client';

// Force dynamic rendering to avoid styled-jsx issues
export const dynamic = 'force-dynamic';

export default function GlobalError({
    error: _error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="id">
            <body style={{
                margin: 0,
                padding: 0,
                fontFamily: 'system-ui, sans-serif',
                backgroundColor: '#f9fafb',
                color: '#1f2937',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '28rem',
                    margin: '0 auto',
                    padding: '0 1rem'
                }}>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: '#dc2626',
                        margin: '0 0 1rem 0'
                    }}>500</h1>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        margin: '0 0 1rem 0'
                    }}>Terjadi Kesalahan</h2>
                    <p style={{
                        color: '#6b7280',
                        marginBottom: '2rem',
                        fontSize: '1rem'
                    }}>
                        Maaf, terjadi kesalahan pada aplikasi. Silakan coba lagi.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => reset()}
                            style={{
                                backgroundColor: '#dc2626',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            Coba Lagi
                        </button>
                        <a 
                            href="/"
                            style={{
                                display: 'inline-block',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                textDecoration: 'none',
                                fontWeight: '500'
                            }}
                        >
                            Kembali ke Beranda
                        </a>
                    </div>
                </div>
            </body>
        </html>
    );
}
