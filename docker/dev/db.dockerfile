# ---------------------
# 1. Base deps layer
# ---------------------
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm


# ---------------------
# 2. Dependencies
# ---------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/web/package.json apps/web/
COPY packages/db/package.json packages/db/
RUN pnpm install --frozen-lockfile


# ---------------------
# 3. Build (Next.js + Prisma)
# ---------------------
FROM deps AS build
COPY . .
# Generate Prisma client
RUN pnpm turbo run db:generate
# Build Next.js app
RUN pnpm turbo run build --filter=web...


# ---------------------
# 4. Runtime image
# ---------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy build output
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/package.json ./apps/web/
COPY --from=build /app/packages/db ./packages/db
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose Next.js port
EXPOSE 3000

# Default command (overridden in docker-compose for migrations)
CMD ["pnpm", "next", "start", "--dir", "apps/web"]
