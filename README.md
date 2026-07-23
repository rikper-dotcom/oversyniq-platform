# Oversyniq Platform

Oversyniq is a modular Operational Intelligence Platform designed for industrial, offshore and field service organizations.

## Repository Structure

```
apps/
    app/        Main SaaS application
    web/        Marketing website

backend/
    pocketbase/
    migrations/
    hooks/

packages/
    ui/
    types/
    utils/
    config/
    api-client/

infra/
    cloudflare/
    docker/
    nginx/
    scripts/

docs/
```

## Technology Stack

- React
- TypeScript
- Vite
- PocketBase
- Tailwind CSS
- Docker
- Cloudflare
- GitHub Actions

## Deployment

```bash
./infra/scripts/deploy.sh
```

## License

MIT
