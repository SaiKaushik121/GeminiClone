import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Login() {
  const { signInWithGoogle } = useContext(Context);
  return (
    <div className="login">
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}
