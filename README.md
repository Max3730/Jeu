# 🎮 QuizMaster — Quiz Multijoueur Temps Réel

Une application de quiz culture générale **multijoueur en temps réel** avec:
- ⚡ Synchronisation Firebase Realtime
- 🎯 60 questions variées (géographie, sciences, histoire, sport, etc.)
- 🏆 Leaderboard live
- 🔐 Panel admin sécurisé
- 📊 Export CSV des scores
- 📱 Responsive design

---

## 📋 Fichiers

- `quiz.html` → Page joueur (entrer le nom, jouer)
- `admin.html` → Panel admin (contrôler le jeu, voir les stats)
- `config.js` → Configuration Firebase (à remplir !)
- `SETUP_FIREBASE.md` → Guide complet setup

---

## 🚀 Démarrage rapide

### 1. Setup Firebase
Suivez le guide [SETUP_FIREBASE.md](SETUP_FIREBASE.md)

### 2. Lancer localement
Ouvrez simplement:
- `quiz.html` pour jouer
- `admin.html` pour contrôler

### 3. Déployer sur Vercel
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
# Connectez-le à Vercel
```

---

## 🎮 Comment jouer

### Joueur
1. Ouvrez `quiz.html`
2. Entrez votre prénom (min 2 caractères)
3. Attendez que l'admin lance la partie
4. Répondez aux 15 questions en 12 secondes chacune
5. Voyez votre score et le classement

### Admin
1. Ouvrez `admin.html`
2. Entrez le mot de passe: `admin2024` (changez-le!)
3. Voyez les joueurs inscrits et leurs stats
4. Cliquez "🚀 Lancer la partie" pour démarrer
5. Exportez en CSV si besoin

---

## ⚙️ Fonctionnalités

| Fonctionnalité | Statut |
|---|---|
| Quiz 15 questions | ✅ |
| 60 questions varices | ✅ |
| Timer par question | ✅ |
| Scoring système | ✅ |
| Leaderboard live | ✅ |
| Sync temps réel | ✅ (Firebase) |
| Admin panel | ✅ |
| Export CSV | ✅ |
| Responsive | ✅ |
| Multi-joueurs | ✅ |

---

## 🔐 Sécurité

- Admin protégé par mot de passe
- Credentials Firebase en config.js (à ne pas commiter)
- XSS prevention (escapeHtml)
- Règles Realtime Database en mode test par défaut

**⚠️ À sécuriser avant production:**
- Ajouter auth Firebase
- Implémenter rules de sécurité strictes
- Utiliser variables d'env pour credentials

---

## 📊 Scoring

- 5 points par bonne réponse
- 0 points par mauvaise réponse
- Bonus temporel optionnel (à implémenter)

---

## 🌐 Déploiement Vercel

1. Créez repo GitHub
2. Allez sur vercel.com
3. Importez le repo
4. Les fichiers HTML seront servis directement
5. Partagez le lien!

**URL finale ressemblera à:** `https://quizmaster.vercel.app/quiz.html`

---

## 🛠️ Customisation

### Changer le mot de passe admin
Éditez `admin.html`:
```javascript
const ADMIN_PASSWORD = "votre_nouveau_mdp";
```

### Ajouter des questions
Éditez la section `QUESTIONS` dans `quiz.html`:
```javascript
const QUESTIONS = [
  { q:"Question?", opts:["A","B","C","D"], ans:0, cat:"🌍 Catégorie" },
  // ...
];
```

### Changer les couleurs
Modifiez les CSS variables en haut de chaque fichier:
```css
:root {
  --accent: #f5c518;
  --accent2: #e84393;
  // ...
}
```

---

## 📱 Technologies

- HTML5 / CSS3 / Vanilla JS
- Firebase Realtime Database
- localStorage (fallback)
- Responsive Design (mobile-first)

---

## 📝 Améliorations futures

- [ ] Authentification Firebase
- [ ] Photos de profil joueurs
- [ ] Badges/achievements
- [ ] Catégories sélectionnables
- [ ] Différents niveaux de difficulté
- [ ] Chat en temps réel
- [ ] Historique des parties
- [ ] API backend Node.js

---

## 📄 Licence

Libre d'usage. À adapter comme vous voulez!

---

## 💬 Support

Si questions, vérifiez:
1. config.js est correctement rempli
2. Firebase Realtime Database est activée
3. Pas d'erreurs en console (F12)
4. Pas de CORS issues
