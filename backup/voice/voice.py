import speech_recognition as sr
import nltk
from googletrans import Translator

# Download NLTK data
# nltk.download('punkt')

def determine_credit_or_debit(text):
    words = nltk.word_tokenize(text.lower())
    credit_keywords = ['credit', 'deposit', 'transfer', 'send', 'add']
    debit_keywords = ['debit', 'withdraw', 'remove', 'take out']
    
    if any(word in words for word in credit_keywords):
        return "credit"
    elif any(word in words for word in debit_keywords):
        return "debit"
    else:
        return "unknown"

def translate_to_english(text, src_lang):
    translator = Translator()
    translation = translator.translate(text, src=src_lang, dest='en')
    return translation.text

def get_user_input(prompt):
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    
    print(prompt)
    
    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        print(f"You said: {text}")
        return text
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
        return None
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return None

def main():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    while True:
        print("Please speak into the microphone...")

        with microphone as source:
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.listen(source)

        try:
            # Recognize speech using Google
            text = recognizer.recognize_google(audio)
            print(f"You said: {text}")

            # Detect language and translate to English
            translator = Translator()
            detected_lang = translator.detect(text).lang
            translated_text = translate_to_english(text, detected_lang)
            print(f"Translated to English: {translated_text}")

            # Determine credit or debit
            action = determine_credit_or_debit(translated_text)
            if action != "unknown":
                print(f"Action: {action}")

                # Ask for confirmation
                confirmation_text = get_user_input("Do you want to proceed with this action? Please say 'yes' to confirm or 'no' to cancel.")
                if confirmation_text:
                    confirmation_text_translated = translate_to_english(confirmation_text, detected_lang)
                    if 'yes' in confirmation_text_translated.lower():
                        print(f"Confirmed. Proceeding to {action} the money.")
                        break
                    elif 'no' in confirmation_text_translated.lower():
                        print("Action canceled. Please provide a new action.")
                    else:
                        print("Could not understand confirmation. Please try again.")
                else:
                    print("No confirmation received. Please try again.")
            else:
                print("Could not determine the action. Please try again.")

        except sr.UnknownValueError:
            print("Sorry, I could not understand the audio. Please try again.")
        except sr.RequestError as e:
            print(f"Could not request results; {e}")
        except Exception as e:
            print(f"An error occurred: {e}. Please try again.")

if __name__ == "__main__":
    main()