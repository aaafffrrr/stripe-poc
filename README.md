This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Required Stripe configuration

In order to use this demo app, you should have:

- A Stripe account.
- The feature Stripe Connect enabled.
- Create a Stripe Connect account. It represents the store that will collect payments with the terminal. Save the ID as env var.
- Add a location to the Stripe Connect account.
- Add a terminal reader to the location. Save the ID as env var.

## Required env file (.env.local)

```.env
DATABASE_URL="file./database/dev.db" # local development w/ SQL Lite
DEVELOPER_EMAIL=name@email.com # To receive Stripe receipt (live mode only I guess)
STRIPE_SECRET_KEY=sk_test_123456789 # Add your Stripe developer key
NEXT_PUBLIC_STRIPE_TERMINAL_READER_ID=tmr_123456789 # Add the ID of the stripe terminal reader
NEXT_PUBLIC_STRIPE_CONNECT_ACCOUNT_ID=acct_123456789 # Add the ID of the stripe connect account (the store)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
