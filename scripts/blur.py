from PIL import Image, ImageFilter

img = Image.open("kohala-volcano.png")
blurred = img.filter(ImageFilter.GaussianBlur(radius=16))

blurred.save("volcano-blur.png")