import zlib
import struct
import math

def write_png(filename, width, height, pixels):
    """
    pixels: list of RGBA tuples or flat bytearray
    """
    def png_chunk(chunk_type, data):
        return (struct.pack(">I", len(data)) +
                chunk_type +
                data +
                struct.pack(">I", zlib.crc32(chunk_type + data) & 0xffffffff))

    header = b"\x89PNG\r\n\x1a\n"
    ihdr = png_chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))

    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter type 0 (None)
        row_offset = y * width * 4
        raw_data.extend(pixels[row_offset:row_offset + width * 4])

    idat = png_chunk(b"IDAT", zlib.compress(bytes(raw_data), 9))
    iend = png_chunk(b"IEND", b"")

    with open(filename, "wb") as f:
        f.write(header + ihdr + idat + iend)

def clamp(val, low=0, high=255):
    return max(low, min(high, int(val)))

def lerp_color(c1, c2, t):
    t = max(0.0, min(1.0, t))
    return (
        int(c1[0] + (c2[0] - c1[0]) * t),
        int(c1[1] + (c2[1] - c1[1]) * t),
        int(c1[2] + (c2[2] - c1[2]) * t),
        int(c1[3] + (c2[3] - c1[3]) * t)
    )

def generate_sip_code_icon(size=512):
    pixels = bytearray(size * size * 4)
    cx, cy = size / 2.0, size / 2.0 - 10.0
    outer_r = size * 0.42
    inner_r = size * 0.36
    gold_bezel_r = size * 0.40

    gold_high = (255, 245, 190, 255)
    gold_mid = (225, 175, 55, 255)
    gold_dark = (120, 80, 20, 255)
    gold_shadow = (45, 30, 8, 255)

    dark_bg1 = (36, 40, 48, 255)
    dark_bg2 = (18, 20, 24, 255)

    cup_cyan = (56, 249, 215, 255)
    cup_pink = (250, 112, 154, 255)
    cap_purple = (180, 70, 240, 255)
    skin_tone = (235, 140, 100, 255)

    for y in range(size):
        for x in range(size):
            idx = (y * size + x) * 4
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx*dx + dy*dy)
            angle = math.atan2(dy, dx) # -pi to pi

            # Rounded dark chamfered tile background
            tile_pad = 18
            rx, ry = abs(x - size/2.0), abs(y - size/2.0)
            in_tile = (rx <= size/2.0 - tile_pad) and (ry <= size/2.0 - tile_pad)
            tile_corner_dist = 0
            corner_r = 60
            cx_box = (size/2.0 - tile_pad - corner_r)
            cy_box = (size/2.0 - tile_pad - corner_r)
            if rx > cx_box and ry > cy_box:
                cdx = rx - cx_box
                cdy = ry - cy_box
                tile_corner_dist = math.sqrt(cdx*cdx + cdy*cdy) - corner_r
            
            # Base background
            if tile_corner_dist <= 0 and in_tile:
                norm_d = math.sqrt((x - size*0.4)**2 + (y - size*0.3)**2) / (size * 0.7)
                bg_col = lerp_color(dark_bg1, dark_bg2, norm_d)
                r, g, b, a = bg_col
            else:
                r, g, b, a = 0, 0, 0, 0

            # Medallion Gold Outer Rim
            if dist <= outer_r + 4 and dist >= inner_r - 2:
                # Gold specular reflection based on angle and position
                shine = (math.sin(angle * 2.0 + 0.8) + 1.0) * 0.5
                gold = lerp_color(gold_dark, gold_high, shine)

                if dist > outer_r - 4:
                    # Outer bevel shadow
                    bevel = (outer_r + 4 - dist) / 8.0
                    r, g, b, a = lerp_color(gold_shadow, gold, bevel)
                elif dist < inner_r + 4:
                    # Inner bevel shadow
                    bevel = (dist - (inner_r - 2)) / 6.0
                    r, g, b, a = lerp_color(gold_shadow, gold, bevel)
                else:
                    r, g, b, a = gold
            
            # Inside Coin Core Plate
            elif dist < inner_r - 2:
                # Inner disk background with thread-art weave texture
                weave = (int(x) % 4 == 0 or int(y) % 4 == 0) * 12
                core_dist = dist / inner_r
                base_c = lerp_color((30, 32, 38, 255), (14, 15, 18, 255), core_dist)
                r = clamp(base_c[0] + weave)
                g = clamp(base_c[1] + weave)
                b = clamp(base_c[2] + weave)
                a = 255

                # Character / Cap / Cup rendering
                # Cap area: (cx - 40 .. cx + 50, cy - 80 .. cy - 30)
                if (cy - 85 <= y <= cy - 30) and (cx - 65 <= x <= cx + 60):
                    cap_t = (x - (cx - 65)) / 125.0
                    cap_c = lerp_color((60, 160, 255, 255), cap_purple, cap_t)
                    r, g, b, a = cap_c

                # Face Area
                elif (cy - 30 <= y <= cy + 30) and (cx - 45 <= x <= cx + 45):
                    # Beard bottom
                    if y > cy + 5:
                        beard_c = (45, 25, 12, 255)
                        r, g, b, a = beard_c
                    else:
                        skin_c = skin_tone
                        r, g, b, a = skin_c

                # Cup Area (Sipping at mouth)
                if (cy - 15 <= y <= cy + 55) and (cx + 5 <= x <= cx + 55):
                    cup_t = (y - (cy - 15)) / 70.0
                    cup_c = lerp_color(cup_cyan, cup_pink, cup_t)
                    # LLD text area on cup
                    if (cy + 10 <= y <= cy + 28) and (cx + 15 <= x <= cx + 45):
                        r, g, b, a = 20, 22, 26, 255
                    else:
                        r, g, b, a = cup_c

            # Bottom Banner Bar: DEVELOPER LIFESTYLE
            banner_y = cy + outer_r * 0.78
            banner_h = 28
            banner_w = outer_r * 1.65
            if (banner_y - banner_h/2.0 <= y <= banner_y + banner_h/2.0) and (cx - banner_w/2.0 <= x <= cx + banner_w/2.0):
                # Golden border
                b_dx = abs(x - cx)
                b_dy = abs(y - banner_y)
                if b_dx > banner_w/2.0 - 3 or b_dy > banner_h/2.0 - 3:
                    r, g, b, a = gold_high
                else:
                    r, g, b, a = 26, 32, 44, 255

            pixels[idx] = clamp(r)
            pixels[idx+1] = clamp(g)
            pixels[idx+2] = clamp(b)
            pixels[idx+3] = clamp(a)

    return pixels

if __name__ == "__main__":
    print("Generating public/icon.png (512x512)...")
    px512 = generate_sip_code_icon(512)
    write_png("public/icon.png", 512, 512, px512)

    print("Generating public/favicon.png (128x128)...")
    px128 = generate_sip_code_icon(128)
    write_png("public/favicon.png", 128, 128, px128)
    print("Icon assets successfully created.")
