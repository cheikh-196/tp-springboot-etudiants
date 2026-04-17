// Configuration de base vers notre backend Spring Boot
const apiUrl = '/students';

const studentList = document.getElementById('student-list');
const studentForm = document.getElementById('student-form');
const searchInput = document.getElementById('searchInput');
const errorMessage = document.getElementById('error-message');

/**
 * Récupère les étudiants depuis l'API REST (GET)
 * @param {string} query Optionnel: Terme de recherche
 */
async function fetchStudents(query = '') {
    try {
        let url = apiUrl;
        if (query.trim() !== '') {
            url = `${apiUrl}/search?name=${encodeURIComponent(query)}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur réseau / API injoignable');
        
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        console.error(error);
        studentList.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#fb7185;">Impossible de joindre le serveur Spring Boot. Assurez-vous qu'il tourne.</td></tr>`;
    }
}

/**
 * Construit les balises HTML <tr> pour le tableau
 */
function renderTable(students) {
    studentList.innerHTML = '';
    
    if (students.length === 0) {
        studentList.innerHTML = `<tr><td colspan="4" style="text-align:center; opacity:0.6; padding: 20px;">La liste est vide, ajoutez un étudiant ci-dessus !</td></tr>`;
        return;
    }

    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span style="opacity:0.6">#</span>${student.id}</td>
            <td style="font-weight:600; color:#fff;">${student.name}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn-danger" onclick="deleteStudent(${student.id})">Supprimer</button>
            </td>
        `;
        studentList.appendChild(tr);
    });
}

/**
 * Écoute la soumission du formulaire pour créer un étudiant (POST)
 */
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.classList.add('hidden');
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // On transforme notre objet JS en chaîne JSON
            body: JSON.stringify({ name, email }) 
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Erreur lors de la création de l\'étudiant');
        }

        // Succès : on nettoie le formulaire et on rafraîchit
        studentForm.reset();
        fetchStudents();
        document.getElementById('name').focus();
        
    } catch (error) {
        console.error(error);
        errorMessage.textContent = "Erreur: " + error.message;
        errorMessage.classList.remove('hidden');
    }
});

/**
 * Demande la suppression d'un étudiant à l'API (DELETE)
 */
async function deleteStudent(id) {
    if (!confirm('Voulez-vous vraiment expulser (effacer) cet étudiant ?')) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchStudents(); // Re-charge la liste
        } else {
            alert("Erreur lors de la suppression.");
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Écoute la barre de recherche (avec un léger délai pour ne pas spammer le Backend)
 */
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value;
    searchTimeout = setTimeout(() => {
        fetchStudents(query);
    }, 300); // 300ms de délai
});

// -- Lancement Initial --
fetchStudents();
