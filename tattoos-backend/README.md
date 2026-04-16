# 🖋️ House of Tattoos - Backend Service

This is the backend service for **House of Tattoos**, responsible for handling appointment booking requests and sending email notifications using Nodemailer.

## 🚀 Features

- **Booking Management**: Handles appointment requests via a secure POST endpoint.
- **Email Notifications**: Automatically notifies the studio about new booking inquiries.
- **CORS Support**: Configured to accept requests from authorized frontend origins.
- **Health Checks**: Simple endpoint to monitor server status.

---

## 🛠️ Prerequisites

- **Node.js** (v18.x or later recommended)
- **Gmail Account**: Required for sending booking emails (see [SMTP Setup](#smtp-setup) for details).

---

## ⚙️ Environment Setup

1. Create a `.env` file in the root of the `tattoos-backend` directory.
2. Add the following environment variables:

```env
PORT=5000
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
BOOKING_RECIPIENT=studio-email@gmail.com
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
```

### 📧 SMTP Setup (Google)
To use Gmail for sending emails, you must:
1. Enable **2-Factor Authentication** on your Google Account.
2. Generate an **App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security).
   - Search for "App Passwords".
   - Create a new app password for "Other" or "Mail".
   - copy the 16-character code into `GMAIL_PASS` in your `.env`.

---

## 🏃 Running the Server

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm install
npm start
```

---

## 📅 Booking an Appointment

To book an appointment, the frontend sends a `POST` request to the booking endpoint.

### API Endpoint
`POST /api/book-session`

### Request Header
`Content-Type: application/json`

### JSON Parameters

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name of the client |
| `email` | String | Client's email address |
| `phone` | String | Client's phone number |
| `tattooIdea` | String | Description of the tattoo request |
| `dateTime` | String | Preferred date and time |

### Example Request (cURL)

```bash
curl -X POST http://localhost:5000/api/book-session \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "123-456-7890",
  "tattooIdea": "A detailed lion head on the shoulder with realistic shading.",
  "dateTime": "Next Monday at 4:30 PM"
}'
```

### Expected Response

**Success (200 OK)**
```json
{
  "message": "Booking request sent successfully!"
}
```

**Error (400 Bad Request)**
```json
{
  "message": "All booking fields are required."
}
```

---

## 🏥 Health Monitoring

You can check if the server is alive by visiting:
`GET /api/health`

**Response:**
```json
{
  "status": "ok"
}
```

---

## 📝 License
This project is licensed under the ISC License.
