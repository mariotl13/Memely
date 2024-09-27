"use client";
import "./faqs.scss";

export default function Faqs() {
	return (
		<div className="faqs-container">
			<h1>¿Qué es Memely?</h1>
			<h2>
				Memely es una aplicación ideada con el objetivo de procrastinar
				lo máximo posible.
			</h2>
			<h1>¿En que consiste?</h1>
			<h2>
				El objetivo es hacer un concurso de memes todos los viernes, en
				el cual tendrás que crear tu meme y votar los de tus compañeros.
			</h2>
			<h1>¿Cómo funciona?</h1>
			<h2>
				Cada viernes aparecerá en la home una plantilla de meme
				aleatoria (la misma para todos los usuarios) y tendrás que
				rellenar los campos de texto para generar tu meme.
			</h2>
			<h1>¿Cuáles son los horarios?</h1>
			<h2>
				Crear meme:{" "}
				<strong>
					desde primera hora de la mañana hasta las 12:30.
				</strong>
			</h2>
			<h2>
				Votaciones: <strong>desde las 12:30 hasta las 14:00.</strong>
			</h2>
			<h2>
				Consultar ganadores: <strong>a partir de las 14:00.</strong>
			</h2>
			<h1>
				He accedido a partir de las 12:30 pero no me aparecen las
				votaciones.
			</h1>
			<h2>
				Todos los cambios en la app de generar la plantilla, comenzar la
				votación y cerrar las votaciones se hacen a mano, por lo que es
				posible que algún día se me olvide. Los horarios son
				orientativos.
			</h2>
			<h1>¿Cómo funciona la votación?</h1>
			<h2>
				Podrás votar el resto de memes dándoles a cada uno una
				puntuación desde el 0 (ni puta gracia) hasta el 10 (risa
				incontenible).
			</h2>
			<h1>¿Cómo se sabe quien ha ganado?</h1>
			<h2>
				Vuelve a acceder a la web a partir de las 14:00 para saber cual
				ha sido el top 3 de memes y ver el ranking actualizado.
			</h2>
			<h1>¿Es necesario que vote el resto de memes?</h1>
			<h2>
				¡SÍ!. Si has creado tu meme pero no participas en la votación,
				recibirás una penalización, por lo que será más difícil que
				ganes.
			</h2>
			<h1>
				Si no he creado ningún meme ¿puedo participar igualmente en la
				votación?
			</h1>
			<h2>
				Sí, aunque no hayas creado ninguno puedes votar igualmente para
				ayudar a elegir el ganador.
			</h2>
			<h1>¿Cuantos puntos reciben los ganadores?</h1>
			<h2>
				El top 3 de memes se calcula en función de los votos del resto
				de participantes. El meme con más votos recibirá 3 puntos, el
				segundo con más votos recibirá 2 puntos, y el tercero 1 punto.
				El resto de memes no reciben ningún punto.
			</h2>
			<h1>¿Cuantos memes puedo generar?</h1>
			<h2>
				Puedes generar tu meme todas las veces que quieras hasta las
				12:30, pero ten en cuenta que cada vez que generas uno el
				anterior se eliminará. El último que hayas generado será con el
				que participes en el concurso.
			</h2>
			<h1>¿Cómo sé si mi meme se ha generado correctamente?</h1>
			<h2>
				Al darle a generar meme deberías ver la imagen del meme generado
				con los textos que hayas introducido. Si ves esta imagen
				correctamente significa que el meme ya está guardado, no
				necesitas hacer nada más.
			</h2>
			<h1>He creado mi meme pero no lo he visto durante la votación.</h1>
			<h2>
				Tranquilo, durante la votación verás todos los memes excepto el
				tuyo para evitar que cada uno se pueda votar a sí mismo.
			</h2>
		</div>
	);
}
