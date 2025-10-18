🧠 AI Component Generator

An intelligent React.js web application that transforms natural language prompts into working React UI components using the Gemini AI API.
It features a live code editor, preview window, and a modern Tailwind CSS UI for seamless interaction.

🚀 Features

🧩 Generate React components instantly from user prompts

🪄 Integrated with Gemini AI API for intelligent code generation

💻 Code Editor with syntax highlighting

👀 Live Preview Window to render generated components in real-time

🎨 Styled with Tailwind CSS

⚙️ Built using Vite + React for fast performance

📋 Copy or export generated code easily

🏗️ Tech Stack
Category	Technology
Frontend	React.js (Vite)
Styling	Tailwind CSS
AI Integration	Google Gemini API
Editor	Monaco Editor (optional)
Language	JavaScript / TypeScript
📦 Folder Structure
genui-react-ai-main/
├── public/
├── src/
│   ├── components/
│   │   ├── PromptInput.jsx
│   │   ├── CodeEditor.jsx
│   │   └── Preview.jsx
│   ├── utils/
│   │   └── geminiAPI.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/yourusername/genui-react-ai.git

2️⃣ Navigate to Project Directory
cd genui-react-ai-main

3️⃣ Install Dependencies
npm install

4️⃣ Create a .env File

In the root directory, create a .env file and add your Gemini API key:

VITE_GEMINI_API_KEY=your_api_key_here


⚠️ Never share your API key publicly.

5️⃣ Start Development Server
npm run dev


Visit your app at:
👉 http://localhost:5173

🧠 How It Works

The user enters a prompt (e.g., “Create a responsive navbar with a logo and three links”).

The Gemini API processes the prompt and returns React component code.

The code is displayed in the editor and rendered live in the preview window.

Users can copy or export the generated component.

🧰 Environment Variables
Variable	Description
VITE_GEMINI_API_KEY	Your Gemini API key for authentication
🧑‍💻 Example Prompt

"Create a modern login form with email and password inputs, a submit button, and a link to sign up."

The AI will generate a full React component code and preview it instantly.

🧾 License

This project is licensed under the MIT License.
You’re free to modify and use it for your personal or commercial projects.

💖 Acknowledgments

React

Tailwind CSS

Vite

Google Gemini API
