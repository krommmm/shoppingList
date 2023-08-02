// CREATION DES ARTICLES
const creationVitrine = (shoes, selecteur) => {
	
	const creatingElement = (tag, className) => {
		const varName = document.createElement(tag);
		varName.className = className;
		return varName;
	};

	let container = creatingElement('div', 'article_container');
	let imgContainer = creatingElement('div', 'img_container');
	let image = creatingElement('img', 'imgProduct');
	let textContainer = creatingElement('div', 'text_container');
	let titre = creatingElement('p', 'titre');
	let prix = creatingElement('p', 'prix');
	let logoPanier = creatingElement('div', 'logoPanier_container');
	let imagePanier = creatingElement('img', 'imgPanier');

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