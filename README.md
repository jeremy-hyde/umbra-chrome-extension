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

## Installation en mode développeur dans Chrome

Aucune compilation et aucune commande `npm` ne sont nécessaires. Chrome charge directement les fichiers du dépôt.

### 1. Télécharger le projet

Avec Git :

```bash
git clone https://github.com/jeremy-hyde/umbra-chrome-extension.git
cd umbra-chrome-extension
```

Sans Git :

1. Ouvre la page GitHub du dépôt.
2. Clique sur **Code**, puis sur **Download ZIP**.
3. Décompresse le fichier ZIP dans un dossier permanent.

Ne supprime pas ce dossier après l'installation. Chrome lit l'extension directement depuis celui-ci.

### 2. Ouvrir la gestion des extensions

Saisis cette adresse dans la barre d'adresse de Chrome :

```text
chrome://extensions
```

### 3. Activer le mode développeur

Active **Mode développeur** en haut à droite de la page.

### 4. Charger Umbra

1. Clique sur **Charger l'extension non empaquetée**.
2. Sélectionne le dossier qui contient directement `manifest.json`.
3. Confirme la sélection.

La carte **Umbra** doit maintenant apparaître dans `chrome://extensions`.

> Si Chrome indique que `manifest.json` est introuvable, tu as sélectionné le mauvais dossier. Sélectionne le dossier de
> l'extension et non le fichier ZIP ou son dossier parent.

### 5. Épingler Umbra dans la barre d'outils

1. Clique sur le bouton des extensions à droite de la barre d'adresse.
2. Trouve **Umbra** dans la liste.
3. Clique sur l'épingle pour garder son bouton visible.

### 6. Configurer l'extension

Ouvre la fenêtre Umbra, puis clique sur l'engrenage en haut à droite. La page **Umbra Settings** permet de configurer la
clé OpenRouter et le comportement des outils Instagram.

---

## Mettre à jour l'extension en mode développeur

Après une modification locale :

1. Ouvre `chrome://extensions`.
2. Clique sur **Recharger** sur la carte Umbra.
3. Recharge aussi les onglets déjà ouverts qui utilisent Umbra.

Après une mise à jour du dépôt avec Git :

```bash
git pull
```

Recharge ensuite l'extension et les pages concernées. Si Chrome affiche une erreur, ouvre **Erreurs** sur la carte Umbra
pour afficher le fichier et la ligne responsables.

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
