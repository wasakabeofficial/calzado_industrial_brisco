export function Loading({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        role="status"
        className={`${sizes[size]} relative`}
        aria-label="Cargando"
      >
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="70 280"
            strokeLinecap="round"
            className="text-blue-200 animate-pulse"
            transform="rotate(45 50 50)"
          />
        </svg>
      </div>
    </div>
  );
}

export function LoadingOverlay({
  message = "Cargando...",
}: {
  message?: string;
}) {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
      <Loading size="lg" />
      <p className="mt-4 text-sm text-gray-500 font-medium">{message}</p>
    </div>
  );
}
