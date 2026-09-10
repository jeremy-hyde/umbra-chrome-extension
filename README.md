# Umbra — Extension Chrome

Mode sombre pour le web, avec des fonctionnalités avancées pour certains sites.

## Fonctionnalités

- **Mode sombre** sur tous les sites (inversion CSS)
- **Tri Instagram** sur les profils, les recherches Explore et les collections Saved
- **Filtres et outils Instagram** : grille triée, sélection, lecteur, copie, téléchargements et exports Excel/CSV/JSON
- **Transcription Instagram** directe avec OpenRouter et Whisper Large V3 Turbo
- **Thème personnalisé** pour old.reddit.com et github.com
- **Redirection automatique** de reddit.com vers old.reddit.com
- **Téléchargement de vidéos** sur skool.com et whop.com (Mux, Loom, YouTube)
- **Suppression des cookies et du stockage** du site actif
- **Suspension des onglets** non épinglés

---

## Installation en mode développeur (Chrome)

### 1. Télécharger le code source

Clone ou télécharge le dépôt sur ton ordinateur. Tu dois avoir le dossier du projet en local, par exemple :

```
C:\Users\TonNom\Dev\extensions_chrome   (Windows)
~/Dev/extensions_chrome                  (Mac)
```

### 2. Ouvrir la page des extensions Chrome

Dans la barre d'adresse de Chrome, tape :

```
chrome://extensions
```

Appuie sur **Entrée**.

### 3. Activer le mode développeur

En haut à droite de la page, active le bouton **Mode développeur**.

### 4. Charger l'extension

Clique sur **Charger l'extension non empaquetée**, puis sélectionne le dossier du projet (celui qui contient le fichier
`manifest.json`).

L'extension apparaît alors dans la liste et l'icône Umbra s'affiche dans la barre d'outils Chrome.

### 5. Épingler l'icône (optionnel)

Clique sur l'icône puzzle 🧩 à droite de la barre d'adresse, puis clique sur l'épingle à côté d'**Umbra** pour la garder
visible.

---

## Mettre à jour l'extension après une modification

Après avoir modifié des fichiers, retourne sur `chrome://extensions` et clique sur l'icône **↺ Recharger** sur la carte
de l'extension.

> Si tu modifies `manifest.json`, un rechargement complet est nécessaire (désactiver puis réactiver, ou cliquer sur
> Recharger).

---

## Trier et transcrire Instagram

1. Ouvre un profil Instagram, une recherche Explore ou une collection Saved.
2. Ouvre Umbra et sélectionne l’onglet **Instagram**.
3. Choisis un nombre de publications ou une période.
4. Lance un tri par likes, vues, commentaires, ancienneté ou score d’outlier.
5. Utilise la grille Umbra pour filtrer, sélectionner, télécharger, transcrire ou exporter les résultats.

Les exports Excel, CSV et JSON restent locaux. L’export Google Sheets et les comptes Sort Feed ne sont pas utilisés.

### Configurer OpenRouter

1. Crée une clé API OpenRouter et ajoute des crédits au compte.
2. Ouvre Umbra et clique sur l’icône d’engrenage en haut à droite.
3. Enregistre la clé sur la page complète **Umbra Settings**.
4. Active **Show Transcribe button**, puis utilise **Transcribe** sur une publication ou une sélection.

Umbra demande `openai/whisper-large-v3-turbo` avec détection automatique de la langue. Le média est envoyé directement depuis l’extension à OpenRouter et à son fournisseur de modèle. Aucun serveur Sort Feed n’est utilisé.

Les fichiers sont envoyés en multipart pour éviter l’augmentation de taille du base64. Les médias de plus de 25 Mo sont refusés, car Umbra n’ajoute pas de conversion ou de compression locale.

> La clé est conservée dans `chrome.storage.local`. Ce stockage est persistant, mais ce n’est pas un coffre-fort : une personne ou un logiciel qui peut lire le profil Chrome local peut récupérer la clé. Les transcriptions utilisent les crédits OpenRouter de l’utilisateur.

---

## Télécharger des vidéos Skool / Whop

L'extension ajoute un bouton **↓ Download** sur les players vidéo des pages skool.com et whop.com.

### Prérequis : installer yt-dlp

**Windows**

```powershell
winget install yt-dlp
```

Ou télécharge le `.exe` directement sur [github.com/yt-dlp/yt-dlp/releases](https://github.com/yt-dlp/yt-dlp/releases).

**Mac**

```bash
brew install yt-dlp
```

Nécessite [Homebrew](https://brew.sh). Si tu ne l'as pas :
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Utilisation

1. Va sur une page de cours skool.com ou whop.com contenant une vidéo
2. Clique sur le bouton **↓ Download** qui apparaît sur le player
3. Copie la commande yt-dlp affichée
4. Colle-la dans **PowerShell** (Windows) ou **Terminal** (Mac)
5. Le fichier est sauvegardé dans le dossier courant du terminal

> **Astuce Mac** : tape `cd ~/Downloads` avant de coller la commande pour que la vidéo atterrisse dans ton dossier
> Téléchargements.

> **Astuce Windows** : le fichier est sauvegardé dans `C:\Users\TonNom` par défaut. Pour choisir un autre dossier, tape
`cd C:\chemin\vers\dossier` avant de coller la commande.

### Providers supportés

| Player                   | Support |
|--------------------------|---------|
| Mux (player natif Skool/Whop) | ✅       |
| Loom                     | ✅       |
| YouTube                  | ✅       |
