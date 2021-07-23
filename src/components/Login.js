import axios from "axios";
import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";

const Login = () => {
  let { push } = useHistory()
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (formValues.username === '' || formValues.password === '') {
      setError('Username or Password not valid.')
    }
    else if (formValues.username !== '' || formValues.password !== '') {
      setError('')
    }
  }, [formValues])

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const login = (e) => {
    e.preventDefault()
    const credentials = {
      username: formValues.username.trim(),
      password: formValues.password.trim()
    }
    console.log(credentials)
    axios.post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
      })
      .catch(err => {
        setFormValues({
          ...formValues,
          error: err
        })
      })
    
    push('/bubbles')
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login}>
          <label>
            Username <input type='text' name='username' id='username' value={formValues.username} onChange={handleChange}></input>
          </label>
          <label>
            Password <input type='text' name='password' id='password' value={formValues.password} onChange={handleChange}></input>
          </label>
          <button id='submit'>Submit</button>
        </form>
      </div>

        <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"