"use client";
import ImageElement from "@/components/image/ImageElement";
import GoogleLogin from "@/components/social-login/google-login";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  console.log("session =========", session);
  console.log("STATUS ==============", status);

  return (
    <div className="login">
      <div className="container">
        <div className="login__wrapper">
          {/* Image */}
          <div className="login__image">
            <ImageElement
              src="/zurich_logo.png"
              width={250}
              height={100}
              alt="zurich logo login"
              parentClassName="img-fluid"
            />
          </div>
          <div className="login__content">
            <h2>Welcome</h2>
            <h3>Sign In To Your Account</h3>
          </div>
          <div className="login__form">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <div className="input-group has-validation">
                  <input
                    type="email"
                    className="form-control"
                    id="validationCustomUsername"
                    aria-describedby="inputGroupPrepend"
                  />
                  <div className="invalid-feedback">
                    Please choose a username.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button type="submit">Login</button>
            </form>
            {/* OAuth Sign */}
            <div className="login__oauth">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, magni.
              </p>
              <div className="login__outh__card">
                <div className="row">
                  <div className="col-lg-4">
                    <button>Facebook</button>
                  </div>
                  <div className="col-lg-4">
                    <GoogleLogin />
                  </div>
                  <div className="col-lg-4">
                    <button>Linkedin</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
