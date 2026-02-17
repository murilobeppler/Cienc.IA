# Prompt de Design Visual - CiencIA Platform

**Use este prompt para gerar referências visuais ou assets para o projeto:**

---

### **Prompt Principal (Conceito Geral)**
> **Role:** Expert UI/UX Designer specializing in Scientific SaaS & Data Visualization.
> **Style:** "Deep Sci-Fi", Premium Futurism, Clean & Academic.
> **Core Aesthetic:** Dark mode dominant (#0f172a), Glassmorphism (translucent panels with blur), Neon accents (Cyber Blue #0ea5e9 & Bio-Emerald #10b981).
> **Typography:** Modern Sans-Serif (Inter for UI, Outfit for Headers, JetBrains Mono for Code).

---

### **Detalhamento por Aba (Funcionalidades & Visual)**

#### **1. Landing Page (A Vitrine)**
> **Visual Goal:** Wow the user immediately. High-tech "Biological Intelligence" vibe.
> **Key Elements:**
> - **Hero Section:** Large, glowing typography "Democratizando a Ciência". Background features a subtle, rotating 3D double-helix DNA strand composed of connecting nodes (constellation effect).
> - **Interactive Terminal:** A floating glass card showing a simulated type-writer effect running a bioinformatics script.
> - **Cards:** Grid of feature cards (Pipeline Generation, 3D Visualization) with hover effects that trigger a "glow" border.
> - **Colors:** Deep slate background, text gradients from white to blue-grey.

#### **2. AI Chat Interface ("The Lab Assistant")**
> **Visual Goal:** Focus and clarity. A sophisticated conversation with a supercomputer.
> **Key Elements:**
> - **Split Layout:** Left side is the chat stream; Right side is the "Thinking/Preview" pane.
> - **Chat Bubbles:**
>   - *User:* Minimalist outline, ghostly white.
>   - *AI:* Solid glass-panel with a very faint active gradient border, suggesting processing power.
> - **Code Blocks:** Dark syntax highlighting (Dracula theme), monospaced font, copy button floating top-right.
> - **Input Area:** Floating bar at the bottom, heavily blurred background, integrating seamlessly with the page.

#### **3. Scientific Visualizer (Aba "Visualizador")**
> **Visual Goal:** Data lucidity. Complex data made beautiful and approachable.
> **Key Elements:**
> - **Dashboard Grid:** Modular layout with draggable panels.
> - **3D Protein Viewer:** Center stage. Interactive molecular structure (ribbons/surfaces) on a transparent background. Controls overlaid as semi-transparent floating pills at the bottom.
> - **Plotly Charts:** Scatter plots and Volcanos with neon data points. Tooltips are high-contrast dark glass.
> - **Search Bar:** Prominent dual-search bar ("RCSB PDB" vs "AlphaFold") with pill-shaped toggles.

#### **4. Projects Hub & IDE (Aba "Projetos")**
> **Visual Goal:** Productivity and Organization.
> **Key Elements:**
> - **Project Cards:** Folder metaphors but modernized as glass tiles. Metadata (date, status) displayed in small, high-contrast badges (e.g., "Running" in pulsing amber).
> - **Pipeline Editor (IDE):**
>   - **Sidebar:** Tree view of files (Nextflow scripts).
>   - **Main Area:** Line-numbered code editor with syntax highlighting.
>   - **Logs Panel:** Collapsible bottom drawer with terminal-green text for execution logs.
> - **Status Indicators:** Traffic light system (Green=Success, Amber=Running, Red=Error) but using glowing dots.

---

### **CSS/Tailwind Guidelines (Para Implementação)**
- **Glass Effect:** `bg-white/5 backdrop-blur-lg border border-white/10`
- **Glow Effect:** `shadow-[0_0_20px_rgba(14,165,233,0.3)]`
- **Gradients:** `bg-gradient-to-br from-slate-900 to-slate-800`
- **Text:** `text-slate-100` (Primary), `text-slate-400` (Secondary)
