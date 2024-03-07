import React from 'react';
import { Link } from 'react-router-dom';

export default function Guidance() {
    return (
        <div className="container">
            <h1>Example template</h1>
            <p>Before</p>
            <pre>
                {`async exampleFunction(param1, param2) {
       // Your code here...
        }`}
            </pre>
            <p>After</p>
            <pre>
                {`/**
       * Example function with JS Doc and I.say
       * @param {number} [param1] - Description of param1.
       * @param {string} [param2] - Description of param2.
       */
      async exampleFunction(param1, param2) {
        await I.say('This is an example I.say comment.');
        // Your code here...
        }`}
            </pre>
            <Link to="/code-input" className="cta-button">Continue to Code Input</Link>
        </div>
    )
}
