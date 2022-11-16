# Name: Carleton Barrett Foster III
# OSU Email: fostcarl@oregonstate.edu
# Course: CS 361 - Software Engineering I
# Description: Program that generates random image.

import random
import time


def random_photo_generator():
    num = random.randint(1, 20)
    operation = open("PhotoFilename.txt", "w")
    operation.truncate(0)
    operation.write("./FinalPhotos/" + str(num) + ".jpg")
    operation.close()


while True:
    time.sleep(0.1)
    operation2 = open("Request.txt", "r")
    line = operation2.readline()
    operation2.close()
    operation3 = open("Request.txt", "w")
    operation3.truncate(0)
    operation3.close()
    if line == "1":
        random_photo_generator()

# with open("./FinalPhotos/1.jpg", "rb") as i:
#     encoded_string = base64.b64encode(i.read())