import React from 'react';

import './Sign-in-and-sing-up.styles.scss';
import SignIn from "../../components/Sign-In/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";



const SignInAndSignUpPage = () => (
    <div className='sign-in-sign-up'>
        <SignIn />
        <SignUp />
    </div>

);

export default SignInAndSignUpPage;
