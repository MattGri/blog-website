import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/errorPage.scss';

const ErrorPage = () => {

    useEffect(() => {
        document.title = 'Error';
    }, []);

    const navigate = useNavigate();
    return (
        <>
            <h1 className='errorTitle'>404 page not found!</h1>
            <p className='errorText'>The page you were looking for does not exist! Click <span className='home' onClick={() => navigate('/')}>here</span> to return to the Home Page</p>
        </>
    )
}

export default ErrorPage