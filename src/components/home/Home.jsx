import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './home.css'




function Home() {



    return (
        <div>
            <Header />
            <div id='login'>
                <div id='title'>
                    <h1>Welcome to the Home Page</h1>
                </div>
                <div id='buttons'>
                    <div id='loginButton'>
                        <Link to='/login'>
                            <Button size='lg' className="landingbutton">
                                Login
                            </Button>
                        </Link>
                    </div>
                    <div id='registerButton'>
                        <Link to='/register'>
                            <Button size='lg' className="landingbutton">
                                Signup
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;