import React from "react";

const Header = ( { handleToggleDarkMode } ) => {
    return(
        <div className="header">
            <h1>App de Notas</h1>
            <button onClick={()=> handleToggleDarkMode((previousDarkMode)=> !previousDarkMode)} className="save">Modo Escuro</button>
        </div>
    )
}

export default Header;