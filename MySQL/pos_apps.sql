CREATE DATABASE pos_app;
USE pos_app;

CREATE TABLE Products (
    PRD_ID INT PRIMARY KEY AUTO_INCREMENT,  -- 商品一意キー
    CODE CHAR(13) UNIQUE,                   -- 商品コード
    NAME VARCHAR(50),                       -- 商品名称
    PRICE INT,                              -- 商品単価
    CONSTRAINT chk_code CHECK (LENGTH(CODE) = 13)  -- 商品コードの長さをチェック
);

CREATE TABLE Tax (
    ID INT PRIMARY KEY AUTO_INCREMENT,      -- 税区分一意キー
    CODE CHAR(2) UNIQUE,                    -- 税コード
    NAME VARCHAR(20),                       -- 税名称
    PERCENT DECIMAL(5, 2),                  -- 税率 (例: 0.10)
    CONSTRAINT chk_tax_code CHECK (LENGTH(CODE) = 2)  -- 税コードの長さをチェック
);

CREATE TABLE Transactions (
    TRD_ID INT PRIMARY KEY AUTO_INCREMENT,  -- 取引一意キー
    DATETIME TIMESTAMP,                     -- 取引日時
    EMP_CD CHAR(10),                        -- レジ担当者コード
    STORE_CD CHAR(5),                       -- 店舗コード
    POS_NO CHAR(3),                         -- POS機ID
    TOTAL_AMT INT,                          -- 合計金額
    TTL_AMT_EX_TAX INT                      -- 合計金額（税抜）
);

CREATE TABLE TransactionDetails (
    TRD_ID INT,                             -- 取引一意キー（外部キー）
    DTL_ID INT PRIMARY KEY AUTO_INCREMENT,  -- 取引明細一意キー
    PRD_ID INT,                             -- 商品一意キー（外部キー）
    PRD_CODE CHAR(13),                      -- 商品コード
    PRD_NAME VARCHAR(50),                   -- 商品名称
    PRD_PRICE INT,                          -- 商品単価
    TAX_CD CHAR(2),                         -- 税コード
    CONSTRAINT fk_trd_id FOREIGN KEY (TRD_ID) REFERENCES Transactions(TRD_ID),
    CONSTRAINT fk_prd_id FOREIGN KEY (PRD_ID) REFERENCES Products(PRD_ID),
    CONSTRAINT fk_tax_code FOREIGN KEY (TAX_CD) REFERENCES Tax(CODE)
);

-- テストデータ挿入
-- 商品データ挿入
INSERT INTO Products (CODE, NAME, PRICE) VALUES ('1234567890123', '商品A', 1000);

-- 税データ挿入
INSERT INTO Tax (CODE, NAME, PERCENT) VALUES ('10', '消費税', 10.00);

-- 取引データ挿入
INSERT INTO Transactions (DATETIME, EMP_CD, STORE_CD, POS_NO, TOTAL_AMT, TTL_AMT_EX_TAX) 
VALUES (NOW(), 'EMP001', 'STORE1', '001', 1100, 1000);

-- 取引明細データ挿入
INSERT INTO TransactionDetails (TRD_ID, PRD_ID, PRD_CODE, PRD_NAME, PRD_PRICE, TAX_CD) 
VALUES (1, 1, '1234567890123', '商品A', 1000, '10');

-- テストの店舗コードが6桁だったので修正
UPDATE Transactions
SET STORE_CD = '99999'
WHERE STORE_CD = 'STORE1' AND EMP_CD = 'EMP001' AND POS_NO = '001';

INSERT INTO Transactions (TRD_ID, DATETIME, EMP_CD, STORE_CD, POS_NO, TOTAL_AMT, TTL_AMT_EX_TAX)
VALUES (1, NOW(), 'EMP001', 'STORE1', '001', 1100, 1000);

INSERT INTO TransactionDetails (TRD_ID, PRD_ID, PRD_CODE, PRD_NAME, PRD_PRICE, TAX_CD)
VALUES (1, 1, '1234567890123', '商品A', 1000, '10');
