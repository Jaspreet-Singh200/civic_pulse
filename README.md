# CivicPulse

**Your City. Your Voice. Your Impact.**

CivicPulse is a civic issue reporting and resolution platform connecting residents with municipal teams. The repository includes a React/Vite client and Express/MongoDB API for citizen reporting and tracking, officer workflows, and administrator tools.

## Architecture and folder structure

```text
civicpulse/
├── client/                         # React + Vite application
│   ├── src/
│   │   ├── assets/                 # Local images and brand assets
│   │   ├── components/             # Shared UI components
│   │   ├── context/                # Auth, theme, and language state
│   │   ├── hooks/                  # Reusable React hooks
│   │   ├── layouts/                # Page shells
│   │   ├── pages/                  # Route-level screens
│   │   ├── services/               # Axios API clients
│   │   ├── utils/                  # Formatting and validation
│   │   ├── App.jsx                 # Routes and app shell
│   │   ├── main.jsx                # Entry point
│   │   └── styles.css              # Tokens, base styles, responsive UI
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                         # Planned Express REST API (Phase 2+)
│   ├── config/                     # MongoDB, CORS, env configuration
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── ai-service/                     # Optional FastAPI services (Phase 7)
├── docs/                           # Architecture and data-flow docs
└── README.md
```

### Planned service boundaries

- **Client:** React, Vite, React Router, Tailwind-compatible design tokens, Axios, Recharts, Leaflet, and Socket.IO client.
- **API:** Node.js/Express REST API with JWT authentication, role middleware, validation, pagination, upload handling, and Socket.IO events.
- **Data:** MongoDB/Mongoose collections for users, complaints, departments, notifications, complaint history, feedback, and upvotes. Complaint coordinates use GeoJSON and a `2dsphere` index.
- **Media and optional services:** Cloudinary for images, OpenStreetMap tiles for maps, email provider integration, and an isolated FastAPI AI service. AI output is advisory and has a fallback when the service is unavailable.

## Run locally

Requirements: Node.js 20+, npm, and MongoDB (local or Atlas).

```bash
# Configure the API
cp server/.env.example server/.env
# Edit server/.env and set a random JWT_SECRET (32+ characters) and MONGODB_URI.

cd server && npm install
npm run seed       # Optional: creates demo accounts and clearly identified sample reports
npm run dev         # API at http://localhost:4000
```

In another terminal:

```bash
cd client
npm install
npm run dev         # Web app at http://localhost:5173
```

`server/.env.example` documents API configuration. The browser client uses `http://localhost:4000/api` by default; set `VITE_API_URL` or `VITE_SOCKET_URL` in `client/.env` to override.

### Demo accounts

After `npm run seed`, use these local demonstration accounts:

| Role | Email | Password |
|---|---|---|
| Citizen | `citizen@civicpulse.local` | `CitizenDemo123!` |
| Officer | `officer@civicpulse.local` | `OfficerDemo123!` |
| Administrator | `admin@civicpulse.local` | `AdminDemo123!` |

The seed command creates a small, labeled example dataset only when the complaint collection is empty. Do not use the demonstration passwords in a deployed environment.

## Implemented workflows

- Citizen registration/login, profile editing, issue reports with up to five validated image uploads, manual coordinates or browser GPS, nearby report lookup, tracking timeline, support votes, reopen and resolution feedback.
- Officer queue limited to assigned reports, with status updates and notes.
- Administrator people/role management, departments, assignment API, status management, database-backed analytics and CSV export.
- Persistent complaint history, notifications and real-time Socket.IO events.
- Leaflet map using OpenStreetMap tiles.

Image files use local storage by default. Configure a MongoDB instance before using any database-backed feature. AI classification, email delivery, Cloudinary storage, OAuth, Hindi translations, and heatmaps are not configured in this build; the report flow remains usable with manual category and severity selection.

See `docs/architecture.md` for the architecture sketch and data model.
