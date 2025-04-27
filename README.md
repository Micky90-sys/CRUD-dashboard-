# PayMERN - Secure Payment Gateway Integration

A robust, type-safe payment processing system built with the MERN stack (MongoDB/Supabase, Express, React, Node.js) that provides secure payment processing capabilities through a modern, component-based architecture.

## Features

- 🔒 Secure payment processing with Supabase Edge Functions
- 💳 Type-safe payment validation
- 🔐 Row Level Security for payment data
- 📊 Payment history tracking
- 🎨 Modern UI components with Tailwind CSS
- 📱 Responsive design
- ⚡ Real-time payment status updates

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Supabase Edge Functions
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Zod
- **Authentication**: Supabase Auth

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Payment Integration

### Using the PaymentForm Component

```tsx
import PaymentForm from './components/PaymentForm';

function CheckoutPage() {
  return (
    <PaymentForm
      amount={1000} // Amount in cents
      currency="usd"
      onSuccess={(payment) => {
        console.log('Payment successful:', payment);
      }}
      onError={(error) => {
        console.error('Payment failed:', error);
      }}
    />
  );
}
```

### Database Schema

The payment data is stored in a `payments` table with the following structure:

- `id`: UUID (Primary Key)
- `user_id`: UUID (References auth.users)
- `amount`: Integer (in cents)
- `currency`: Text
- `status`: Text
- `payment_intent_id`: Text
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Security Features

- Row Level Security (RLS) ensures users can only access their own payment data
- Type-safe validation using Zod
- Secure payment processing through Edge Functions
- Environment variable protection
- CORS headers configuration
- Authentication required for payment processing

## API Documentation

### Process Payment Endpoint

```typescript
POST /functions/v1/process-payment

Headers:
  Authorization: Bearer <access_token>
  Content-Type: application/json

Body:
{
  "amount": number,    // Amount in cents
  "currency": string,  // 3-letter currency code
  "description": string
}

Response:
{
  "id": string,
  "user_id": string,
  "amount": number,
  "currency": string,
  "status": string,
  "payment_intent_id": string,
  "created_at": string,
  "updated_at": string
}
```

## Development

### Project Structure

```
├── src/
│   ├── components/
│   │   ├── PaymentForm.tsx
│   │   └── Button.tsx
│   ├── lib/
│   │   └── supabase.ts
│   └── main.tsx
├── supabase/
│   ├── functions/
│   │   └── process-payment/
│   │       └── index.ts
│   └── migrations/
│       └── create_payments_table.sql
└── package.json
```

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@paymern.com or open an issue in the repository.
