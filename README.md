# CareFlow Mobile

Role: You are an expert Frontend Developer and UI/UX Designer.

Task: Build a mobile-first healthcare app UI named "HCare+" for patients. The UI must strictly simulate a mobile app layout (max-width: 430px, centered on desktop screens) using React, Tailwind CSS, and shadcn/ui components. Use a clean, trustworthy medical color palette (primary: solid blue, background: light gray/white). Use Lucide React icons.

Key Screens to Implement:

Bottom Navigation Bar: Include tabs for Home, Appointments, Wallet, and Profile.

Booking Flow (Stepper): Create a multi-step booking interface.

Step 1: Select Service.

Step 2: Select Doctor (with gender/experience filters).

Step 3: Select Time Slot.

Step 4: Payment / Confirm (Include a prominent red countdown timer "05:00" indicating Slot Locking).

Wallet / Deposit Screen: Show a prominent Current Balance card. Include buttons for "Top-up" and "Withdraw". Below it, show a transaction history list (List tiles with green '+' for top-ups and red '-' for deductions).

AI Chatbot Modal: A chat interface layout. Critically, overlay a "Medical Disclaimer" modal that blocks the chat. The user MUST check a box saying "I agree" before the "Start Chat" button becomes active.

Patient Profile: Include a section for "Allergies". Use a multi-select badge/tag component to add allergies, do not use a plain text input.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0739428-ec87-473d-968a-22839dfb14e6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
