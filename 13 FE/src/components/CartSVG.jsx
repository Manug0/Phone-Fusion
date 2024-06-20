import React from "react";

const CartSVG = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={18} height={19} fill="none" {...props}>
			<path
				fill="#000"
				d="M6.5 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M17 13H5a1 1 0 0 1 0-2h8.491a3.01 3.01 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 17 2H4.74A3.01 3.01 0 0 0 1.92 0H1a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005L4.68 9.017A3 3 0 0 0 5 15h12a1 1 0 0 0 0-2m-1.326-9-1.22 4.274A1.005 1.005 0 0 1 13.49 9H6.754L6.5 8.108 5.326 4zM14.5 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
			/>
		</svg>
	);
};

export default CartSVG;
