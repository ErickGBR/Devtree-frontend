import { Link } from 'react-router-dom';

const NotFoundView = () => (
    <div className="flex flex-col items-center justify-center h-screen text-center p-8">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-300 mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-6">The page you are looking for does not exist.</p>
        <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
        >
            Go to Home
        </Link>
    </div>
);

export default NotFoundView;