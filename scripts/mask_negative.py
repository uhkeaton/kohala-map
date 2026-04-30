from PIL import Image

img = Image.open("input/map.png").convert("RGBA")
pixels = img.getdata()

new_pixels = []
for r, g, b, a in pixels:
    if a == 0:
        # Transparent → solid red
        new_pixels.append((255, 0, 0, 255))
    else:
        # Non-transparent → fully transparent
        new_pixels.append((0, 0, 0, 0))

img.putdata(new_pixels)
img.save("output/mask-negative.png")