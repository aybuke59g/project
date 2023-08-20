from cs50 import SQL
#from colorspacious import cspace_convert
import numpy as np

db = SQL("sqlite:///users.db")


def find_color_match(l, a, b):

    vita = db.execute("SELECT name, l, a, b  FROM vita_classical")

    for row in vita:
        d_l = abs(l - row["l"])
        d_a = abs(a - row["a"])
        d_b = abs(b - row["b"])

        temp = pow(d_l, 2) + pow(d_a, 2) + pow(d_b, 2)
        e = pow(temp, 1/2)

        if e < 1:
            return "Match found: " + row["name"]
        if 1 < e < 2:
            return "Match found: " + row["name"]
        if 2 < e < 3:
            return "Match found: " + row["name"]

    return "Sorry, no match found "

def rgb_to_xyz(rgb):
    r, g, b = [x / 255.0 for x in rgb]
    r = r if r > 0.04045 else r / 12.92
    g = g if g > 0.04045 else g / 12.92
    b = b if b > 0.04045 else b / 12.92

    x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375
    y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750
    z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041

    return x, y, z

def xyz_to_lab(xyz):
    x, y, z = xyz
    xn, yn, zn = 0.950456, 1.0, 1.088754

    fy = (y / yn) ** (1 / 3) if y / yn > 0.008856 else 903.3 * (y / yn)
    l = 116 * fy - 16 if y / yn > 0.008856 else 903.3 * (y / yn)

    fx = xyz_to_f(x / xn)
    fy = xyz_to_f(y / yn)
    fz = xyz_to_f(z / zn)

    a = 500 * (fx - fy)
    b = 200 * (fy - fz)

    l = round(l)
    a = round(a)
    b = round(b)

    return l, a, b

def xyz_to_f(t):
    return t ** (1 / 3) if t > 0.008856 else 903.3 * t

def rgb_to_lab(red, green, blue):
    xyz = rgb_to_xyz([red, green, blue])
    lab = xyz_to_lab(xyz)
    l, a, b = lab

    result = find_color_match(l, a, b)

    return result





