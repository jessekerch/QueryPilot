from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import AsyncOpenAI
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FastAPI is working!"}

@app.get("/generate-sql")
def read_generate_sql():
    return {"message": "Generate SQLs only works with POST requests."}

client = AsyncOpenAI()
# Using default arg: api_key=os.environ.get("OPENAI_API_KEY")


class QueryRequest(BaseModel):
    query: str
    database: str
  
def generate_sql_prompt(user_input: str, db_type: str) -> str:
    return (
        f"""
        You are an expert SQL developer.
        Convert the following natural language query into a valid SQL statement for a {db_type} database.
        Ensure proper syntax and best practices. Assume a table named 'users' if none is provided.
        Only answer with the valid SQL statement, no other comments or information.

        Query: {user_input}
        SQL:
        """
    )

@app.post("/generate-sql")
async def generate_sql(request: QueryRequest):
    prompt = generate_sql_prompt(request.query, request.database)
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        
        sql_query = response.choices[0].message.content
        return {"sql": sql_query}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
