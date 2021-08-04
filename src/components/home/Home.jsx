import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';




function Home() {



    return (
        <div>
            <Header />
            <Link to='/login'>
                <Button size='lg' className="landingbutton">
                    Login
                </Button>
            </Link>
            <Link to='/register'>
                <Button size='lg' className="landingbutton">
                    Signup
                </Button>
            </Link>
        </div>
    );
}

export default Home;