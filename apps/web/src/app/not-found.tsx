'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
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
          marginBottom: '1rem'
        }}>404 - Halaman Tidak Ditemukan</h1>
        <p style={{
          marginBottom: '1.5rem'
        }}>Maaf, halaman yang Anda cari tidak ada.</p>
        <Link
          href="/"
          style={{
            color: '#2563eb',
            textDecoration: 'underline',
            fontWeight: '500'
          }}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}