// Force dynamic rendering for 404 page to avoid styled-jsx issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function NotFound() {
  return (
    <html lang="id">
      <head>
        <title>404 - Halaman Tidak Ditemukan | Merajut ASA</title>
        <meta name="robots" content="noindex" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
            color: '#6366f1',
            margin: '0 0 1rem 0'
          }}>404</h1>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            margin: '0 0 1rem 0'
          }}>Halaman Tidak Ditemukan</h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            fontSize: '1rem'
          }}>
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            Kembali ke Beranda
          </a>
        </div>
      </body>
    </html>
  );
}
