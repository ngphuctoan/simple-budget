# Simple Budget

A (very) simple budget app to manage what you spend!

> [!NOTE]
> This app is meant to be used in local machine (*i.e.* a "desktop" app) and is only available for a single user. **Do NOT host this app!**

## To-do List

- [ ] Better `<Suspense />` boundary + loading state
- [ ] Settings and About dialogs

## Development

What you will need:

1. Node.js v22.0+ (v24.0+ recommended)
2. Deno v2.0+ (v2.6+ recommended)

Install all packages:

```bash
deno install
```

Set `DATABASE_URL` in `.env`:

```bash
# .env
DATABASE_URL=file:data/budgets.db # You can rename the file!
```

Apply schema to DB:

```bash
deno run -A npm:drizzle-kit@latest push
```

Run the app:

```bash
deno task dev
```
