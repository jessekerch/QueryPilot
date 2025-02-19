# **QueryPilot.ai**

QueryPilot.ai is an AI-powered tool that converts natural language queries into SQL statements. It uses **FastAPI** for the backend and **React + TypeScript** for the frontend.

---

## **🚀 Tech Stack**

- **Frontend:** React, TypeScript, Vite, Axios
- **Backend:** FastAPI, Python, OpenAI API
- **Hosting:** Vercel (Frontend), Render (Backend)

---

## **📌 Setup Instructions**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/yourusername/querypilot.git
cd querypilot
```

### **2️⃣ Set Up the Backend (FastAPI)**

```bash
cd backend
python3 -m venv .venv  # Create a virtual environment
source .venv/bin/activate  # Activate (Mac/Linux)
.venv\Scripts\activate  # Activate (Windows)
```

#### **Install Dependencies**

```bash
pip install -r requirements.txt
```

#### **Set Up Environment Variables**

Create a `.env` file inside `backend/` and add:

```ini
OPENAI_API_KEY=your_openai_api_key_here
```

#### **Start the Backend**

```bash
uvicorn main:app --reload
```

The backend will run at **http://127.0.0.1:8000**. Test it at **http://127.0.0.1:8000/docs**.

---

### **3️⃣ Set Up the Frontend (React + TypeScript)**

```bash
cd ../frontend  # Move to the frontend folder
npm install  # Install dependencies
```

#### **Start the Frontend**

```bash
npm run dev
```

The frontend will run at **http://localhost:5173**.

---

## **🚀 Usage**

1. **Open the frontend** in your browser (`http://localhost:5173`).
2. **Enter a query** (e.g., "Get all users created last month").
3. **Select a database type** (PostgreSQL, MySQL, SQLite, etc.).
4. Click **Generate SQL** → The AI will return an SQL query.

---

## **🚀 Deployment**

### **Deploy Backend on Render**

1. Push your code to GitHub.
2. Go to [Render](https://render.com/) → New Service → Connect to your repo.
3. Set `OPENAI_API_KEY` as an **environment variable**.
4. Deploy!

### **Deploy Frontend on Vercel**

```bash
npm install -g vercel
vercel
```

Follow the Vercel setup process to deploy.

---

## **✅ Next Steps**

- ✅ Improve UI/UX
- ✅ Add query history
- ✅ Optimize AI SQL generation

---

## **📜 License**

MIT License. Feel free to use and contribute!

---

🚀 Built by **Jesse Kercheval**
