import React from 'react';
import { Link } from 'react-router-dom';

export default function Guidance() {
    return (
        <div className="container">
            <h1>Method template</h1>
            <p>Please provide XPaths:</p>
            <pre>{`popupTitle: \`//h4[contains(text(),"Add Nodes from Data")]\`,
applyButton: \`//button[text()="Apply"]\``}</pre>
            <p>Functions will be generated based on the provided XPaths.</p>
            <pre>{`/**
 * Clicks the element associated with the provided XPath.
 */
async clickElement() {
  await I.click(\`your_xpath_here\`);
  await I.say('Clicked on the element.');
}`}</pre>
            <Link to="/code-input-xpath" className="cta-button">Continue to Code Input</Link>
        </div>
    )
}
