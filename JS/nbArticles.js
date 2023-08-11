const indiqueNombreArticleDansPanier = (panier) => {
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

export {indiqueNombreArticleDansPanier};