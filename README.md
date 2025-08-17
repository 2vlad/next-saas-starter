# Next.js SaaS Starter Template

A production-ready SaaS starter template built with Next.js 15, featuring authentication, payments, and a modern tech stack.

## Features

### Core Functionality
- **Authentication**: NextAuth v5 with multiple providers
  - Magic link email authentication
  - Google OAuth integration
  - Session management with Supabase adapter
- **Payment Processing**: Stripe integration
  - Subscription plans (Free, Basic, Pro)
  - Customer portal for subscription management
  - Webhook handling for payment events
  - Refund capabilities
- **Database**: Supabase PostgreSQL
  - Type-safe database queries
  - Real-time capabilities ready
  - Row-level security support
- **Email System**: 
  - React Email templates
  - Nodemailer integration
  - Beautiful verification emails

### Technical Stack
- **Framework**: Next.js 15.1.7 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Custom component library
- **Authentication**: NextAuth 5.0 (beta)
- **Database**: Supabase
- **Payments**: Stripe 17.6
- **Email**: React Email + Nodemailer
- **Analytics**: OpenPanel ready
- **Development**: Turbopack for fast builds

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/pnpm/yarn
- Supabase account
- Stripe account
- Email provider (Gmail/SMTP)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd next-saas-starter-main
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
SUPABASE_JWT_SECRET=your_jwt_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email (Example for Gmail)
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_FROM=noreply@yourdomain.com

# Google OAuth (optional)
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# NextAuth
AUTH_SECRET=your_auth_secret_key
```

5. Set up Supabase:
   - Create a new Supabase project
   - Run the database migrations (if provided)
   - Enable Row Level Security on your tables

6. Configure Stripe:
   - Create products and price IDs in Stripe Dashboard
   - Update the price IDs in `config.ts`
   - Set up webhook endpoint in Stripe Dashboard pointing to `/api/webhook/stripe`

7. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── (payment)/    # Payment endpoints
│   │   └── webhook/      # Webhook handlers
│   ├── app/              # Protected app routes
│   │   ├── notes/       # Notes feature
│   │   └── profile/     # User profile
│   └── page.tsx         # Landing page
├── components/            # React components
│   ├── app/             # App-specific components
│   ├── email/           # Email templates
│   ├── stripe/          # Stripe components
│   └── ui/              # UI components
├── lib/                   # Utility functions
│   ├── auth.ts          # Auth configuration
│   └── hooks/           # Custom React hooks
├── utils/                 # Helper utilities
│   ├── stripe.ts        # Stripe client
│   └── supabase/        # Supabase clients
├── types/                 # TypeScript definitions
└── config.ts             # App configuration
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:ts      # TypeScript type checking

# Stripe Development
npm run stripe:listen # Listen to Stripe webhooks locally

# Email Development
npm run email        # Start email template development server
```

## Configuration

### Customizing the App

1. **Update Metadata**: Edit `config.ts` to change app name, description, and metadata
2. **Theme Colors**: Modify theme colors in `config.ts`
3. **Pricing Plans**: Update Stripe configuration in `config.ts`
4. **Social Links**: Add your social media links in `config.ts`

### Stripe Setup

1. Create products in Stripe Dashboard
2. Copy price IDs for monthly and yearly billing
3. Update price IDs in `config.ts`:
```typescript
stripe: {
  basic: {
    monthPriceId: 'price_xxx',
    yearPriceId: 'price_xxx',
    productId: 'prod_xxx',
    // ...
  }
}
```

### Database Schema

The template uses Supabase with the following key tables:
- Users (managed by NextAuth)
- Notes (example feature)
- Subscriptions (Stripe integration)

## Features Implementation

### Authentication Flow
1. User signs in via email magic link or Google OAuth
2. NextAuth creates/updates user in Supabase
3. Session is managed with JWT tokens
4. Protected routes check authentication status

### Payment Flow
1. User selects a subscription plan
2. Redirected to Stripe Checkout
3. Webhook updates subscription status
4. User can manage subscription via Customer Portal

### Adding New Features
1. Create new route in `app/app/`
2. Add components in `components/app/`
3. Create server actions in route folder
4. Update navigation in `Header.tsx`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Ensure Node.js 18+ support
- Set up environment variables
- Configure build command: `npm run build`
- Start command: `npm run start`

## Security Considerations

- Always use environment variables for sensitive data
- Enable Row Level Security in Supabase
- Validate and sanitize user inputs
- Use HTTPS in production
- Implement rate limiting for API routes
- Regular security updates for dependencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Contact support team

## Roadmap

- [ ] Add comprehensive testing suite
- [ ] Implement error boundaries
- [ ] Add rate limiting middleware
- [ ] Environment variable validation
- [ ] Enhanced SEO tools
- [ ] CI/CD pipeline setup
- [ ] Docker support
- [ ] Internationalization (i18n)
- [ ] Dark mode implementation
- [ ] Advanced logging and monitoring
- [ ] More payment providers
- [ ] Multi-tenancy support

## Acknowledgments

Built with modern web technologies and best practices for rapid SaaS development.