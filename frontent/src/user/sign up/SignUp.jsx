import { Link } from "react-router-dom";

import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";

import styles from "./SignUp.module.css";

const SignUp = () => {
    return (
        <main className={styles.container_main}>
            <form className={styles.login_form} id="login_form">
                <div className={styles.form_header}>
                    <h1>Sign up</h1>
                </div>

                <div className={styles.inputs}>
                    <div className={styles.input_box}>
                        <label htmlFor="name">
                            Name
                            <div className={styles.input_field}>
                                <i className="user">
                                    <FaUser />
                                </i>
                                <input type="text" id="name" name="name" />
                            </div>
                        </label>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="email">
                            E-mail
                            <div className={styles.input_field}>
                                <i className="envelope">
                                    <FaEnvelope />
                                </i>
                                <input type="email" id="email" name="email" />
                            </div>
                        </label>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="password">
                            Password
                            <div className={styles.input_field}>
                                <i className="key">
                                    <FaKey />
                                </i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                />
                            </div>
                        </label>
                        <label htmlFor="confirm-password">
                            Confirm Password
                            <div className={styles.input_field}>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirmpassword"
                                />
                            </div>
                        </label>
                        <div className={styles.signup}>
                            <p>
                                <Link to="/">Sign In</Link>
                            </p>
                        </div>
                        <div></div>
                    </div>
                </div>

                <button
                    className={styles.login_button}
                    type="submit"
                    id="login_button"
                >
                    Sign Up
                </button>
            </form>
        </main>
    );
};

export default SignUp;
