import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Success from "./Success.jsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!emailRegex.test(email) || !passwordRegex.test(password) || termsAccepted === false ) {
            return;
        }

        navigate("/success");
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="email-input" />
                {!emailRegex.test(email) && (<p className="hata" role="alert" data-cy="email-error">*Geçerli bir email adresi giriniz.</p>)}
                <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} data-cy="password-input" />
                {!passwordRegex.test(password) && (<p className="hata" role="alert" data-cy="password-error">*8 haneli güçlü bir şifre giriniz. (1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermeli.)</p>)}
                <label>
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} data-cy="rules-checkbox" /> Şartları kabul ediyorum
                </label>
                {termsAccepted === false && (<p className="hata" role="checkAlert" data-cy="terms-error">*Şartları kabul etmelisiniz.</p>)}
                <button type="submit" disabled={!(emailRegex.test(email) && passwordRegex.test(password) && termsAccepted)} data-cy="submit-button">
                    Giriş Yap
                </button>
            </form>
        </div>
    );
};

export default Login;