"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const MemeImg = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<Zoom>
			<img src={src} alt={alt} />
		</Zoom>
	);
};

export default MemeImg;
