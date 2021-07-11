import React, { FunctionComponent, useState } from "react";

// import styles 
import styles from "../../styles/auth/auth.module.css";

// import custom components
import AuthPagesHeader from "../../components/auth/Header";
import Logo from "../../components/logo";

const RegisterPage: FunctionComponent = (): JSX.Element => {

    // states for the registration input fields
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    // function to handle text input field changes
    function handleTextFieldChange(event, handler: Function): void {
        handler(event.target.value);
    }

    return (
        <div>
            <AuthPagesHeader context="Registration" />

            <section className={styles.registrationFormContainer}>
                <form className={styles.registrationForm}>
                    <span>
                        <Logo />
                    </span>
                    <input value={name} onChange={event => handleTextFieldChange(event, setName)} type="text" placeholder="Name" />
                    <input value={email} onChange={event => handleTextFieldChange(event, setEmail)} type="text" placeholder="Email" />
                    <input value={password} onChange={event => handleTextFieldChange(event, setPassword)} type="password" placeholder="Password" />
                    <input value={confirmPassword} onChange={event => handleTextFieldChange(event, setConfirmPassword)} type="password" placeholder="Confirm Password" />
                    <input value={location} onChange={event => handleTextFieldChange(event, setLocation)} type="text" placeholder="Location" />
                    <button>
                        Register
                    </button>
                </form>
            </section>
        </div>
    )
}

export default RegisterPage;