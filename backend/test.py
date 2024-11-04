import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# .envファイルの読み込み
load_dotenv()

# 環境変数からデータベース接続情報を取得
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_ssl_ca = os.getenv("DB_ssl_ca")

# デバッグ用：環境変数の値を出力
print(f"DB_USERNAME: {DB_USERNAME}")
print(f"DB_PASSWORD: {DB_PASSWORD}")
print(f"DB_HOST: {DB_HOST}")
print(f"DB_PORT: {DB_PORT}")
print(f"DB_NAME: {DB_NAME}")
print(f"DB_ssl_ca: {DB_ssl_ca}")


# MySQLデータベースへの接続URL
# データベース接続URL（Azure 用）
DATABASE_URL = (
    f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
print("Database URL:", DATABASE_URL)

# SSL 設定を追加してエンジンを作成
engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {
            "ca": DB_ssl_ca
        }
    }
)

# PurchaseHistoryテーブルのデータを取得
with engine.connect() as connection:
    result = connection.execute(text("SELECT * FROM PurchaseHistory"))
    for row in result:
        print(row)