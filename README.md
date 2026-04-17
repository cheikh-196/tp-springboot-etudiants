# 🎓 TP Spring Boot : Gestion des Étudiants

Ce projet est une solution complète au Travail Pratique (TP) sur le développement d'une API REST avec Spring Boot. Il intègre l'ensemble du socle de base demandé ainsi que toutes les **améliorations** (Pagination, Recherche) et le **Bonus** (Relation ManyToMany et Frontend).

## 🚀 Fonctionnalités implémentées

- **Modélisation de données (JPA/Hibernate) :** Entités `Student` et `Course` avec une relation `@ManyToMany`.
- **API REST Complète (CRUD) :**
  - `POST /students` : Ajout avec validation de données (`@Valid`, nom > 2 car., email).
  - `GET /students` : Liste complète.
  - `GET /students/{id}` : Récupérer un étudiant.
  - `DELETE /students/{id}` : Suppression.
- **Améliorations (⭐) :**
  - `PUT /students/{id}` : Modification robuste via l'usage d'un objet de transfert (`StudentDTO`).
  - `GET /students/search?name=...` : Recherche par prénom/nom.
  - `GET /students/page?page=0&size=5` : Pagination des résultats.
- **Gestion Globale des Erreurs :** Utilisation de `@ControllerAdvice` et `@ExceptionHandler` pour formater les erreurs d'exécution (ex: 404, données invalides).
- **Frontend Dédié (Super Bonus) :** Une magnifique interface web (`HTML/CSS/JS` Vanilla + Glassmorphism) servie nativement par Spring Boot.

## 🛠️ Technologies
- **Java 21**
- **Spring Boot 3.x**
- **Spring Web** (API REST)
- **Spring Data JPA** (Persistance des données)
- **Base de données H2** (En mémoire)
- **Spring Validation**

---

## 🏃‍♂️ Comment lancer le projet

1. Clonez ce dépôt.
2. Ouvrez un terminal à la racine du projet.
3. Lancez l'application en utilisant le wrapper Maven :
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
4. Une fois lancé (Port `8080`), vous pouvez :
   - Accéder à la base de données H2 sur `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`).
   - Accéder à la magnifique **Interface Web Frontend** sur `http://localhost:8080`.

---

## 📝 Réponses aux questions de réflexion (Partie 8)

1. **`@RestController` vs `@Controller` :** `@Controller` est fait pour retourner une "Vue" HTML complète générée côté serveur (Thymeleaf). `@RestController` combine `@Controller` + `@ResponseBody` et retourne directement la donnée brute convertie en JSON, ce qui est idéal pour une API REST.
2. **Utilité du DTO :** Les *Data Transfer Objects* sécurisent l'API. Ils cachent des propriétés internes et préviennent "l'over-posting" (quand un utilisateur tente d'écraser des champs protégés, comme un ID ou un statut d'administration).
3. **Le rôle de `@Transactional` :** Assure qu'un groupe de requêtes SQL s'exécute comme une seule unité (Atomicité). Si la moindre sous-opération échoue, toute la transaction est annulée (*rollback*), protégeant ainsi l'intégrité de la base de données.
4. **`findById()` vs `getById()` :** `findById()` exécute la requête immédiatement pour récupérer l'entité (`Optional`), alors que `getById()` (désormais `getReferenceById()`) charge l'entité de façon paresseuse (Lazy Proxy) et ne lance le SQL qu'au moment d'accéder aux propriétés.
5. **Utilité de `@Valid` :** Rejet automatique des requêtes entrantes ne respectant pas les règles imposées (`@Email`, `@Size`, etc.) avant même que la requête n'atteigne le Controller et la base de données.
