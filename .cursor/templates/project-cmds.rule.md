# Project Commands Rule Template

> Copy this template to `.cursor/rules/project-cmds.mdc` and customize for your project.

## Common Commands

These are the commands the AI agent should use when working on this project.

### Build

```bash
# Development build
npm run build:dev

# Production build
npm run build
```

### Test

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- path/to/test.ts

# Run with coverage
npm run test:coverage
```

### Run

```bash
# Development server
npm run dev

# Production server
npm start
```

### Lint

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format
```

### Type Check

```bash
# TypeScript type checking
npm run typecheck
```

## Language-Specific Examples

### JavaScript/TypeScript (npm)
```bash
npm install           # Install dependencies
npm run build         # Build
npm test              # Test
npm start             # Run
npm run lint          # Lint
```

### Python (pip/poetry)
```bash
pip install -r requirements.txt   # Install
python -m pytest                  # Test
python main.py                    # Run
ruff check .                      # Lint
```

### Rust (cargo)
```bash
cargo build           # Build
cargo test            # Test
cargo run             # Run
cargo clippy          # Lint
```

### Go
```bash
go build ./...        # Build
go test ./...         # Test
go run main.go        # Run
golangci-lint run     # Lint
```

## Environment

### Required Environment Variables
```bash
DATABASE_URL=         # Database connection
API_KEY=              # External API key
NODE_ENV=             # development | production
```

### Setup Steps
1. Copy `.env.example` to `.env`
2. Fill in required values
3. Run `npm install`
4. Run `npm run dev`

## Docker

```bash
# Build image
docker build -t myapp .

# Run container
docker run -p 3000:3000 myapp

# Docker Compose
docker-compose up -d
```

## Database

```bash
# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Reset database
npm run db:reset
```

## Deployment

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## Usage

The `/quick-start` command will:
1. Detect your package manager and scripts
2. Read `package.json`, `Makefile`, or equivalent
3. Extract available commands
4. Merge with this template
5. Update `project.mdc` with the result

The agent uses these commands for:
- Running tests after code changes
- Running linters to check style
- Building to verify compilation
- Running the app for manual testing
