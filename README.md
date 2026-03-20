# FitGuru Gym Landing Page

A modern, interactive gym and fitness landing page built with Next.js, TypeScript, and Tailwind CSS.

This project includes a full marketing experience (hero, classes, trainers, pricing, testimonials) plus user-facing features like authentication, BMI/BMR calculation with history, and review submission.

## Demo

- Frontend: add your deployed URL here
- Backend API used by this app: https://gym-backend-zbz2.onrender.com

## Features

- Responsive landing page optimized for desktop and mobile.
- Smooth section navigation (Home, About, Services, Contact).
- Auth modal for sign up and log in.
- Auth state persistence using localStorage.
- BMI and BMR calculator with:
	- auto unit handling for height input (cm or feet)
	- activity-factor based BMR adjustment
	- saved BMI history per logged-in user
- Testimonial carousel with autoplay and manual controls.
- Logged-in users can submit reviews.
- Scroll animations with AOS.
- Custom loader and modern component-based layout.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19, Tailwind CSS 4
- Animations: AOS
- Icons: lucide-react
- Carousel/slider support: Swiper

## Project Structure

```text
src/
	app/
		components/
			Navbar.tsx
			Hero.tsx
			Stats.tsx
			WhyChooseUs.tsx
			Coaches.tsx
			Trainers.tsx
			FeaturedClasses.tsx
			BMICalculator.tsx
			Pricing.tsx
			Reviews.tsx
			CallToAction.tsx
			Footer.tsx
			AuthModal.tsx
			AOSInit.tsx
			PageLoader.tsx
		context/
			AuthContext.tsx
		globals.css
		layout.tsx
		page.tsx
```

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd gym-landingpage
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production app
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Backend Integration

This frontend currently uses a hosted backend:

- Base URL: `https://gym-backend-zbz2.onrender.com/api`

API usage in this project includes:

- `/auth/signup`
- `/auth/login`
- `/bmi` and `/bmi/:userId`
- `/reviews`
- `/test` (server wake-up ping)

Important notes:

- API URLs are currently hardcoded inside components.
- On free-tier hosting, initial API calls may be slow due to cold starts.

## Deployment

You can deploy this project on Vercel:

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Build command: `npm run build`
4. Output setting: default Next.js settings
5. Deploy

## Suggested Improvements

- Move API base URL to environment variables.
- Add form validation with better user feedback.
- Add automated tests (unit/integration).
- Add SEO metadata and Open Graph tags.
- Replace placeholder metadata in `layout.tsx`.

## License

Choose and add a license (for example, MIT) if you plan to open-source this project.
