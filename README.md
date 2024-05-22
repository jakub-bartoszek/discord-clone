# Discord-clone
A Discord-like application where you can create servers and channels, invite friends to servers, and communicate through messages and voice chat.

App live here: [discord-clone-jbd.up.railway.app](https://discord-clone-jbd.up.railway.app/)

## Table of Contents
- Installation
- Usage
- Features
- License
- Contact

## Instalation
1. Clone the repository:

    ```
    git clone https://github.com/your-username/discord-clone.git
    cd discord-clone
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Set up environment variables:
    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    DATABASE_URL=
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=
    LIVEKIT_API_KEY=
    LIVEKIT_API_SECRET=
    NEXT_PUBLIC_LIVEKIT_URL=
    ```
4. Run the development server:
   ```
   npm run dev
   ```

## Features
### 1. Servers
   - Creating servers
   - Inviting people
   - Editing name and image of server
   - Managing members

### 2. Channels
   - Creating voice and text channels
   - Editing channels

### 3. Chat
   - Sending text messages
   - Sending images
   - Editing messages
   - Deleting messages

### 4. Theme
   - Light mode
   - Dark mode

## Technologies Used
### Core Technologies
- React
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- Socket.io
### Libraries and UI Components 
- LiveKit
- Clerk
- Uploadthing
- React Hook Form
- TanStack React Query
- Shadcn Components
- Lucide React Components
- Radix UI
### Other Utilities and Tools
- Axios
- Zod
- Zustand
- uuid
- date-fns
- clsx
- cmdk

## Contact
For issues, questions, or suggestions, please open an issue in the repository or contact:

Email: jakub.bartoszek.dev@gmail.com

GitHub: [jakub-bartoszek](https://github.com/jakub-bartoszek)
