//	VARIABLES GLOBALES
var cumul = 0;
var panierContainer = document.querySelector('.panier_container');
let panierV = document.querySelector('.panier');
var panier = [];

//	FONCTIONS REUTILISABLES
const prixTotal = () => {
	let cumulation = 0;
	for (let article of panier) {
		cumulation += article.prix * article.quantité;
	}
	return cumulation;
};
//	FONCTIONS
const mettreAJourStorage = () => {
	localStorage.setItem('panier', JSON.stringify(panier));
};

const indiqueNombreArticleDansPanier = () => {
	let iconeCadeau = document.querySelector('.panierPetit');
	let sauvegardeLongeurPanier = iconeCadeau.textContent;
	setTimeout(() => {
		if (sauvegardeLongeurPanier < panier.length) {
			alert('Vous avez ajouté un article.');
		} else {
		}
	}, 50);

	iconeCadeau.textContent = panier.length;
};

const modifierQuantitee = () => {
	var quantités = document.querySelectorAll('.quantity');
	quantités.forEach((quantité) => {
		quantité.addEventListener('change', () => {
			let nomArticleQuantité =
				quantité.parentElement.firstElementChild.textContent;
			for (let article of panier) {
				if (article.nom === nomArticleQuantité) {
					if (quantité.value >= 1 && quantité.value <= 100) {
						article.quantité = quantité.value;
						mettreAJourStorage();
					} else {
						alert("choisir un nombre d'articles entre 1 et 100");
						quantité.value = article.quantité;
					}
					cumul = prixTotal();
					afficherPanier();
				}
			}
		});
	});
	mettreAJourStorage();
};

const supprimerArticle = () => {
	var poubelles = document.querySelectorAll('.fa-trash');
	poubelles.forEach((poubelle) => {
		poubelle.addEventListener('click', () => {
			let ancetrePoubelle = poubelle.closest('.mainContainer');
			let nomArticlePoubelle =
				ancetrePoubelle.children[1].firstElementChild.textContent;
			for (let i = 0; i < panier.length; i++) {
				if (panier[i].nom === nomArticlePoubelle) {
					panier.splice(i, 1);
					mettreAJourStorage();
					afficherPanier();
					var panierDiv = document.querySelector('.panier');
					cumul = 0;
					let paiement = document.querySelector('.paiement');
					paiement.style.display =
						panier.length > 0 ? 'flex' : 'none';
					indiqueNombreArticleDansPanier();
					for (let article of panier) {
						if (panier !== null) {
							cumul += article.prix * article.quantité;
						} else {
							cumul = 0;
						}
						afficherPanier();
					}
				}
			}
		});
	});
};

const afficherPanier = () => {
	// si le panier est vide, on affiche panier vide et 0€
	if (panier.length === 0) {
		panierContainer.innerHTML = 'Panier vide';
		let total = document.querySelector('.total .prix');
		total.textContent = '0.00';
		return;
	}
	panierContainer.innerHTML = '';
	for (let article of panier) {
		let text = `<div class="mainContainer">
<div class="imgContainer"><img src="${article.image}"/></div>
<div class="textContainer"><p class="titre">${article.nom}</p><p class="prix">${article.prix} €</p><input type="number" min="1" max="100" value="${article.quantité}" class="quantity"/></div>
<div class="deleteContainer"><i class="fa-solid fa-trash"></i></div>
</div>`;
		panierContainer.insertAdjacentHTML('beforeend', text);
	}
	let total = document.querySelector('.total .prix');
	cumul = prixTotal();
	total.textContent = cumul.toFixed(2);

	modifierQuantitee();
	supprimerArticle();
	mettreAJourStorage();

	//	afficher paiement ou non
	let paiement = document.querySelector('.paiement');
	paiement.style.display = panier.length > 0 ? 'flex' : 'none';
};

function afficherVitrine() {
	var articles = document.querySelector('.articles');
	for (let chaussure of chaussures) {
		creationVitrine(chaussure, articles);
	}
}

function recuperationPanierDansStorage() {
	if (localStorage.getItem('panier')) {
		panier = JSON.parse(localStorage.getItem('panier'));
	}
}

function ajouterArticleDansPanier() {
	var caddies = document.querySelectorAll('.imgPanier');
	caddies.forEach((caddie) => {
		caddie.addEventListener('click', () => {
			//creation d'un objet avec les propriétés de l'article
			const articleSelectionné = {};
			let caddie_ancestor = caddie.closest('.article_container');
			articleSelectionné.nom =
				caddie_ancestor.children[1].firstElementChild.textContent;
			for (let chaussure of chaussures) {
				if (chaussure.titre === articleSelectionné.nom) {
					articleSelectionné.image = chaussure.image;
					articleSelectionné.prix = chaussure.prix;
					articleSelectionné.quantité = chaussure.quantity;
				}
			}
			const déjàDansLePanier = panier.some(
				(item) => item.nom === articleSelectionné.nom
			);
			if (déjàDansLePanier) {
				for (let panierSelection of panier) {
					if (panierSelection.nom === articleSelectionné.nom) {
						panierSelection.quantité++;
					}
				}
			} else {
				//ajout au tableau du panier
				panier.push(articleSelectionné);
			}

			mettreAJourStorage();

			afficherPanier();

			indiqueNombreArticleDansPanier();

			let paiement = document.querySelector('.paiement');
			paiement.style.display = panier.length > 0 ? 'flex' : 'none';
		});
	});
}

function changementMenu() {
	var toggle = false;
	panierReduit.addEventListener('click', () => {
		toggle = !toggle;

		if (toggle) {
			articlesContainer.style.display = 'none';
			panierV.style.display = 'flex';
		} else {
			articlesContainer.style.display = 'flex';
			panierV.style.display = 'none';
		}
	});
}

function afficherLePaiement() {
	let paiement = document.querySelector('.paiement');
	paiement.addEventListener('click', () => {
		alert('Votre commande a bien été prise en compte');
	});
}

//	CODE
afficherVitrine();
recuperationPanierDansStorage();
indiqueNombreArticleDansPanier();
cumul = prixTotal();
afficherPanier();
ajouterArticleDansPanier();

// AFFICHAGE ARTICLES OU PANIER
let panierReduit = document.getElementById('panierReduit');
let articlesContainer = document.querySelector('.articles');

changementMenu();
afficherLePaiement();

