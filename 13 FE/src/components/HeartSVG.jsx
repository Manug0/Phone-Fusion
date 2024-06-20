import React from "react";

const HeartSVG = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={18} height={19} fill="none" {...props}>
			<mask
				id="a"
				position="absolute"
				width={18}
				height={19}
				x={0}
				y={0}
				maskUnits="userSpaceOnUse"
				style={{
					maskType: "luminance",
				}}>
				<path fill="#fff" d="M0 0h18v19H0z" />
			</mask>
			<g mask="url(#a)">
				<path
					fill="#DD2E44"
					d="M1.453 6.16c0-4.4 5.771-6.03 7.547-.937 1.776-5.093 7.547-3.462 7.547.937C16.547 10.94 9 17 9 17S1.453 10.94 1.453 6.16"
				/>
			</g>
		</svg>
	);
};

export default HeartSVG;
