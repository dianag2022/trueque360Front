import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Products from "./products/page";
import { AIAssistant } from "@/components/ai-assistant";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">

        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <section className="w-full max-w-4xl mx-auto p-4">
              <h1 className="text-4xl font-bold text-center mb-8">Lo buscamos por ti</h1>
              <AIAssistant />
            </section>
            <h2 className="font-medium text-xl mb-4">Encuentra todo lo que necesitas aquí</h2>
            <div>
              <Products></Products>
            </div>
          </main>
        </div>


        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Universal Web Code
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
