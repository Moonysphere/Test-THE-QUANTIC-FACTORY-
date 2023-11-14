
//pour fontaine 
document.addEventListener("DOMContentLoaded", async () => {
  //api  pour fontaine
  var result = await fetch(
    "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=100"
  );
  //traducteur de donner pour fontaine
  var data = await result.json();
  // console.log(data);

  





  document.getElementById("monFormulaireFontaine").addEventListener("submit", function (event) {


    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();
  
    // Récupére la valeur sélectionnée du menu déroulant (nombre)
    var choixNombre = document.getElementById("choixNombreFontaine").value;
  
    // Filtrer les résultats en fonction de la valeur sélectionnée
    var resultatsFiltres = data.results.filter(function (element) {
      var numeroArrondissement = parseInt(element.commune.match(/\d+/), 10);
      return numeroArrondissement === parseInt(choixNombre, 10);
    });
  
    // Afficher les résultats filtrés
    afficherResultats(resultatsFiltres);
  });
  
  // Fonction pour afficher les résultats dans la page
  function afficherResultats(resultats) {
    var containerResultats = document.getElementById("resultatsFontaine");
    // Effacer les résultats précédents
    containerResultats.innerHTML = '';
  

    // Ajouter les en-têtes
    var entetes = document.createElement("thead");
    var ligneEntete = document.createElement("tr");
    var celluleArrondissement = document.createElement("th");
    var celluleType = document.createElement("th");
    var celluleVoie = document.createElement("th");
  
    celluleArrondissement.textContent = "Arrondissement";
    celluleType.textContent = "Catégorie";
    celluleVoie.textContent = "Voie";
  
    ligneEntete.appendChild(celluleArrondissement);
    ligneEntete.appendChild(celluleType);
    ligneEntete.appendChild(celluleVoie);
  
    entetes.appendChild(ligneEntete);
    containerResultats.appendChild(entetes);
  


    // Vérifier s'il y a des résultats
    if (resultats.length === 0) {
      var ligne = document.createElement("tr");
      var cellule = document.createElement("td");
      cellule.textContent = "Pas disponible";
      ligne.appendChild(cellule);
      containerResultats.appendChild(ligne);
    } else {
      // Parcourir les résultats et les afficher
      resultats.forEach(function (element) {
        var ligne = document.createElement("tr");
        ligne.classList.add("resul");
        var celluleArrondissement = document.createElement("td");
        var celluleType = document.createElement("td");
        var celluleVoie = document.createElement("td");
  
        celluleArrondissement.textContent = element.commune.toLowerCase();
        celluleType.textContent = element.type_objet.toLowerCase().replace(/_/g, " ");
        celluleVoie.textContent = element.voie.toLowerCase();
        celluleVoie.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.voie)}" target="_blank">${element.voie.toLowerCase() || "Non disponible"}</a>`;

  
        ligne.appendChild(celluleArrondissement);
        ligne.appendChild(celluleType);
        ligne.appendChild(celluleVoie);
  
        containerResultats.appendChild(ligne);
      });
    }
  }
  
  
  
});








// pour espace vert 
document.addEventListener("DOMContentLoaded", async () => {
  //api  pour vert
  var result = await fetch(
    " https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=100"
  );
  //traducteur de donner pour vert
  var data = await result.json();

  //resultat pour vert
  // console.log(data);

  document.getElementById("monFormulaireVert").addEventListener("submit", function (event) {
    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();
  
    // Récupérer la valeur sélectionnée du menu déroulant (nombre)
    var choixNombre = document.getElementById("choixNombreVert").value;
    var choixType = document.getElementById("choixTypeVert").value; 
  
    // Filtrer les résultats en fonction des valeurs sélectionnées
    var resultatsFiltres = data.results.filter(function (element) {
      var numeroArrondissement = parseInt(element.arrondissement, 10);
      var arrondissementMatches = numeroArrondissement === parseInt(choixNombre, 10);
  
      var typeMatches = choixType === "Tous" || element.type.toLowerCase().includes(choixType.toLowerCase());
  
      return arrondissementMatches && typeMatches;
    });
  
    // Afficher les résultats filtrés
    afficherResultats(resultatsFiltres);
  });
  
  // Fonction pour afficher les résultats dans la page
  function afficherResultats(resultats) {
    var containerResultats = document.getElementById("resultatsVert");
    // Effacer les résultats précédents
    containerResultats.innerHTML = '';
  
    // Ajouter les en-têtes
    var entetes = document.createElement("thead");
    var ligneEntete = document.createElement("tr");
    var celluleArrondissement = document.createElement("th");
    var celluleType = document.createElement("th");
    var celluleNom = document.createElement("th");
    var celluleAdresse = document.createElement("th"); 
  
    celluleArrondissement.textContent = "Arrondissement";
    celluleType.textContent = "Catégorie";
    celluleNom.textContent = "Nom"; 
    celluleAdresse.textContent = "Adresse"; 

  
    ligneEntete.appendChild(celluleArrondissement);
    ligneEntete.appendChild(celluleType);
    ligneEntete.appendChild(celluleNom);
    ligneEntete.appendChild(celluleAdresse); 

  
    entetes.appendChild(ligneEntete);
    containerResultats.appendChild(entetes);
  
    // Vérifier s'il y a des résultats
    if (resultats.length === 0) {
      var ligne = document.createElement("tr");
      ligne.classList.add("resul");
      var cellule = document.createElement("td");
      cellule.colSpan = 3; 
      cellule.textContent = "Pas disponible";
      ligne.appendChild(cellule);
      containerResultats.appendChild(ligne);
    } else {
      // Trier les résultats par arrondissement
      resultats.sort(function (a, b) {
        return parseInt(a.arrondissement, 10) - parseInt(b.arrondissement, 10);
      });
  
      // Parcourir les résultats et les afficher
      resultats.forEach(function (element) {
        var ligne = document.createElement("tr");
        ligne.classList.add("resul");
        var celluleArrondissement = document.createElement("td");
        var celluleType = document.createElement("td");
        var celluleNom = document.createElement("td");
        var celluleAdresse = document.createElement("td"); 

  
        celluleArrondissement.textContent = ("0" + element.arrondissement).slice(-2);
        celluleType.textContent = element.type.toLowerCase().replace(/_/g, " ");
        celluleNom.textContent = element.nom.toLowerCase() || "Non disponible"; 
        celluleAdresse.textContent = element.adresse.toLowerCase() || "Non disponible"; 

        celluleAdresse.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.adresse)}" target="_blank">${element.adresse.toLowerCase() || "Non disponible"}</a>`;



        ligne.appendChild(celluleArrondissement);
        ligne.appendChild(celluleType);
        ligne.appendChild(celluleNom);
        ligne.appendChild(celluleAdresse); 

  
        containerResultats.appendChild(ligne);
      });
    }
  }
  
  // Fonction pour extraire les types uniques du tableau
  function extraireTypesUniques() {
    var types = new Set();
    data.results.forEach(function (element) {
      types.add(element.type);
    });
    return Array.from(types);
  }
  
  // Fonction pour mettre à jour les options du menu déroulant "Type"
  function mettreAJourOptionsType() {
    var selectType = document.getElementById("choixTypeVert");
    // Supprimer toutes les options existantes
    selectType.innerHTML = '';
  
    // Ajouter l'option "Tous"
    var optionTous = document.createElement("option");
    optionTous.value = "Tous";
    optionTous.textContent = "Tous";
    selectType.appendChild(optionTous);
  
    // Extraire les types uniques et ajouter chaque option au menu déroulant
    var typesUniques = extraireTypesUniques();
    typesUniques.forEach(function (type) {
      var option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      selectType.appendChild(option);
    });
  }
  
  // Fonction pour extraire les arrondissements uniques du tableau
  function extraireArrondissementsUniques() {
    var arrondissements = new Set();
    data.results.forEach(function (element) {
      arrondissements.add(element.arrondissement);
    });
    return Array.from(arrondissements);
  }
  
  // Fonction pour mettre à jour les options du menu déroulant "Arrondissement"
  function mettreAJourOptionsArrondissement() {
    var selectArrondissement = document.getElementById("choixNombreVert");
    // Supprimer toutes les options existantes
    selectArrondissement.innerHTML = '';
  
    // Extraire les arrondissements uniques et ajouter chaque option au menu déroulant
    var arrondissementsUniques = extraireArrondissementsUniques();
    arrondissementsUniques.sort(function (a, b) {
      return parseInt(a, 10) - parseInt(b, 10);
    });
  
    arrondissementsUniques.forEach(function (arrondissement) {
      var option = document.createElement("option");
      option.value = arrondissement;
      option.textContent = ("0" + arrondissement).slice(-2);
      selectArrondissement.appendChild(option);
    });
  }
  
  // Appeler les fonctions pour mettre à jour les options des menus déroulants au chargement de la page
  mettreAJourOptionsType();
  mettreAJourOptionsArrondissement();
    
  

});












// pour activiter
document.addEventListener("DOMContentLoaded", async () => {
  //api  pour vert
  var result = await fetch(
    " https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=100"
  );
  //traducteur de donner pour vert
  var data = await result.json();

  //resultat pour vert
  // console.log(data);

  document.getElementById("monFormulaireActiviter").addEventListener("submit", function (event) {
    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();
  
    // Récupérer les valeurs sélectionnées des menus déroulants
    var choixNombre = document.getElementById("choixNombreActiviter").value;
    var choixType = document.getElementById("choixTypeActiviter").value;
    var choixPayant = document.getElementById("choixPayantActiviter").value; 
  
    // Filtrer les résultats en fonction des valeurs sélectionnées
    var resultatsFiltres = data.results.filter(function (element) {
      var numeroArrondissement = parseInt(element.arrondissement, 10);
      var arrondissementMatches = numeroArrondissement === parseInt(choixNombre, 10);
  
      var typeMatches = choixType === "Tous" || element.type.toLowerCase().includes(choixType.toLowerCase());
      
      var payantMatches = choixPayant === "Tous" || element.payant.toLowerCase() === choixPayant.toLowerCase(); 
  
      return arrondissementMatches && typeMatches && payantMatches;
    });
  
    // Afficher les résultats filtrés
    afficherResultats(resultatsFiltres);
  });
  
  // Fonction pour afficher les résultats dans la page
  function afficherResultats(resultats) {
    var containerResultats = document.getElementById("resultatsActiviter");
    // Effacer les résultats précédents
    containerResultats.innerHTML = '';
  
    // Ajouter les en-têtes
    var entetes = document.createElement("thead");
    var ligneEntete = document.createElement("tr");
    var celluleArrondissement = document.createElement("th");
    var celluleType = document.createElement("th");
    var celluleNom = document.createElement("th");
    var celluleAdresse = document.createElement("th");
    var cellulePayant = document.createElement("th"); 
  
    celluleArrondissement.textContent = "Arrondissement";
    celluleType.textContent = "Catégorie";
    celluleNom.textContent = "Nom";
    celluleAdresse.textContent = "Adresse";
    cellulePayant.textContent = "Payant"; 
  
    ligneEntete.appendChild(celluleArrondissement);
    ligneEntete.appendChild(celluleType);
    ligneEntete.appendChild(celluleNom);
    ligneEntete.appendChild(celluleAdresse);
    ligneEntete.appendChild(cellulePayant); 
  
    entetes.appendChild(ligneEntete);
    containerResultats.appendChild(entetes);
  
    // Vérifier s'il y a des résultats
    if (resultats.length === 0) {
      var ligne = document.createElement("tr");
      var cellule = document.createElement("td");
      cellule.colSpan = 5; // Fusionner sur 5 colonnes
      cellule.textContent = "Pas disponible";
      ligne.appendChild(cellule);
      containerResultats.appendChild(ligne);
    } else {
      // Trier les résultats par arrondissement
      resultats.sort(function (a, b) {
        return parseInt(a.arrondissement, 10) - parseInt(b.arrondissement, 10);
      });
  
      // Parcourir les résultats et les afficher
      resultats.forEach(function (element) {
        var ligne = document.createElement("tr");
        ligne.classList.add("resul");
        var celluleArrondissement = document.createElement("td");
        var celluleType = document.createElement("td");
        var celluleNom = document.createElement("td");
        var celluleAdresse = document.createElement("td");
        var cellulePayant = document.createElement("td"); 
  
        celluleArrondissement.textContent = ("0" + element.arrondissement).slice(-2);
        celluleType.textContent = element.type.toLowerCase().replace(/_/g, " ");
        celluleNom.textContent = (element.nom || "Non disponible").toLowerCase();
        celluleAdresse.textContent = (element.adresse || "Non disponible").toLowerCase();
        cellulePayant.textContent = element.payant || "Non disponible";
        celluleAdresse.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.adresse)}" target="_blank">${element.adresse.toLowerCase() || "Non disponible"}</a>`;

  
        ligne.appendChild(celluleArrondissement);
        ligne.appendChild(celluleType);
        ligne.appendChild(celluleNom);
        ligne.appendChild(celluleAdresse);
        ligne.appendChild(cellulePayant); 
  
        containerResultats.appendChild(ligne);
      });
    }
  }
  
  // Fonction pour extraire les types uniques du tableau
  function extraireTypesUniques() {
    var types = new Set();
    data.results.forEach(function (element) {
      types.add(element.type);
    });
    return Array.from(types);
  }
  
  // Fonction pour extraire les arrondissements uniques du tableau
  function extraireArrondissementsUniques() {
    var arrondissements = new Set();
    data.results.forEach(function (element) {
      arrondissements.add(element.arrondissement);
    });
    return Array.from(arrondissements);
  }
  
  // Fonction pour extraire les choix payant ou non uniques du tableau
  function extrairePayantUniques() {
    var payants = new Set();
    data.results.forEach(function (element) {
      payants.add(element.payant);
    });
    return Array.from(payants);
  }
  
  // Fonction pour mettre à jour les options du menu déroulant "Type"
  function mettreAJourOptionsType() {
    var selectType = document.getElementById("choixTypeActiviter");
    // Supprimer toutes les options existantes
    selectType.innerHTML = '';
  
    // Ajouter l'option "Tous"
    var optionTous = document.createElement("option");
    optionTous.value = "Tous";
    optionTous.textContent = "Tous";
    selectType.appendChild(optionTous);
  
    // Extraire les types uniques et ajouter chaque option au menu déroulant
    var typesUniques = extraireTypesUniques();
    typesUniques.forEach(function (type) {
      var option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      selectType.appendChild(option);
    });
  }
  
  // Fonction pour mettre à jour les options du menu déroulant "Arrondissement"
  function mettreAJourOptionsArrondissement() {
    var selectArrondissement = document.getElementById("choixNombreActiviter");
    // Supprimer toutes les options existantes
    selectArrondissement.innerHTML = '';
  
    // Extraire les arrondissements uniques et ajouter chaque option au menu déroulant
    var arrondissementsUniques = extraireArrondissementsUniques();
    arrondissementsUniques.sort(function (a, b) {
      return parseInt(a, 10) - parseInt(b, 10);
    });
  
    arrondissementsUniques.forEach(function (arrondissement) {
      var option = document.createElement("option");
      option.value = arrondissement;
      option.textContent = ("0" + arrondissement).slice(-2);
      selectArrondissement.appendChild(option);
    });
  }
  
  // Fonction pour mettre à jour les options du menu déroulant "Payant"
  function mettreAJourOptionsPayant() {
    var selectPayant = document.getElementById("choixPayantActiviter");
    // Supprimer toutes les options existantes
    selectPayant.innerHTML = '';
  
    // Ajouter l'option "Tous"
    var optionTous = document.createElement("option");
    optionTous.value = "Tous";
    optionTous.textContent = "Tous";
    selectPayant.appendChild(optionTous);
  
    // Extraire les choix payant ou non uniques et ajouter chaque option au menu déroulant
    var payantsUniques = extrairePayantUniques();
    payantsUniques.forEach(function (payant) {
      var option = document.createElement("option");
      option.value = payant;
      option.textContent = payant;
      selectPayant.appendChild(option);
    });
  }
  
  // Appeler les fonctions pour mettre à jour les options des menus déroulants au chargement de la page
  mettreAJourOptionsType();
  mettreAJourOptionsArrondissement();
  mettreAJourOptionsPayant();
  
  

  
});


// Onglet
const tabs = [...document.querySelectorAll(".tab")];

tabs.forEach((tab) => tab.addEventListener("click", tabsAnimation));

function tabsAnimation(e) {
  const tabContenet = [...document.querySelectorAll(".tab-content")];

  const indexToRemove = tabs.findIndex((tab) =>
    tab.classList.contains("active-tab")
  );

  tabs[indexToRemove].classList.remove("active-tab");
  tabContenet[indexToRemove].classList.remove("active-tab-content");

  const indexToShow = tabs.indexOf(e.target);

  tabs[indexToShow].classList.add("active-tab");
  tabContenet[indexToShow].classList.add("active-tab-content");
}

