var tabPanier = [];
var total = 0;
var panierContainer = document.querySelector('.panier_container');

const createArticle = (shoes, selecteur) => {
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
//Calculate TOTAL
const calculateTotal = () => {
	let cumul = 0;
	for (let i = 0; i < tabPanier.length; i++) {
		let quantity =
			tabPanier[i].quantity !== undefined ? tabPanier[i].quantity : 1;
		if (
			tabPanier[i].quantity === undefined ||
			tabPanier[i].quantity === null
		) {
			quantity = 1;
		} else {
			quantity = tabPanier[i].quantity;
		}
		cumul += parseFloat(tabPanier[i].prix * quantity);
	}
	total = cumul;
	let totalPrix = document.querySelector('.total .prix');
	totalPrix.textContent = total.toFixed(2);

	panierContainer.innerHTML = '';
	createArticlePanier(tabPanier);
};

const createArticlePanier = (tabPanier) => {
	panierContainer.innerHTML = '';
	for (let article of tabPanier) {
		let quantity = article.quantity !== undefined ? article.quantity : 1;
		let text = `<div class="mainContainer">
		<div class="imgContainer"><img src="${article.image}"/></div>
		<div class="textContainer"><p class="titre">${article.titre}</p><p class="prix">${article.prix} €</p><input type="number" min="1" max="100" value="${quantity}" class="quantity"/></div>
		<div class="deleteContainer"><i class="fa-solid fa-trash"></i></div>
		</div>`;
		let panier = document.querySelector('.panier_container');

		panier.insertAdjacentHTML('beforeend', text);
	}

	// Suppression
	var allPoubelle = document.querySelectorAll('.fa-trash');
	allPoubelle.forEach((poubelle) => {
		poubelle.addEventListener('click', () => {
			let titre =
				poubelle.parentElement.parentElement.children[1].children[0]
					.textContent;
			for (let i = 0; i < tabPanier.length; i++) {
				if (tabPanier[i].titre === titre) {
					tabPanier.splice(i, 1);
				}
			}
			panierContainer.innerHTML = '';
			createArticlePanier(tabPanier);
			calculateTotal();
			AfficherPaiement();
		});
	});

	//Quantité
	var allQuantity = document.querySelectorAll('.quantity');
	allQuantity.forEach((quantity) => {
		quantity.addEventListener('change', () => {
			let titre = quantity.parentElement.children[0].textContent;
			for (let i = 0; i < tabPanier.length; i++) {
				if (tabPanier[i].titre === titre) {
					tabPanier[i].quantity = parseFloat(quantity.value);
				}
			}
			calculateTotal();
		});
	});
};

const AfficherPaiement = () => {
	let paiement = document.querySelector('.paiement');
	paiement.style.display = tabPanier.length > 0 ? 'flex' : 'none';
};

const getShoes = (shoes) => {
	let articles = document.querySelector('.articles');
	for (let i = 0; i < shoes.length; i++) {
		createArticle(shoes[i], articles);
	}
};

getShoes(shoes);

//Ajouter
var allPanier = document.querySelectorAll('.imgPanier');
allPanier.forEach((panier) => {
	panier.addEventListener('click', () => {
		let articleContainer = panier.parentElement.parentElement;
		let titreArticle = articleContainer.children[1].children[0].textContent;

		var articleTrue;
		for (let article of shoes) {
			if (article.titre === titreArticle) {
				articleTrue = article;
			}
		}
		//Si la chaussure existe déjà on l'incrémente
		if (tabPanier.includes(articleTrue)) {
			alert("vous avez déjà ajouté cet article au panier, veuillez modifier sa quantité dans le panier");
		} else {
			//sinon on l'ajoute
			tabPanier.push(articleTrue);
			createArticlePanier(tabPanier);
			calculateTotal();
			AfficherPaiement();
		}
	});
});

//Afficher cmd prise en compte
let paiement = document.querySelector('.paiement');
paiement.addEventListener('click', () => {
	alert('Votre commande a bien été prise en compte');
});
