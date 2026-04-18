from PIL import Image

# Load image (ensure it has alpha channel)
img = Image.open("5-4-transparent.png").convert("RGBA")

# Get pixel data
pixels = img.getdata()

new_pixels = []
for r, g, b, a in pixels:
    if a == 0:
        # Keep fully transparent pixels unchanged
        new_pixels.append((0, 0, 0, 0))
    else:
        # Replace with solid red, keep original alpha
        new_pixels.append((255, 0, 0, a))

# Apply changes
img.putdata(new_pixels)

# Save result
img.save("kohala-volcano.png")