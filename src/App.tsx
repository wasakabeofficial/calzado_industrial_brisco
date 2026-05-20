import { supabase } from "./lib/supabase";

export default function App() {
  supabase.auth.getSession().then(({ error }) => {
    if (error) {
      console.error("❌ Error de conexión:", error.message);
    } else {
      console.log("✅ Conectado a Supabase correctamente");
    }
  });

  return <div>Hello, World!</div>;
}
