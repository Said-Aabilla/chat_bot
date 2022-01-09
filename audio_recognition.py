from webbrowser import get

import speech_recognition as sr
import gtts
from playsound import playsound
import os

r = sr.Recognizer()
m = sr.Microphone()


def get_audio():
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source)
        print("Say something...")
        audio = r.listen(source)
        print("done listening")
    return audio


def audio_to_text(audio, lang):
    text = ""
    try:
        text = r.recognize_google(audio,language=lang)  # , language="fr-FR"
    except sr.UnknownValueError:
        print("Speech recognition could not understand audio")
    except sr.RequestError:
        print("could not request results from API")
    return text


def play_sound(text,language):
    try:
        tts = gtts.gTTS(text,lang=language)  # , lang='fr'
        tempfile = "/home/orwel/temp.mp3"
        tts.save(tempfile)
        playsound(tempfile)
        os.remove(tempfile)
    except AssertionError:
        print("could not play sound")


# test
if __name__ == "__main__":
    play_sound("hello")
    a = get_audio()
    command = audio_to_text(a)
    print(command)
    print("done")
    play_sound(command)
    # print(sr.Microphone.list_microphone_names())
    # print(sr.Microphone)
