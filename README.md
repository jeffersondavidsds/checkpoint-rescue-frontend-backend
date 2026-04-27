# 🌊 Checkpoint Rescue - Frontend

## ✅ Status da Integração

### Arquivos Mantidos (Estilo Verde Original)
- ✅ App.jsx
- ✅ main.jsx
- ✅ Header.jsx + Header.scss + Header.css
- ✅ AuthContext.jsx
- ✅ api.js
- ✅ global.scss + global.css
- ✅ Login.jsx
- ✅ Registro.jsx
- ✅ Auth.scss (criado baseado no estilo)
- ✅ Logo (logocheck.png como logo.png)

### Arquivos Adicionados (Segurança)
- ✅ .gitignore - Protege dados sensíveis
- ✅ .env.example - Template de variáveis de ambiente

### Aguardando
- ⏳ Home.jsx (src/pages/home/)
- ⏳ Dashboard.jsx (src/pages/dashboard/)
- ⏳ Mapa.jsx (src/pages/mapa/)
- ⏳ Sobre.jsx (src/pages/sobre/)

---

## 🔗 Integração com Backend

Backend já configurado em `src/services/api.js`:
```
https://checkpoint-rescue.onrender.com/
```

### Endpoints Disponíveis:
- ✅ `/auth/registro` - Criar conta
- ✅ `/auth/login` - Login
- ✅ `/auth/verificar` - Verificar token
- ✅ `/solicitacoes/*` - CRUD de solicitações
- ✅ `/voluntarios/*` - Gerenciar voluntários
- ✅ `/abrigos/*` - Gerenciar abrigos
- ✅ `/mapa/*` - Localizações
- ✅ `/doacoes/*` - Doações

---

## ⚡ Como Usar (quando tiver todas as páginas)

### 1. Configurar
```bash
cp .env.example .env
```

### 2. Instalar
```bash
npm install
```

### 3. Executar
```bash
npm run dev
```

---

## 🔒 Segurança

- ✅ `.gitignore` protege `.env` e dados sensíveis
- ✅ Token JWT gerenciado automaticamente
- ✅ Interceptors para erros 401
- ✅ **NUNCA** fazer commit do `.env`

---

## 📁 Estrutura Atual

```
src/
├── components/
│   ├── Header.jsx
│   ├── Header.scss
│   └── Header.css
├── context/
│   └── AuthContext.jsx
├── services/
│   └── api.js
├── styles/
│   ├── global.scss
│   └── global.css
└── pages/
    ├── auth/
    │   ├── Login.jsx (em /login/)
    │   ├── Registro.jsx (em /registro/)
    │   └── Auth.scss
    ├── home/ (aguardando)
    ├── dashboard/ (aguardando)
    ├── mapa/ (aguardando)
    └── sobre/ (aguardando)
```

---

**🌊 Mantendo 100% do seu estilo verde original! 🆘**

Aguardando os arquivos das páginas restantes para completar a integração.
