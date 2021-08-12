module.exports = {
	PageTransition: {
		type: "tween",
	},
	variants: {
		in: {
			x: 0,
			opacity: 1,
		},
		out: {
			x: -50,
			opacity: 1,
		},
		exit: {
			x: 50,
			opacity: 0.2,
		},
	},
};
