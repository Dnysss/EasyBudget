import { Link } from "react-router-dom";

import { FaEnvelope, FaKey } from "react-icons/fa";

import styles from "./SignIn.module.css";

const SignIn = () => {
   

   return (
      <main className={styles.container_main}>

         <form id="login_form" className={styles.login_form } >
            <div id="form_header" className={styles.form_header}>
               <h1>Sign in</h1>
            </div>
            
            <div id="inputs" className={styles.inputs}>
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
                        <input type="password" id="password" name="password" />
                     </div>
                  </label>
                  <div id="signup">
                     New to here?
                     <Link to="/signup"> Sign Up</Link>.
                  </div>
               </div>
            </div>

            <button type="submit" id="login_button" className={styles.login_button}>
               Login
            </button>
         </form>
      </main>
   );
};

export default SignIn;