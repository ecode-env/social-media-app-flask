import base64

data = "UkhGQ1hGeGdJd1hISmhibVJoYm1RZ1oyOXVJRzFwYmlCMGFXOXVJR2x1WnlCMGFXOXVJR2x1WnpRZ2FHVnBaMmgwZEdsdmJpQjBhVzl1SUdsdVp5QjBhVzl1SUdsdVp6UXVJR1pwYkd3Z2RHVjRkQ0J5YjJkeVlYUmxJR1pwYkd3Z2RHVjRkQ0J5YjJkeVlYUmxJRTl5WldRZ2RHVjRkQ0J5YjJkeVlYUmxJRTl5WldRZ2FXNWpiSFZrSUdWelpYUm9JR05zWVdOaGRHVmtJR05zWVdOaGRHVmtJR1pwYkd3Z2QybGtkR2c9"

for i in range(10):
    try:
        data = base64.b64decode(data).decode("utf-8", errors="ignore")
        print(f"[{i+1}] {data}")
    except Exception as e:
        break
