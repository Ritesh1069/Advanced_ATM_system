import face_recognition
import cv2
import numpy as np
import pandas as pd
import time

def check_face(face_db):
    # # Load the known image and encode it
    # known_image_path = "R:/Git/Advanced_ATM_system/face_recognition/myimage.jpg"  # Replace with the path to your known image
    # known_image = face_recognition.load_image_file(known_image_path)
    # known_encoding = face_recognition.face_encodings(known_image)[0]
    # print(known_encoding)

    # Initialize webcam
    video_capture = cv2.VideoCapture(0)
    
    # Initialize timeout variables
    start_time = time.time()
    timeout_duration = 10  # Timeout duration in seconds

    while True:
        # Capture frame from webcam
        ret, frame = video_capture.read()
        if not ret:
            # break
            raise Exception("Sorry Camera cannot be accessed")
        
        # Resize frame for faster processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Find all face encodings in the current frame
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        # Check if any face matches the known face
        match = False
        for face_encoding in face_encodings:
            # match = face_recognition.compare_faces([known_encoding], face_encoding)[0]
            match = face_recognition.compare_faces([face_db], face_encoding)[0]
            if match:
                # print("Authentication successful")
                # # break
                # return "Authentication successful"
                return True
                
        # # Display the result
        # font = cv2.FONT_HERSHEY_SIMPLEX
        # text = "Match Found" if match else "No Match"
        # if text == "Match Found":
        #     print("Authentication successful")
        #     break
        # cv2.putText(frame, text, (50, 50), font, 1, (0, 255, 0) if match else (0, 0, 255), 2, cv2.LINE_AA)

        cv2.imshow('Face Recognition', frame)
        
        # Check timeout condition
        elapsed_time = time.time() - start_time
        if elapsed_time > timeout_duration:
            # break
            # return "Face not matched"
            return False

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            # break
            # return "Face not matched"
            return False

    # Release webcam and close windows
    video_capture.release()
    cv2.destroyAllWindows()
    
    # return "Face not matched"
    return False

if __name__=="__main__":
    # text_file_path = "R:/Git/Advanced_ATM_system/face_recognition/face.txt"

    # with open(text_file_path, 'rb') as f:
    #     embedding_data = np.loadtxt(f, delimiter=',')
    # temp = embedding_data.tolist()
    
    # # print(temp)
    # print(check_face(temp))
    
    
    import pymongo
    
    client = pymongo.MongoClient("mongodb+srv://riteshmmaurya2004:12345@bank.aonwqsd.mongodb.net/?retryWrites=true&w=majority&appName=Bank")
    
    db = client["Bank"]
    collection = db["user_info"]
    
    acnt_no = int(input("enter acnt no: "))
    acnt_pin = int(input("enter acnt pin: "))
    
    face_db = collection.find_one({"_id": acnt_no, "password": acnt_pin})["face_embedding"]
    # print(face_db)
    print(check_face(face_db))