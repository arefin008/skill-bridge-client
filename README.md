# 🎓 SkillBridge

**Bridging the gap between expert tutors and eager learners.**

SkillBridge is a modern, high-performance tutor marketplace built for the next generation of online education. It features a robust role-based dashboard system, seamless authentication, and a professional interface for discovering and managing educational sessions.

![SkillBridge Landing Page](https://skill-bridge-client-mu.vercel.app/og-image.png) *(Placeholder if you have an image)*

[Live URL of Fullstack Project](https://skill-bridge-client-mu.vercel.app/)

---

## 🚀 Key Features

### 👥 Role-Based Dashboards
- **Students**: Manage bookings, track learning progress, and leave detailed reviews for tutors.
- **Tutors**: Build a professional profile, set availability, manage upcoming sessions, and preview their public footprint.
- **Admins**: Full control over user management, platform statistics, and category curation.

### 🛡️ Advanced Authentication
- **Secure Sessions**: Powered by `better-auth` with cross-domain cookie persistence fixes.
- **Social Login**: Integrated Google OAuth for friction-less onboarding.
- **Email Verification**: Professional automated emails using high-contrast branding.

### 🍱 Professional UI/UX
- **Dynamic Stats**: Real-time platform statistics on the landing page.
- **Filterable Search**: Debounced tutor discovery based on ratings and expertise.
- **Responsive Design**: Built with Tailwind CSS and shadcn/ui for a premium, mobile-first experience.

---

## 🛠️ Built With

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Runtime**: [Experimental Edge Proxy](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- **Authentication**: [Better-Auth](https://www.better-auth.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Form Management**: [@tanstack/react-form](https://tanstack.com/form) + Zod

---

## ⚙️ Getting Started

### 1. Prerequisite
Ensure you have the backend API running. You can find the backend repository at [skill-bridge](https://github.com/arefin008/skill-bridge-application).

### 2. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### 3. Installation & Run
```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

---

## 🌐 Deployment

This project is optimized for **Vercel**. 

### Critical Vercel Configuration
To ensure session persistence across domains, you MUST configure the following Environment Variables in your Vercel Dashboard:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Your frontend production URL |
| `NEXT_PUBLIC_API_URL` | Your backend production API URL |

*Note: The project uses a `proxy.ts` convention (Next.js 16) for routing protection.*

---

## 📄 License
This project is licensed under the MIT License.

---

**Developed with ❤️ by [Arefin Rounok](https://github.com/arefin008)**
