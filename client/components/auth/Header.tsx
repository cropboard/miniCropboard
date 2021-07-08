import React, { FunctionComponent } from "react";

// import logo
import Logo from "../logo";

interface AuthPagesHeaderProps {
    context: string
}

const AuthPagesHeader: FunctionComponent<AuthPagesHeaderProps> = ({ context }): JSX.Element => {
    return (
        <header className="authPageHeader">
            <Logo />

            <h2> {context} </h2>

            <style jsx>{`
                .authPageHeader {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    flex-direction: row;
                    font-family: sans-serif;
                }
            `}</style>
        </header>
    )
}

export default AuthPagesHeader;