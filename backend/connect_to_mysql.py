# import os
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from dotenv import load_dotenv

# import mysql.connector
# from mysql.connector import Error

# # .envファイルの読み込み
# load_dotenv()

# # 環境変数からデータベース接続情報を取得
# DB_USERNAME = os.getenv("DB_USERNAME")
# DB_PASSWORD = os.getenv("DB_PASSWORD")
# DB_HOST = os.getenv("DB_HOST")
# DB_PORT = os.getenv("DB_PORT")
# DB_NAME = os.getenv("DB_NAME")

# # デバッグ用：環境変数の値を出力
# print(f"DB_USERNAME: {DB_USERNAME}")
# print(f"DB_PASSWORD: {DB_PASSWORD}")
# print(f"DB_HOST: {DB_HOST}")
# print(f"DB_PORT: {DB_PORT}")
# print(f"DB_NAME: {DB_NAME}")

# # MySQLデータベースへの接続URL
# DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# print("Database URL:", DATABASE_URL)

# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# # データベース接続のテスト
# from sqlalchemy import text

# try:
#     with engine.connect() as conn:
#         result = conn.execute(text("SELECT DATABASE()"))
#         print("Connected to:", result.fetchone())
# except Exception as e:
#     print("Connection failed:", e)

# # データベース接続の依存関係
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()




# try:
#     connection = mysql.connector.connect(
#         host='tech0-db-step4-studentrdb-8.mysql.database.azure.com',
#         user='tech0gen7student',
#         password='F4XyhpicGw6P',  # Azure Database for MySQLで設定したパスワード
#         database='pos_app_azure_mogi',  # 使用するデータベース名 (まだ作成していない場合は空欄でも良い)
#         ssl_ca='C:/Users/sator/Documents/SSL_Certs/DigiCertGlobalRootCA.crt.pem'  # SSL証明書のパス
#     )

#     if connection.is_connected():
#         db_Info = connection.get_server_info()
#         print("Successfully connected to MySQL database:", db_Info)

# except Error as e:
#     print("Error while connecting to MySQL", e)

# finally:
#     if connection.is_connected():
#         connection.close()
#         print("MySQL connection is closed")
