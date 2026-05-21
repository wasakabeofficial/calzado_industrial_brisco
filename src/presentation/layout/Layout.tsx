import Logo from "./Logo";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const url = "https://neuropoint.ai";
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <nav className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo-n-mini-filled.svg"
                alt="Neuropoint"
                className="h-7 md:h-8 w-auto"
              />
              <span
                className="font-semibold tracking-tight text-sm md:text-base hidden sm:inline"
                style={{ color: "#4F46E5" }}
              >
                neuropoint.ai
              </span>
            </a>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-gray-100 py-3 md:py-4 text-center border-t border-gray-200">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-xs md:text-sm hover:text-blue-600 hover:underline cursor-pointer transition-colors"
          >
            Diseñado por el equipo de Neuropoint.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
