export default function Landing() {


    return (
        <form className="login">
            <label htmlFor="user">Usuario</label>
            <input id="user" type="text" />

            <label htmlFor="password">Contraseña</label>
            <input id="password" type="text" />
        </form>
    )
}