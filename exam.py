import base64
import codecs
import binascii

def try_decode(method, data):
    try:
        if method == "base64":
            return base64.b64decode(data).decode("utf-8", errors="ignore")
        elif method == "base32":
            return base64.b32decode(data).decode("utf-8", errors="ignore")
        elif method == "hex":
            return bytes.fromhex(data).decode("utf-8", errors="ignore")
        elif method == "rot13":
            return codecs.decode(data, "rot_13")
        elif method == "binary":
            return ''.join([chr(int(data[i:i+8], 2)) for i in range(0, len(data), 8)])
    except Exception:
        return None

# Input your encoded data here
data = input("Enter encoded string: ").strip()

# Try decoding using all supported methods
methods = ["base64", "base32", "hex", "rot13", "binary"]

for method in methods:
    result = try_decode(method, data)
    if result:
        print(f"\n[+] Decoded using {method.upper()}:\n{result}")
