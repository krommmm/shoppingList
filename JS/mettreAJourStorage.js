const mettreAJourStorage = (panier) => {
	localStorage.setItem('panier', JSON.stringify(panier));
};

export {mettreAJourStorage};