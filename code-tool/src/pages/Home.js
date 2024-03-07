import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1>ValQ3.0 Coding Standard Tool</h1>
      <div>
        <Link to="/guidance" className="cta-button">Add JS Doc and I.say</Link>
      </div>
      <div>
        <Link to="/guidance-xpath" className="cta-button">Create async method from XPath</Link>
      </div>
    </div>
  );
}
