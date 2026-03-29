# 🌌 3D Portfolio - The Kinetic Architect

Welcome to your next-generation 3D portfolio. This project is a production-ready, interactive Next.js application featuring **React Three Fiber**, a **Supabase** backend, and **Resend** for automated recruiter notifications.

This guide is designed for **complete beginners**. If you have never coded before, you can use an **AI IDE like Antigravity or Cursor** to follow these steps and make this portfolio your own.

---

## 🛠 Prerequisites

Before you start, you will need to create accounts on these platforms (all have free tiers):
1.  **[GitHub](https://github.com/)**: To host your code.
2.  **[Supabase](https://supabase.com/)**: For your database and file storage.
3.  **[Vercel](https://vercel.com/)**: To deploy your website to the world.
4.  **[Resend](https://resend.com/)**: To receive emails when someone contacts you.

---

## 🚀 Step 1: Repository Setup

1.  **Create a GitHub Account**: Sign up at [github.com](https://github.com/).
2.  **Create a New Repository**: Click the **+** icon (top right) -> **New repository**.
    - Name it `my-3d-portfolio`.
    - Set it to **Public** or **Private** (Vercel can connect to either).
3.  **Clone this Blueprint**:
    - If you are using **Antigravity** or **Cursor**, open the IDE and use the terminal (Ctrl + `) to run:
      ```bash
      git clone <your-repo-url>
      ```
    - Or simply download the project zip and extract it into your folder.

---

## 🤖 Step 2: Use an AI IDE (Antigravity/Cursor)

To make customization easy, we recommend using an AI-powered IDE:
1.  Open your project folder in **Antigravity** or **Cursor**.
2.  You can talk to the AI assistant to ask "How do I change the color of the 3D model?" or "Add a new project to the list."
3.  The AI will help you run commands and edit files automatically.

---

## 🗄️ Step 3: Supabase Configuration

Supabase is your "brain." It stores your projects, messages, and resume.

### 1. Create a Project
- Go to the [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
- Save your **Project URL** and **API Keys** (found in Project Settings -> API).

### 2. Run SQL Snippets
Go to the **SQL Editor** in your Supabase dashboard and run these commands to create your tables:

```sql
-- 1. Create Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  impact TEXT,
  source_url TEXT,
  project_url TEXT,
  accent_color TEXT DEFAULT '#00E5FF',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Contact Messages Table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Resumes Table
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create RPC Function for Resumes
-- This allows the admin panel to toggle the active resume.
CREATE OR REPLACE FUNCTION set_active_resume(new_resume_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resumes SET is_active = false WHERE is_active = true;
  UPDATE resumes SET is_active = true WHERE id = new_resume_id;
END;
$$ LANGUAGE plpgsql;
```

### 3. Setup Storage for Resumes
- In Supabase, go to **Storage**.
- Create a new bucket named `resumes`.
- **Public access**: Enable this so anyone with the link can view your resume.
- **Policies**: Allow `INSERT` and `SELECT` for authenticated users (Admin).

### 4. Create an Admin User
- Go to **Authentication** -> **Users** -> **Add User** -> **Create new user**.
- Use this email/password to log in to your admin dashboard at `/admin/login`.

---

## 📧 Step 4: Resend Setup (Email Notifications)

1.  Sign up at [Resend.com](https://resend.com/).
2.  Go to **API Keys** and create a new key.
3.  **Email Configuration**:
    - By default, the system uses `onboarding@resend.dev`.
    - **Recipient**: Open `src/lib/email.ts` and update the `to` field with your own email address (where you want to receive recruiter messages).
    - If you have a custom domain, verify it in the "Domains" tab to use your own sender email.

---

## 🔑 Step 5: Environment Variables

Create a file named `.env.local` in your project root and paste your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_api_key
GITHUB_PERSONAL_ACCESS_TOKEN=your-github-token
```

> [!WARNING]
> Your `SUPABASE_SERVICE_ROLE_KEY` is powerful—keep it secret. The `.env.local` file is automatically ignored by GitHub for security.

---

## 🚀 Step 6: Local Development & Deployment

### Run Locally
1.  Open your IDE terminal.
2.  Run `npm install --legacy-peer-deps`.
3.  Run `npm run dev`.
4.  Visit `http://localhost:3000`!

### Deploy to production
1.  **Commit & Push**: Push your changes to GitHub.
2.  **Vercel Connect**:
    - Go to [Vercel](https://vercel.com/) and click **Add New** -> **Project**.
    - Connect your GitHub repo.
3.  **Environment Variables**:
    - During setup, copy and paste all the keys from Step 5 into Vercel's "Environment Variables" section.
4.  **Deploy**: Click **Deploy** and your portfolio is live!

---

## ✨ Customization Guide

### 🧍 3D Character Model (GLB)

The hero section renders a custom 3D character using **React Three Fiber** and `@react-three/drei`. The model file lives at:

```
public/models/Untitled.glb
```

#### Replacing the Character
1. Create or download a 3D character (e.g., from [Ready Player Me](https://readyplayer.me/) or [Mixamo](https://www.mixamo.com/)).
2. Open it in **Blender** to adjust pose, skin tone, or accessories.
3. Export as `.glb` (**File → Export → glTF 2.0**, format: **GLB**).
4. Replace `public/models/Untitled.glb` with your new file (keep the same filename, or update the path in `src/components/3d/HeroCanvas.tsx`).

#### Tweaking Scale, Position & Rotation

All values are in `src/components/3d/HeroCanvas.tsx` inside the `Character` component:

| Constant | What it does | Example |
|---|---|---|
| `SCALE` | Overall size of the character | `0.7` (current), increase to zoom in |
| `POSITION_Y` | Vertical placement (negative = lower) | `-8` (current) |
| `ROTATION_X` | Tilt forward/backward (degrees) | `10` = slight forward tilt |
| `ROTATION_Y` | Turn left/right (degrees) | `-45` = facing right |

#### Desktop vs Mobile Rendering

- **Desktop (`md+`)**: Full interactive canvas with `OrbitControls` (zoom & rotate). Rendered in a dedicated viewport column beside the text.
- **Mobile**: A small, **non-interactive** mini canvas (`MobileHeroCanvas`) is rendered beside the name. It uses `pointer-events: none` so scrolling is never blocked by the 3D viewport.

Both components are exported from `src/components/3d/HeroCanvas.tsx`.

---

### 🎨 Colors & Theme
- Change the `accent_color` in your Supabase `projects` table; the site's glows will update automatically.
- Global theme tokens (primary, background, surface colors) are in `src/app/globals.css`.

### 📬 Manage Data
- Visit `your-site.com/admin/login` to read messages, delete spam, and upload a new resume.

---
Built with ❤️ by [Meet Upadhyay](https://github.com/meet-m-upadhyay)
