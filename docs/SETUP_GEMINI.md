# 🔑 Configuração da API Gemini

Para usar a funcionalidade de geração de pipelines com IA, você precisa de uma chave da API do Google Gemini.

## 1. Obter a API Key

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

## 2. Configurar no Backend

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```

2. Crie um arquivo `.env` (copie do `.env.example`):
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   
   # Linux/Mac
   cp .env.example .env
   ```

3. Abra o arquivo `.env` e cole sua API key:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   ```

## 3. Instalar Novas Dependências

Com o ambiente virtual ativado:

```bash
pip install -r requirements.txt
```

## 4. Reiniciar o Backend

Se o backend já estiver rodando, reinicie-o para carregar as novas variáveis:

```bash
# Pare o servidor (Ctrl+C) e rode novamente:
uvicorn main:app --reload
```

## 5. Testar

1. Acesse http://localhost:3000
2. Clique em "Abrir App"
3. Descreva um experimento, por exemplo:
   > "Criar um pipeline de RNA-seq para análise de expressão diferencial"
4. Clique em "⚡ Gerar Pipeline Nextflow"

✅ Se tudo estiver correto, você verá o código Nextflow gerado no painel direito!
