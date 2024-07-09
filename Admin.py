import pandas as pd
import pymongo 
from datetime import datetime
import face_recognition
import cv2
import numpy as np
import pandas as pd

client = pymongo.MongoClient("mongodb+srv://azizsk101:5dwypmWEpuRYsN2X@bank.xvf3yvk.mongodb.net/?retryWrites=true&w=majority&appName=Bank")
database = client["Bank"]
db = database['user_info']

if __name__ =="__main__":
    account_no = int(input("Enter Account number (integer only): "))
    account_pin = int(input("Enter Account pin (integer only): "))
    name = input("Enter user name (char): ")
    balance = float(input("Enter Account balance (float only): "))
    history = ["27/06/2024  02:50:50  credited  0000","27/06/2024  02:50:50  credited  1000","27/06/2024  02:50:50  credited  2000","27/06/2024  02:50:50  credited  3000","27/06/2024  02:50:50  credited  4000"]
    known_image_path = input("enter face image exact path: ")
    known_image = face_recognition.load_image_file(known_image_path)
    known_encoding = face_recognition.face_encodings(known_image)[0]
    face_embedding = known_encoding.tolist()
    info = {"_id": account_no, "password": account_pin, "name": name, "balance": balance, "history":history, "face_embedding": face_embedding}
    print(db.insert_one(info))
    