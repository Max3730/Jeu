# 🚀 QuizMaster - Setup Firebase pour Vercel

## Étape 1: Créer un projet Firebase

1. Allez sur https://console.firebase.google.com
2. Cliquez sur **"Créer un projet"**
3. Nommez-le `quizmaster` (ou ce que vous voulez)
4. Acceptez les conditions et créez le projet

## Étape 2: Activer Realtime Database

1. Dans la console Firebase, allez dans **"Realtime Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez la localisation (ex: Europe)
4. Sélectionnez **"Démarrer en mode test"** (pour dev, puis sécuriser plus tard)
5. Validez

## Étape 3: Récupérer votre configuration

1. Dans la console Firebase, allez dans **"Paramètres du projet"** (roue ⚙️)
2. Allez dans l'onglet **"Applications"**
3. Cliquez sur **"Ajouter une application"** → **Web**
4. Nommez votre app `quizmaster-app`
5. Copiez le bloc de configuration qui s'affiche

Ça ressemble à ceci :
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "quizmaster-xxx.firebaseapp.com",
  databaseURL: "https://quizmaster-xxx.firebaseio.com",
  projectId: "quizmaster-xxx",
  storageBucket: "quizmaster-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

## Étape 4: Configurer votre app

1. Ouvrez le fichier `config.js` 
2. Remplacez les valeurs `YOUR_*` par vos vraies credentials Firebase
3. **NE PAS COMMITER CECI EN PUBLIC** (ajouter à .gitignore)

## Étape 5: Tester localement

Maintenant, ouvrez simplement les fichiers:
- `quiz.html` pour les joueurs
- `admin.html` pour l'admin (mot de passe: `admin2024`)

✨ **Ça devrait synchroniser en temps réel maintenant !**

---

## Règles de sécurité Firebase (Recommandé)

Une fois en production, protégez votre database. Allez dans **Realtime Database** → **Règles** et remplacez par:

```json
{
  "rules": {
    "gameState": {
      ".read": true,
      ".write": false
    },
    "players": {
      ".read": true,
      ".write": true
    }
  }
}
```

⚠️ **Note**: Cette config est permissive pour dev. À améliorer pour production !

---

## Déployer sur Vercel

1. Créez un repo GitHub avec vos fichiers
2. Connectez-le à Vercel (vercel.com → import project)
3. Les fichiers HTML seront servis directement ✨

### .gitignore (ajouter):
```
config.js
.DS_Store
node_modules/
```

Attendez, vous avez `config.js` en production ? À la place :

**Meilleure approche** : Utilisez des variables d'env Vercel
1. Dans Vercel: Settings → Environment Variables
2. Ajoutez: `VITE_FIREBASE_CONFIG` (encodée en JSON)
3. Créez un `config.js` dynamique qui la charge

Ou plus simplement : mettez `config.js` directement avec des secrets Firebase mais marqué public (les credentials Web Firebase sont publiques par design).

---

## Changer le mot de passe admin

Ouvrez `admin.html` et changez cette ligne:
```javascript
const ADMIN_PASSWORD = "admin2024";
```

---

## Questions?

- **Firebase pas accessible ?** Vérifiez votre databaseURL dans config.js
- **Règles d'écriture refusées ?** Passez en mode test d'abord
- **Les données ne sync pas ?** Rafraîchissez la page et vérifiez la console (F12)
