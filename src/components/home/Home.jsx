import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function Home(props) {
    return (
        <div>
            Home page
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