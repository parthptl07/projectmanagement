import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">Track Extra</div>
            <div className="flex items-center gap-4">

                <Link to='/signup'>
                    <button className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                        <UserPlus size={16} />
                        Sign Up
                    </button>
                </Link>

                <Link to='/login'>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        <LogIn size={16} />
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
