# CogniCanvas: The Illustrative AI Chat Companion

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jmnyarega/generated-app-20251004-141248)

> A visually breathtaking and whimsical AI chat application with an illustrative design, featuring powerful agentic capabilities and seamless session management.

CogniCanvas is a visually stunning, illustrative web-based AI chat application built on Cloudflare's serverless infrastructure. It serves as a beautiful and intuitive frontend for a powerful, multi-model AI agent system. The application's design philosophy is human-centered and whimsical, featuring custom illustrations, playful typography, and delightful micro-interactions to create an expressive and engaging user experience.

## ✨ Key Features

*   **Illustrative & Whimsical UI**: A unique, hand-drawn aesthetic that makes interacting with AI delightful.
*   **Sophisticated Chat Interface**: A meticulously designed interface with robust session management, seamless streaming responses, and clear visualization of AI tool usage.
*   **Stateful Session Management**: Conversations are persisted using Cloudflare Durable Objects, allowing users to seamlessly switch between different chat contexts.
*   **Streaming Responses**: AI responses are streamed in real-time for a more interactive and responsive feel.
*   **Agentic Capabilities**: The backend is built to support AI agents that can use tools like web browsing and data lookups.
*   **Fully Responsive**: A flawless experience across all device sizes, from mobile phones to large desktops.
*   **Built on the Edge**: Powered by Cloudflare Workers for globally low-latency performance.

## 🚀 Technology Stack

*   **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Zustand
*   **Backend**: Cloudflare Workers, Hono
*   **State Management**: Cloudflare Durable Objects via the Cloudflare Agents SDK
*   **AI & Tooling**: Cloudflare AI Gateway, OpenAI SDK, Model Context Protocol (MCP)
*   **Language**: TypeScript

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or later)
*   [Bun](https://bun.sh/) package manager
*   A Cloudflare account

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/cognicanvas.git
    cd cognicanvas
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Environment Variables

To run the application locally, you need to set up your environment variables for the Cloudflare Worker.

1.  Create a `.dev.vars` file in the root of the project:
    ```sh
    touch .dev.vars
    ```

2.  Add the following required variables to your `.dev.vars` file. These are necessary to connect to the Cloudflare AI Gateway.

    ```ini
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_NAME/openai"
    CF_AI_API_KEY="YOUR_CLOUDFLARE_API_KEY"
    ```

    *   Replace `YOUR_ACCOUNT_ID`, `YOUR_GATEWAY_NAME`, and `YOUR_CLOUDFLARE_API_KEY` with your actual Cloudflare credentials.

> **Note**: AI features will not work without valid Cloudflare AI Gateway credentials.

## 💻 Development

To start the local development server, which includes the Vite frontend and the local Wrangler server for the worker, run:

```sh
bun run dev
```

This will start the application on `http://localhost:3000` (or another available port). The frontend will automatically reload when you make changes to the `src` directory.

## ☁️ Deployment

This project is designed for easy deployment to Cloudflare's global network.

1.  **Login to Cloudflare:**
    If you haven't already, authenticate Wrangler with your Cloudflare account:
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script to build the application and deploy it to Cloudflare Pages and Workers.
    ```sh
    bun run deploy
    ```

3.  **Configure Production Secrets:**
    After deploying for the first time, you must add your AI Gateway credentials as secrets to your production worker.
    ```sh
    # For CF_AI_API_KEY
    bunx wrangler secret put CF_AI_API_KEY

    # For CF_AI_BASE_URL
    bunx wrangler secret put CF_AI_BASE_URL
    ```
    Follow the prompts to securely add your secrets. Your deployed application will not function correctly until these secrets are set.

Alternatively, deploy directly from your GitHub repository:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jmnyarega/generated-app-20251004-141248)

## 📂 Project Structure

*   `src/`: Contains all the frontend React application code.
    *   `components/`: Reusable UI components.
    *   `pages/`: Top-level page components.
    *   `store/`: Zustand state management stores.
    *   `hooks/`: Custom React hooks.
    *   `lib/`: Utility functions and services.
*   `worker/`: Contains all the backend Cloudflare Worker and Durable Object code.
    *   `agent.ts`: The core `ChatAgent` Durable Object class.
    *   `userRoutes.ts`: Hono API route definitions.
    *   `chat.ts`: Logic for handling AI chat completions and tool usage.
*   `wrangler.jsonc`: Configuration file for the Cloudflare Worker.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.