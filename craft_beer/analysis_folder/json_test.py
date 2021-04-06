import json

with open('states.json') as f:
    file = json.load(f)

print(file['features'][0])