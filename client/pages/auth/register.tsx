import React, { FunctionComponent } from "react";

// import styles 
import styles from "../../styles/auth/register.module.css";

// import custom components
import AuthPagesHeader from "../../components/auth/Header";

const RegisterPage: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <AuthPagesHeader context="Registration" />

            <form>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
                <input type="text" placeholder="Confirm Password" />
                <input type="text" placeholder="Location" />
            </form>
        </div>
    )
}

export default RegisterPage;