# Umbra — Extension Chrome

Mode sombre pour le web, avec des fonctionnalités avancées pour certains sites.

## Fonctionnalités

- **Mode sombre** sur tous les sites (inversion CSS)
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
