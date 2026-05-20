import Logo from "./components/Logo";

export default function App() {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <Logo />

      <div className="flex items-center gap-6"></div>
    </nav>
  );
}
