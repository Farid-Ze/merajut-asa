'use client';

export default function Offline() {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                textAlign: 'center',
                maxWidth: '28rem',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#111827'
                }}>Anda sedang offline</h1>
                <p style={{
                    marginBottom: '1.5rem',
                    color: '#6b7280'
                }}>Aplikasi tidak dapat terhubung ke internet. Silakan periksa koneksi Anda.</p>
                <button
                    onClick={handleRetry}
                    style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Coba Lagi
                </button>
            </div>
        </div>
    );
}
