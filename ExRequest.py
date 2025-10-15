import requests

url = "https://api.github.com/users/octocat"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    print("Nom :", data["login"])
    print("Profil :", data["html_url"])
else:
    print("Erreur API :", response.status_code)

print("Status:", response.status_code)
print("Headers:", response.headers)
print("Text:", response.text)
print("JSON:", response.json())
print("URL:", response.url)
print("Success?", response.ok)