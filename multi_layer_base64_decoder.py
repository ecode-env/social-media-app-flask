#!/usr/bin/env python3
"""
multi_layer_base64_decoder.py

A script for PyCharm (or any IDE) that repeatedly decodes Base64 layers,
adding padding only when needed, until no further decoding is possible.
"""
import base64

def add_padding(s: str) -> str:
    """Add '=' padding to make length a multiple of 4, if needed."""
    s = s.strip().replace("\n", "").replace(" ", "")
    pad_len = (4 - len(s) % 4) % 4
    return s + ("=" * pad_len)


def multi_decode(data: str, max_layers: int = 10):
    """Decode Base64 layers up to max_layers, printing each result."""
    current = data.strip()

    for layer in range(1, max_layers + 1):
        padded = add_padding(current)

        # Try decoding; stop on failure
        try:
            decoded_bytes = base64.b64decode(padded, validate=False)
        except Exception as e:
            print(f"[Layer {layer}] Decoding failed: {e}\nStopping.")
            break

        # Attempt to interpret as UTF-8, else show raw bytes
        try:
            decoded_str = decoded_bytes.decode('utf-8', errors='ignore')
        except Exception:
            decoded_str = None

        print(f"\n[Layer {layer}] →")
        if decoded_str and decoded_str.strip():
            print(decoded_str)
        else:
            print(repr(decoded_bytes))

        # Stop if no change or empty
        if decoded_str is None or decoded_str.strip() == '' or decoded_str == current:
            print(f"[Layer {layer}] No further meaningful decoding. Stopping.")
            break

        current = decoded_str

    print("\n✅ Finished decoding.")

if __name__ == '__main__':
    encoded = input("🔐 Enter Base64 string to decode: ")
    multi_decode(encoded)
