import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("johnsmith@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("entertain_user", JSON.stringify({
                        id: user.id,
                        artist: user.isArtist,
                        name:user.name,
                    }))

                    navigate("/homepage")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        
        <section id="section-login"className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" >
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://www.apple.com/newsroom/images/product/music/standard/Apple-Music-Sessions-performance-Tenille-Townes-Hero_photogrid.jpg.slideshow-xlarge_2x.jpg"
                alt="login form" className="img-fluid"  />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form  onSubmit={handleLogin}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" ></i>
                    <span className="h1 fw-bold mb-0">Entertain Me</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" >Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" onChange={evt => set(evt.target.value)} value={email} />
                    <label className="form-label">Email address</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <p className="mb-5 pb-lg-2" >Don't have an account? <a href="/register"
                      >Register here</a></p>
         <div class="col">
        <a href="#" id="facebook"class="fb btn">
        <svg id= "social-media-buttons"xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
</svg>Login with Facebook
        </a>
        <a href="#" id="twitter"class="twitter btn">
          <svg id= "social-media-buttons"xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
</svg>
          Login with Twitter
        </a>
        <a href="#" id="google"class="google btn">
        <svg id= "social-media-buttons"xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg>          Login with Google
        </a>
      </div>
      
           
                  {/* <a href="#!" class="small text-muted">Terms of use.</a> */}
                  {/* <a href="#!" class="small text-muted">Privacy policy</a> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    //    <body class="text-center">
    //     <main class="form-signin w-100 m-auto">
    //         <section>
    //             <form className="form--login" onSubmit={handleLogin}>
    //             <h1 class="h3 mb-3 fw-normal">Entertain Me</h1>
    //                 <h2>Please sign in</h2>
    //                 <div class="form-floating">
    //                 <fieldset>
    //                 <label for="floatingInput" > Email address </label>
    //                     <input type="email"
                            // value={email}
    //                         onChange={evt => set(evt.target.value)}
    //                         className="form-control"
    //                         id="floatingInput"
    //                         placeholder="Email address"
    //                         required autoFocus />
    //                 </fieldset>
    //                 </div>
    //                 <fieldset>
    //                 <button class="w-60 btn btn-lg btn-primary" type="submit">
    //                         Sign in
    //                     </button>
    //                 </fieldset>
    //             </form>
    //         </section>
    //         <section className="link--register">
    //             <Link to="/register">Not a member yet?</Link>
    //         </section>
    //     </main>
    //     </body>
    )

    
}