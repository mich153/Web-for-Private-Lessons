import React from "react";

function Footer(){
    return(
        <>
            <footer>
                <span>לתמיכה טכנית באתר:
                    <ul>
                        <p>
                            צרו קשר בטלפון:
                            054-1234567
                        </p>
                        <p>
                            או דרך המייל:
                            <a href="mailto:example@gmail.com">example@gmail.com</a>
                        </p>
                    </ul>
                </span>
                <p>תמונת הרקע של האתר נוצרה על-ידי 
                    <a href="https://unsplash.com/@kimberlyfarmer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kimberly Farmer</a> ונלקחה מהאתר
                    <a href="https://unsplash.com/photos/lUaaKCUANVI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                </p>
            </footer>
        </>
    );
}

export default Footer;