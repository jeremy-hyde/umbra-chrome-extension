# Umbra — Extension Chrome

Mode sombre pour le web, avec des fonctionnalités avancées pour certains sites.

## Fonctionnalités

- **Mode sombre** sur tous les sites (inversion CSS)
- **Thème personnalisé** pour old.reddit.com et github.com
- **Redirection automatique** de reddit.com vers old.reddit.com
- **Téléchargement de vidéos** sur tous les sites (Mux, Loom et Wistia directement dans le navigateur, YouTube via yt-dlp)
- **Transcription de vidéos** dans le navigateur (Whisper via OpenRouter, fichiers .txt + .srt)
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

Ouvre la fenêtre Umbra, puis clique sur l'engrenage en haut à droite. La page **Umbra Settings** contient le guide
d'installation des outils de téléchargement vidéo.

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

## Télécharger des vidéos

L'extension ajoute les boutons **↓ Download** et **↓ Transcript** sur les players vidéo de tous les sites (Skool, Whop, Wistia, Loom, YouTube…).

### Utilisation

1. Va sur une page contenant une vidéo
2. Clique sur **↓ Download** qui apparaît sur le player
3. Pour les vidéos **Mux**, **Loom** et **Wistia**, le téléchargement se fait directement dans le navigateur — aucun outil requis
4. Pour les embeds **YouTube**, copie la commande yt-dlp affichée et colle-la dans **PowerShell** (Windows) ou **Terminal** (Mac)

> **Astuce** : si Umbra ne détecte pas le stream, lance la vidéo une fois puis réessaie.

### yt-dlp (YouTube uniquement)

**Windows**

```powershell
winget install yt-dlp
```

**Mac**

```bash
brew install yt-dlp
```

### Transcription

1. Crée une clé sur [openrouter.ai/keys](https://openrouter.ai/keys)
2. Ouvre la page **Umbra Settings** (engrenage dans le popup) et colle la clé
3. Clique sur **↓ Transcript** sur le player — l'audio est extrait dans le navigateur, envoyé à Whisper (`openai/whisper-large-v3-turbo`), puis un fichier `.txt` et un fichier `.srt` (avec timestamps) sont téléchargés

> Fonctionne pour les vidéos **Mux**, **Loom** et **Wistia**. Les vidéos longues sont envoyées à l'API par morceaux de 10 minutes.

### Providers supportés

| Player                   | Download navigateur | Transcription |
|--------------------------|---------------------|---------------|
| Mux (player natif Skool/Whop) | ✅              | ✅            |
| Loom                     | ✅                   | ✅            |
| Wistia                   | ✅                   | ✅            |
| Vidalytics               | ✅                   | ✅            |
| YouTube                  | yt-dlp               | ❌            |

## Snapshot de page (HTML)

Depuis la popup (onglet **Video Download** → **↓ Download Page (HTML)**), sauvegarde la page en un **seul fichier `.html`** :

- Tout le CSS est inliné (y compris le CSS-in-JS type styled-components)
- Les images sont embarquées en `data:` URI (jusqu'à 40 Mo, sinon URL absolue)
- L'état des formulaires et les canvas sont préservés
- Tous les scripts sont supprimés (snapshot statique — les trackers avec)
- Fonctionne sur tous les sites
