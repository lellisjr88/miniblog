import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Register.module.css'
import {useState, useEffect} from 'react'


const Register = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, SetConfirmPassword] = useState('')
    const [error, SetError] = useState('')

    const {createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        SetError("")
    
        const user = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword) {
            SetError("As senhas não conferem!")
            return
        }


        const res = await createUser(user)

        setDisplayName('')
        setEmail('')
        setPassword('')
        SetConfirmPassword('')
    }

    useEffect(() => {
        if (authError) {
            SetError(authError)
        }
    }, [authError])

    return (
        <div className={styles.register}> 
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type='text'
                        name='displayName'
                        required
                        placeholder='Nome do usuário'
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='E-mail do usuário'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Confirmação de Senha:</span>
                    <input
                        type='password'
                        name='confirmPassword'
                        required
                        placeholder='Confirme sua senha'
                        value={confirmPassword}
                        onChange={(e) => SetConfirmPassword(e.target.value)}
                    />
                </label>
                {!loading && <button className='btn'>Cadastrar</button>}
                {!loading && <button className='btn' disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register;