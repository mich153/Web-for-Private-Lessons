import React from "react";
import Footer from "../components/Footer";

function NoAccess(){
    return(
        <>
            <h1>אופס!</h1>
            <h3>זה נראה שאין לך הרשאה לגשת לדף זה.</h3>

            <Footer />
        </>
    );
}

export default NoAccess;