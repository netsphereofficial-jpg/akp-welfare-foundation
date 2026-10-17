# AKP Welfare Foundation website

Website for AKP Welfare Foundation, with online donations and a small admin panel. Next.js 14 (App Router), Tailwind CSS and MongoDB.

## Features

- Pages: home, about, programs, donate, volunteer, contact
- Donations through Razorpay, with server-side order creation and payment verification (`src/app/api/donate/`)
- Volunteer and contact forms
- Admin panel for donations, donors, programs, the gallery and page content
- Site copy kept in `content/content.json`

## Develop

```bash
cp .env.local.example .env.local   # add the MongoDB and Razorpay keys
npm install
npm run dev
```

Production build: `npm run build && npm start`.

---

Built by [Netsphere Tech](https://netsphereglobal.com).
