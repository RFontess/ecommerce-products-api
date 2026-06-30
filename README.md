# ecommerce-products-api

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

API REST para gestão de catálogo de produtos de e-commerce. Construída com arquitetura em camadas, autenticação JWT e multi-tenancy — cada loja acessa apenas seus próprios dados.

**Produção:** `https://ecommerce-products-api-production.up.railway.app`

---

## Stack

| | |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Linguagem | TypeScript |
| ORM | Prisma 7 |
| Banco de dados | PostgreSQL (Supabase) |
| Validação | Zod 4 |
| Autenticação | JWT + bcrypt |
| Deploy | Railway |

---

## Arquitetura

Separação em camadas: **Route → Middleware → Controller → Service → Repository**

```
src/
├── middlewares/       # auth (JWT), validate (Zod), error (centralizado)
├── schemas/           # Zod schemas por entidade
├── repositories/      # Acesso ao banco via Prisma (sem lógica de negócio)
├── services/          # Regras de negócio (sem req/res)
├── controllers/       # Extrai req, chama service, responde com res
└── routes/            # URLs, verbos HTTP e middlewares por recurso
```

## Modelo de dados

```
Store       → tem products[] e categories[]
Category    → pertence a uma Store, tem products[]
Product     → pertence a uma Store, opcionalmente a uma Category
              soft delete via campo available (false = deletado)
              unicidade: (sku + storeId)
```

## Decisões de arquitetura

- **Multi-tenancy**: antes de qualquer escrita, o service verifica se o `storeId` do recurso bate com o do token JWT — retorna 403 se não bater. O controller nunca confia no `storeId` enviado pelo cliente.
- **Catálogo público**: `GET` de products e categories é aberto. Operações de escrita exigem autenticação.
- **Soft delete**: produtos deletados têm `available: false` — não aparecem em listagens, mas permanecem no banco.
- **JWT preparado para evolução**: o payload carrega `{ storeId }`. Quando um model `User` for adicionado, o payload passará a `{ userId, storeId }` sem precisar alterar middleware ou rotas.

---

## Endpoints

### Autenticação — público

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Registra uma loja |
| POST | `/auth/login` | Retorna o token JWT |

**Register / Login body:**
```json
{ "name": "Minha Loja", "email": "loja@email.com", "password": "senha123" }
```

O token retornado pelo login deve ser enviado no header das rotas protegidas:
```
Authorization: Bearer <token>
```

---

### Lojas — `/stores`

| Método | Rota | Auth |
|---|---|---|
| GET | `/stores` | Não |
| GET | `/stores/:id` | Não |
| POST | `/stores` | Sim |
| PUT | `/stores/:id` | Sim |
| DELETE | `/stores/:id` | Sim |

---

### Categorias — `/stores/:storeId/categories`

| Método | Rota | Auth |
|---|---|---|
| GET | `/stores/:storeId/categories` | Não |
| GET | `/stores/:storeId/categories/:id` | Não |
| POST | `/stores/:storeId/categories` | Sim |
| PUT | `/stores/:storeId/categories/:id` | Sim |
| DELETE | `/stores/:storeId/categories/:id` | Sim |

**Body:**
```json
{ "name": "Eletrônicos" }
```

---

### Produtos — `/stores/:storeId/products`

| Método | Rota | Auth |
|---|---|---|
| GET | `/stores/:storeId/products` | Não |
| GET | `/stores/:storeId/products/:id` | Não |
| POST | `/stores/:storeId/products` | Sim |
| PUT | `/stores/:storeId/products/:id` | Sim |
| DELETE | `/stores/:storeId/products/:id` | Sim |

**Body para criação (campos opcionais no PUT):**
```json
{
  "sku": "CAM-001",
  "name": "Camiseta Preta",
  "price": 99.90,
  "stock": 50,
  "description": "100% algodão",
  "costPrice": 40.00,
  "categoryId": "uuid"
}
```

#### Filtros e paginação — `GET /stores/:storeId/products`

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `page` | number | `1` | Página atual |
| `limit` | number | `10` | Itens por página (máx. 100) |
| `sortBy` | string | `dateCreated` | `price`, `name`, `dateCreated`, `stock` |
| `order` | string | `desc` | `asc` ou `desc` |
| `name` | string | — | Busca parcial, case-insensitive |
| `categoryId` | uuid | — | Filtra por categoria |
| `minPrice` | number | — | Preço mínimo |
| `maxPrice` | number | — | Preço máximo |

**Resposta:**
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

## Erros

Todas as respostas de erro seguem o formato:
```json
{ "success": false, "message": "Descrição do erro" }
```

| Status | Quando |
|---|---|
| `400` | Validação Zod falhou |
| `401` | Token ausente ou inválido |
| `403` | Autenticado, mas sem permissão sobre o recurso |
| `404` | Recurso não encontrado |
| `500` | Erro interno |

---

## Rodando localmente

**Pré-requisitos:** Node.js 18+, PostgreSQL

```bash
git clone https://github.com/RFontess/ecommerce-products-api.git
cd ecommerce-products-api
npm install
```

Crie um arquivo `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@host:5432/banco"
JWT_SECRET="sua-chave-secreta"
PORT=3000  # opcional, padrão 3000
```

```bash
npx prisma generate
npx prisma db push
npm run dev
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Desenvolvimento com ts-node |
| `npm run build` | Compila TypeScript para dist/ |
| `npm start` | Inicia o servidor compilado |

---

**Autor:** [Rafael Fontes](https://github.com/RFontess)
