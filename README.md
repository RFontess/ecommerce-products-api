# 📦 E-commerce Products API

![Status](https://img.shields.io/badge/Status-WIP%20(Work%20In%20Progress)-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> Uma API RESTful robusta para gestão de catálogo de produtos, focada em performance, escalabilidade e boas práticas de engenharia de software.

## 🎯 Sobre o Projeto

Inspirado na minha vivência diária com desenvolvimento de sistemas ERP e nos desafios de grandes plataformas como a Tray Commerce, este projeto recria o core de uma API de catálogo de produtos. Mais do que um laboratório técnico no ecossistema Node.js com TypeScript, o sistema foi desenhado para resolver dores reais do varejo digital — como gestão de SKUs, isolamento de dados por loja (multi-tenancy) e relacionamentos complexos.

Para ir além de um "CRUD de tutorial", o projeto aplica padrões rigorosos de engenharia de software através de uma sólida Arquitetura em Camadas (Route → Controller → Service → Repository). Com essa separação clara de responsabilidades, a aplicação garante tipagem estrita, validações rigorosas na entrada de dados e uma modelagem relacional estruturada, resultando em uma API resiliente e preparada para integrações seguras.

## 🚀 Tecnologias e Stack

- **Plataforma & Linguagem:** Node.js com TypeScript
- **Framework Web:** Express.js
- **Banco de Dados & ORM:** PostgreSQL + Prisma ORM
- **Validação e Schemas:** Zod
- **Segurança:** Autenticação via JWT

## 🗺️ Roadmap de Desenvolvimento (WIP)

O projeto foi estruturado em um ciclo de 6 fases de desenvolvimento, focando em entregas progressivas e arquitetura limpa:

- [ ] **Fase 1: Core & Setup** — Configuração do ecossistema Node.js + TypeScript, Express e rota de health check.
- [ ] **Fase 2: Modelagem Relacional** — Configuração do PostgreSQL via Supabase e modelagem do schema (Product, Category, Store) usando Prisma ORM.
- [ ] **Fase 3: Regras de Negócio & Validação** — Implementação do CRUD, validação de dados estrita com Zod e middleware global de tratamento de erros.
- [ ] **Fase 4: Autenticação & Segurança** — Implementação de JWT para registro/login e proteção de rotas com isolamento de dados por loja (`storeId`).
- [ ] **Fase 5: Otimização de API** — Adição de paginação, filtros combinados (categoria, status, busca textual) e padronização das respostas.
- [ ] **Fase 6: Deploy & Documentação** — Publicação da API no Railway e finalização da documentação técnica.

## ⚙️ Como executar localmente

*(Instruções serão adicionadas em breve).*

---
📝 **Licença:** MIT
