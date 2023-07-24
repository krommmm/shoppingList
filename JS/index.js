var cumul = 0;

// CREATION des articles avec le DOM
const creationVitrine = (shoes, selecteur) => {
	let container = document.createElement('div');
	let imgContainer = document.createElement('div');
	let image = document.createElement('img');
	let textContainer = document.createElement('div');
	let titre = document.createElement('p');
	let prix = document.createElement('p');
	let logoPanier = document.createElement('div');
	let imagePanier = document.createElement('img');

	container.className = 'article_container';
	imgContainer.className = 'img_container';
	image.className = 'imgProduct';
	textContainer.className = 'text_container';
	titre.className = 'titre';
	prix.className = 'prix';
	logoPanier.className = 'logoPanier_container';
	imagePanier.className = 'imgPanier';

	image.setAttribute('src', `${shoes.image}`);
	imagePanier.setAttribute('src', `./assets/panier.png`);

	let titreNode = document.createTextNode(`${shoes.titre}`);
	let prixNode = document.createTextNode(`${shoes.prix} €`);

	titre.appendChild(titreNode);
	prix.appendChild(prixNode);

	imgContainer.appendChild(image);
	textContainer.appendChild(titre);
	textContainer.appendChild(prix);
	container.appendChild(logoPanier);
	logoPanier.appendChild(imagePanier);
	container.appendChild(imgContainer);
	container.appendChild(textContainer);
	container.appendChild(logoPanier);
	selecteur.appendChild(container);
};
const afficherPanier = () => {
	// si le panier est vide, on affiche panier vide et 0€
	if (panier.length === 0) {
		document.querySelector('.panier_container').innerHTML = 'Panier vide';
		let total = document.querySelector('.total .prix');
		total.textContent = '0.00';
		return;
	}
	document.querySelector('.panier_container').innerHTML = '';
	for (let article of panier) {
		let text = `<div class="mainContainer">
<div class="imgContainer"><img src="${article.image}"/></div>
<div class="textContainer"><p class="titre">${article.nom}</p><p class="prix">${article.prix} €</p><input type="number" min="1" max="100" value="${article.quantité}" class="quantity"/></div>
<div class="deleteContainer"><i class="fa-solid fa-trash"></i></div>
</div>`;
		let panier = document.querySelector('.panier_container');
		panier.insertAdjacentHTML('beforeend', text);
	}

	let total = document.querySelector('.total .prix');
	total.textContent = cumul.toFixed(2);

	// #### MODIFIER QUANTITE
	var quantités = document.querySelectorAll('.quantity');
	quantités.forEach((quantité) => {
		quantité.addEventListener('change', () => {
			let nomArticleQuantité =
				quantité.parentElement.firstElementChild.textContent;
			for (let article of panier) {
				if (article.nom === nomArticleQuantité) {
					if (quantité.value >= 1 && quantité.value <= 100) {
						article.quantité = quantité.value;
						localStorage.setItem('panier', JSON.stringify(panier));
					} else {
						alert("choisir un nombre d'articles entre 1 et 100");
						quantité.value = article.quantité;
					}
					// #### Calculer le total :
					cumul = 0;
					for (let article of panier) {
						cumul += article.prix * article.quantité;
					}
					afficherPanier();
				}
			}
		});
	});
	localStorage.setItem('panier', JSON.stringify(panier));

	// #### SUPPRIMER UN ARTICLE
	var poubelles = document.querySelectorAll('.fa-trash');
	poubelles.forEach((poubelle) => {
		poubelle.addEventListener('click', () => {
			let ancetrePoubelle = poubelle.closest('.mainContainer');
			let nomArticlePoubelle =
				ancetrePoubelle.children[1].firstElementChild.textContent;
			for (let i = 0; i < panier.length; i++) {
				if (panier[i].nom === nomArticlePoubelle) {
					panier.splice(i, 1);
					localStorage.setItem('panier', JSON.stringify(panier));
					afficherPanier();
					var panierDiv = document.querySelector('.panier');
					cumul = 0;
					let iconeCadeau = document.querySelector('.fa-gift');
					if (panier.length===0) {
						iconeCadeau.style.visibility = 'hidden';
					} else {
						iconeCadeau.style.visibility = 'visible';
					}
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

// #### AFFICHAGE DES CHAUSSURES EN VITRINE :
var articles = document.querySelector('.articles');
for (let chaussure of chaussures) {
	creationVitrine(chaussure, articles);
}

// #### RECUPERATION DU PANIER DANS LE STORAGE :
var panier = [];

if (localStorage.getItem('panier')) {
	panier = JSON.parse(localStorage.getItem('panier'));
}

let iconeCadeau = document.querySelector('.fa-gift');
if (panier.length === 0) {
	iconeCadeau.style.visibility = 'hidden';
} else {
	iconeCadeau.style.visibility = 'visible';
}

// #### Calculer le total :
var panierDiv = document.querySelector('.panier');
cumul = 0;
for (let article of panier) {
	cumul += article.prix * article.quantité;
}
afficherPanier();

// #### AJOUTER :
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
		//transfert du tableau du panier ds le storage
		localStorage.setItem('panier', JSON.stringify(panier));
		alert('Vous avez ajouté un article.');
		afficherPanier();
		// #### Calculer le total :
		var panierDiv = document.querySelector('.panier');
		cumul = 0;
		for (let article of panier) {
			cumul += article.prix * article.quantité;
		}
		afficherPanier();
		let iconeCadeau = document.querySelector('.fa-gift');
		if (localStorage.getItem('panier')) {
			iconeCadeau.style.visibility = 'visible';
		} else {
			iconeCadeau.style.visibility = 'hidden';
		}
	});
});

afficherPanier();

// #### CHANGEMENT AFFICHAGE ARTICLES OU PANIER
let panierReduit = document.getElementById('panierReduit');
let articlesContainer = document.querySelector('.articles');
let panierContainer = document.querySelector('.panier');
var toggle = false;
panierReduit.addEventListener('click', () => {
	toggle = !toggle;

	if (toggle) {
		articlesContainer.style.display = 'none';
		panierContainer.style.display = 'flex';
	} else {
		articlesContainer.style.display = 'flex';
		panierContainer.style.display = 'none';
	}
});
