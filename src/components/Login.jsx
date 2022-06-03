import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Form } from './Form';
import { setUser } from 'store/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  //ф-я аут-ии
  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken
          })
        );
        push('/');
      })
      .catch(() => alert('Invalid user!'));

    // signInWithEmailAndPassword(auth, email, password)
    //   .then(console.log)
    //   .catch(console.error);
  };

  return <Form title="sign in" handleClick={handleLogin} />;
};

export { Login };
