import React from "react";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./Home.css";

export default function Front() {
    return (
        <Container fluid>
            <header className="header">
                <div className="header__title">
                    <h1>Descubre tus próximas compras</h1>
                    <p><Link to="/registro">Regístrate aquí</Link> o <Link to="/login">Inicia sesión</Link> y descubre nuevas sorpresas</p>
                </div>
            
            </header>
        </Container>
    );
}