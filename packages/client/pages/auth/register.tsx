import React, { FunctionComponent } from "react";

// import styles 
import styles from "../../styles/auth/auth.module.css";

// import custom components
import AuthPagesHeader from "../../components/auth/Header";
import Logo from "../../components/logo";

const RegisterPage: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <AuthPagesHeader context="Registration" />

            <section className={styles.registrationFormContainer}>
                <form className={styles.registrationForm}>
                    <span>
                        <Logo />
                    </span>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Password" />
                    <input type="text" placeholder="Confirm Password" />
                    <input type="text" placeholder="Location" />
                    <button>
                        Register
                    </button>
                </form>
            </section>
        </div>
    )
}

export default RegisterPage;