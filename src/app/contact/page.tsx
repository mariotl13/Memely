import Link from "next/link";
import "./styles.scss";

export default function Contact() {
    return (
        <>
        <Link href="/">Go back</Link>
        <div className="card">
            <h5 className="card__title">Título de la card</h5>
            <p className="card__content">Contenido de la card.</p>
        </div>
        </>
    )
}