import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Merajut <span className="text-blue-600">ASA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform kolaborasi digital untuk membangun masa depan yang inklusif, 
            berkelanjutan, dan berdampak di Jawa Barat
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/campaigns" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Jelajahi Kampanye
            </Link>
            <Link 
              href="/community" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Bergabung Komunitas
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Kolaborasi Inklusif
              </h3>
              <p className="text-gray-600">
                Menghubungkan berbagai komunitas untuk menciptakan dampak sosial yang berkelanjutan
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Teknologi Aksesibel
              </h3>
              <p className="text-gray-600">
                Platform yang dirancang untuk semua kalangan dengan standar aksesibilitas tinggi
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Dampak Terukur
              </h3>
              <p className="text-gray-600">
                Transparansi dan akuntabilitas dalam setiap program dan inisiatif yang dijalankan
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
