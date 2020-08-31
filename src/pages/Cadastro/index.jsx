import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi"; //feather icons, importado e colocado no componente FiLogin

import "./styles.css";

import logoImg from "../../assets/anotacoes.jpg";

export default function Cadastro() {
   return (
    <div className="logon-conteiner">
    <section className="form">
        <img src={logoImg} alt="Anotações" />

        <form>
            <h1>Faça seu Logon</h1>

            <input placeholder="E-mail" />
            <input placeholder="Senha" />
            <button className='button' type="submit">Entrar</button>

            <Link className="back-link" to="/register"> {/* Usar o componente Link to ao invés de "a href para não ter que carregar novamente todo o HTML. Assim, ele apenas troca de rota, e não recarrega o React do zero." */}
                <FiLogIn size={16} color="#E02041" />
                Não tenho cadastro
            </Link>
        </form>
    </section>
</div>
   );
}

