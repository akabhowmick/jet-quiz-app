import { Link } from 'react-router-dom';
import './NotFoundPage.css'; // Import your CSS file for styling

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <p>But hey, why not take a quiz while you're here?</p>
        <Link to="/" className="quiz-link">Take me to the home page</Link>
      </div>
    </div>
  );
}
