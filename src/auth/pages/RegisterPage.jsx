import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const RegisterPage = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email:'',
        password:''

    });

    const [error, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const handleInput = ( event ) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();
       
        console.log(values)
        fetch('https://backend-recipes-bootcamps-tribe.onrender.com/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
            'Content-Type': 'application/json'
            },
            
        })
        .then(res => {
            
               return res.json()
                   
            
            
          })
          .then(result => {
             /*    const idToken = result.idToken;  
              localStorage.setItem('isLoggedIn', idToken);
              const token = localStorage.getItem('isLoggedIn');
              setIsLoggedIn(true);  */
              //navigate("/login");
              console.log(result)
              
             if(result?.errors?.length){
                let element = '';
                   for( let index = 0; index < result.errors.length; index++){
                   element = `${element} - ${result.errors[index]?.msg}`;
                   } 
                   setError(true);
                   setErrorMessage(element); 
                   throw new Error(element);                  
                       
            } 
            navigate("/login"); 
                        

          })
         
          .catch(error => {
         
            console.log(error);
          });               

    }

    return (
        <>
            <form className="login-form form-app" action="" onSubmit={ handleSubmit }>
                <input className="form-control mb-3"  required type="email" placeholder="Usuario" name="email" aria-label="default input example" onChange={ handleInput }/>

                <input type="password" pattern=".{6,}" required id="inputPassword5" className="form-control mb-3" placeholder="password"  name="password" aria-labelledby="passwordHelpBlock" onChange={ handleInput }/>

                <input type="password" pattern=".{6,}"  required className="form-control mb-3" placeholder="repita password"  name="password" aria-labelledby="passwordHelpBlock" onChange={ handleInput }/>

                {
                    error &&
                    <div className="error-msg">{ errorMessage }</div>
                }
                <button className="btn submit-form" type="submit">Registrarme</button>

            </form>
        </>
    )
}
