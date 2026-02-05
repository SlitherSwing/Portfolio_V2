(function () {
    const slideTimeout = 2500;
    const $slides = document.querySelectorAll('.Slide');
    let intervalId;
    let currentSlide = 1;
    function slideTo(index) {
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
    }
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }

    intervalId = setInterval(showSlide, slideTimeout)
    $slides.forEach($elt => {
        let startX;
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        });
    })
()





// Bouton favori
    const produitBoutonFavori = document.querySelector('.Produit_Bouton_Favori');

    produitBoutonFavori.addEventListener('click', function() {
        this.classList.toggle('Actif');
    });

    // Sélection poids
    const poidsOptions = document.querySelectorAll('.Produit_Bouton_Poids');

    poidsOptions.forEach(function(bouton) {
        bouton.addEventListener('click', function() {

            poidsOptions.forEach(function(btn) {
                btn.classList.remove('Actif');
            });
            this.classList.add('Actif');
        });
    });

    // Modification de la valeur à ajouter au panier 
    const boutonPlus = document.querySelector('.Produit_Bouton_Plus');
    const boutonMoins = document.querySelector('.Produit_Bouton_Moins');
    const entreeQuantite = document.querySelector('.Produit_Entree_Quantite');

    boutonPlus.addEventListener('click', function() {
        entreeQuantite.value = parseInt(entreeQuantite.value) + 1;
    });

    boutonMoins.addEventListener('click', function() {
        entreeQuantite.value = Math.max(1, parseInt(entreeQuantite.value) - 1);
    });
    // Choix description
    const boutonDescription = document.querySelectorAll('.Produit_Description_Choix p');

    boutonDescription.forEach(function(btn) {
        btn.addEventListener('click', function() {

            boutonDescription.forEach(function(btn) {
                btn.classList.remove('Actif');
            });
            this.classList.add('Actif');
        });
    });

    // Initialisation du panier dans le localStorage s'il n'existe pas
        var cart = {};
cart.products = [];

localStorage.setItem('cart', JSON.stringify(cart));

const boutonAjouterPanier = document.getElementsByClassName('Produit_Bouton_Ajouter')[0];
boutonAjouterPanier.addEventListener('click', function() {
    // Récupère les informations du produit
    const nomProduit = document.querySelector('.Produit_Fiche h4').textContent;
    const prixProduit = document.querySelector('.Produit_Fiche h5').textContent;
    const brandProduit = document.querySelector('.Produit_Fiche h6 span').textContent;
    const quantite = parseInt(document.querySelector('.Produit_Entree_Quantite').value);
    
    // Récupère le poids sélectionné
    const poidsSelectionne = document.querySelector('.Produit_Bouton_Poids.Actif');
    const poids = poidsSelectionne ? poidsSelectionne.textContent : '100g';
    
    // Récupère l'image du produit
    const imageProduit = document.querySelector('.Produit_Image img').src;
    
    // Crée l'objet produit
    const produit = {
        nom: nomProduit,
        prix: prixProduit,
        brand: brandProduit,
        poids: poids,
        quantite: quantite,
        image: imageProduit,
        id: Date.now() // ID unique basé sur le timestamp
    };
    
    // Récupère le panier existant ou crée un nouveau
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    
    // Vérifie si le produit existe déjà dans le panier (même nom et même poids)
    const produitExistant = panier.find(p => p.nom === produit.nom && p.poids === produit.poids);
    
    if (produitExistant) {
        // Si le produit existe, augmente la quantité
        produitExistant.quantite += quantite;
    } else {
        // Sinon, ajoute le nouveau produit
        panier.push(produit);
    }
    
    // Sauvegarde le panier dans localStorage
    localStorage.setItem('panier', JSON.stringify(panier));
    
    // Affiche un message de confirmation
    alert('Produit ajouté au panier !');
    
    // Optionnel : affiche le contenu du panier dans la console
    console.log('Panier actuel:', panier);
});


function gererGalerieMobile() {
    const principale = document.querySelector('.Produit_Image_Principale');
    const miniatures = document.querySelector('.Produit_Miniatures');
    const pictures = document.querySelectorAll('.Produit_Image > picture img');

    if (window.innerWidth <= 800) {
        if (principale && miniatures && pictures.length > 0 && miniatures.children.length === 0) {
            // Affiche la première image en grand
            principale.innerHTML = '<img src="' + pictures[0].src + '" alt="' + pictures[0].alt + '">';
            
            // Crée les miniatures

            for (let index = 0; index < 3 && index < pictures.length; index++) {
                const img = pictures[index];
                const mini = document.createElement('img');
                mini.src = img.src;
                mini.alt = img.alt;
                if (index === 0) mini.className = 'active';
                
                // Clic sur miniature
                mini.onclick = function() {
                    principale.innerHTML = '<img src="' + this.src + '" alt="' + this.alt + '">';
                    document.querySelectorAll('.Produit_Miniatures img').forEach(function(m) {
                        m.classList.remove('active');
                    });
                    this.classList.add('active');
                };
                
                miniatures.appendChild(mini);
            };
        }
    } else {

        if (principale) {
            principale.innerHTML = '';
        }
        if (miniatures) {
            miniatures.innerHTML = '';
        }
    }
}

gererGalerieMobile();

window.addEventListener('resize', function() {
    gererGalerieMobile();
});
