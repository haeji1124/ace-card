import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

const Home = () => {
    const authCtx = useContext(AuthContext)
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-[90%] max-w-xl p-12">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Welcome to world!</h1>
                    <Button onClick={authCtx.onLogout}>Logout</Button>
                </div>
            </Card>
        </div>
    );
};

export default Home;