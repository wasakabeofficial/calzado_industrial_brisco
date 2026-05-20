import Logo from "./Logo";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <a
            href="https://neuropoint.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo-n-mini-filled.svg"
              alt="Neuropoint"
              className="h-8 w-auto"
            />
            <span className="font-semibold tracking-tight" style={{ color: '#4F46E5' }}>neuropoint.ai</span>
          </a>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-100 py-4 text-center border-t border-gray-200">
        <a
          href="https://neuropoint.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 text-sm hover:text-blue-600 hover:underline cursor-pointer transition-colors"
        >
          Diseñado por el equipo de Neuropoint.ai
        </a>
      </footer>
    </div>
  );
}
