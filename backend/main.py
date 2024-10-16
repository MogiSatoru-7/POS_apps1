from fastapi import FastAPI
from fastapi import FastAPI, Depends,
from sqlalchemy.orm import Session
from database import get_db
from models import Product
from . import models, database
import uvicorn

app = FastAPI()
# CORS設定
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて制限
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 商品一覧を取得するエンドポイント
@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products



# @app.get("/")
# def read_root():
#     return {"message": "Hello, World!"}

# @app.get("/items/")
# async def get_items():
#     return {"items": ["item1", "item2"]}

#以下はサンプルコード

# class Item(BaseModel):
#     name: str
#     price: int


# @app.get("/items/{item_name}")
# def get_item(item_name):
#     return {"name": item_name, "price": 200}


# @app.post("/items/new")
# def add_item(item: Item):
#     return item


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8080)
# app = FastAPI()