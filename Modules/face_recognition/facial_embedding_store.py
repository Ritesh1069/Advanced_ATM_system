import numpy as np
import face_recognition
import cv2
import numpy as np
import pandas as pd


#loading the image and extracting its embeddings
known_image_path = "R:/Git/Advanced_ATM_system/face_recognition/myimage.jpg"
known_image = face_recognition.load_image_file(known_image_path)
known_encoding = face_recognition.face_encodings(known_image)[0]


# reading embedding from a txt file 
text_file_path = "R:/Git/Advanced_ATM_system/face_recognition/face.txt"
with open(text_file_path, 'rb') as f:
    embedding_data = np.loadtxt(f, delimiter=',')
temp = embedding_data.tolist()
print(temp)

#writing the embeddings to a text file
text_file_path = "R:/Git/Advanced_ATM_system/face_recognition/face.txt"
with open(text_file_path, 'r') as f:
    np.savetxt(f, known_encoding.reshape(1, -1), delimiter=',', fmt='%f')
