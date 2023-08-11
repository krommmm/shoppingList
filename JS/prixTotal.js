const prixTotal = (panier) => {
	let cumulation = 0;
	for (let article of panier) {
		cumulation += article.prix * article.quantité;
	}
	return cumulation;
};

export {prixTotal};