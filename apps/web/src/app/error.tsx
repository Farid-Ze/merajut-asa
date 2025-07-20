'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Terjadi kesalahan
        </h2>
        <p className="text-gray-600 mb-6">
          Mohon maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu.
        </p>
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}