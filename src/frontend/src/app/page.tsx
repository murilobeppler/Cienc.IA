"use client";

export default function Home() {
  return (
    <div className="min-h-screen glow-mesh text-slate-900 dark:text-slate-100 selection:bg-sky-500/30">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
              C
            </div>
            <span className="text-xl font-bold tracking-tight font-outfit">CiencIA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-80">
            <a href="#features" className="hover:text-sky-400 transition-colors">Funcionalidades</a>
            <a href="#pipeline" className="hover:text-sky-400 transition-colors">Nextflow Engine</a>
            <a href="#ai" className="hover:text-sky-400 transition-colors">IA Científica</a>
          </div>
          <button
            onClick={() => window.location.href = '/chat'}
            className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-all shadow-lg shadow-sky-500/25"
          >
            Abrir App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            PLATAFORMA BIO-SAAS V1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 tracking-tight">
            Descubra o Futuro da <br />
            <span className="text-gradient">Ciência de Dados Biológicos</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Unindo Pipelines Nextflow de alto desempenho à Inteligência Artificial para acelerar descobertas genômicas e a escrita de papers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => window.location.href = '/chat'}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-bold hover:scale-105 transition-transform shadow-xl"
            >
              Iniciar Experimento
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl glass font-bold hover:bg-white/5 transition-colors border border-white/10">
              Ver Documentação
            </button>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="mx-auto text-[10px] font-mono opacity-40 uppercase tracking-widest">
                  multiomics-analysis-terminal.sh
                </div>
              </div>
              <div className="p-6 text-left font-mono text-sm space-y-2 overflow-x-auto">
                <div className="flex gap-4">
                  <span className="text-sky-500">$</span>
                  <span className="text-emerald-400">nextflow run ciencia/multiomics-pipeline</span>
                </div>
                <div className="opacity-60 text-xs">
                  [core] Launching Multi-Omics Engine...<br />
                  [genomics] Analyzing Sample_001.fastq.gz... <span className="text-sky-400">[DONE]</span><br />
                  [transcriptomics] Quantification in progress... <span className="text-amber-400">65%</span><br />
                  [ai-agent] Generating biological hypotheses...
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-sky-500 w-[65%] animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Genômica Avançada"
            desc="Integração nativa com variant calling, alinhamento e pipelines de anotacão genômica."
            icon="🧬"
          />
          <FeatureCard
            title="IA Co-Pilot"
            desc="Um agente inteligente que entende o método científico e ajuda a redigir seus artigos."
            icon="🧠"
          />
          <FeatureCard
            title="Escalabilidade AWS"
            desc="Execute pipelines massivos na nuvem diretamente do seu navegador."
            icon="☁️"
          />
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-sm opacity-40">
        &copy; 2026 CiencIA Platform. Todos os direitos reservados.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="glass p-8 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold font-outfit mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}
