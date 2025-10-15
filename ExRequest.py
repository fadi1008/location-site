import requests

# URL de l'API GitHub
url = "https://api.github.com/users/octocat"

# Envoyer la requête GET
response = requests.get(url)

# Vérifier si la requête a réussi
if response.ok:
    data = response.json()  # on récupère le JSON une seule fois
    print("Nom :", data.get("login"))
    print("Profil :", data.get("html_url"))
else:
    print("Erreur API :", response.status_code)

# Informations supplémentaires
print("\n--- Infos supplémentaires ---")
print("Status:", response.status_code)
print("Headers:", response.headers)
print("Text brut:", response.text)
print("URL demandée:", response.url)
print("Succès ?", response.ok)
