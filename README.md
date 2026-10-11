# PKL Management

Sistem informasi pengelolaan Praktik Kerja Lapangan (PKL)
berbasis web untuk SMKN 6 Makassar.

## Architecture

- Frontend: SvelteKit with Static Site Generation (SSG)
- Backend: Bun + Hono
- Architecture: Modular Monolith
- Backend modules: Layered Architecture
- ORM: Drizzle ORM
- Database: SQLite
- Monorepo: Bun Workspaces
- Package linking: Isolated linker
- Containers: Podman

## Project Structure

- apps/web: SvelteKit frontend
- apps/api: Bun + Hono backend
- packages/contracts: Shared API contracts
- infra: Container and deployment configuration

## Status

Project initialization.
