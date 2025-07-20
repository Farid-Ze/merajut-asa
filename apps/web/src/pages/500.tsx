export default function Custom500() {
    return (
        <html>
            <head>
                <title>500 - Terjadi Kesalahan</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style>
                    {`
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              padding: 1rem;
              text-align: center;
              background-color: #f9fafb;
              color: #1f2937;
            }
            
            .container {
              max-width: 28rem;
            }
            
            h1 {
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }
            
            p {
              margin-bottom: 1.5rem;
              color: #4b5563;
            }
            
            a {
              color: #2563eb;
              text-decoration: underline;
            }
          `}
                </style>
            </head>
            <body>
                <div className="container">
                    <h1>500 - Kesalahan Server</h1>
                    <p>Mohon maaf, terjadi kesalahan pada server kami.</p>
                    <a href="/">Kembali ke Beranda</a>
                </div>
            </body>
        </html>
    );
}
