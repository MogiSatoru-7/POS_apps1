from fastapi import FastAPI
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from . import models, database
import uvicorn

app = FastAPI()

# データベーステーブルの作成
models.Base.metadata.create_all(bind=database.engine)

@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    items = db.query(models.Item).offset(skip).limit(limit).all()
    return items

@app.post("/items/")
def create_item(name: str, price: float, stock: int, db: Session = Depends(database.get_db)):
    db_item = models.Item(name=name, price=price, stock=stock)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


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