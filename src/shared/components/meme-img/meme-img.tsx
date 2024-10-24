"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./meme-img.scss";

const MemeImg = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<Zoom classDialog="zoom-dialog">
			<img src={src} alt={alt} />
		</Zoom>
	);
};

export default MemeImg;
