import React, { useState } from 'react';
import OpenAI from "openai";
import key from "./APIKey";

// Function to generate comments for the provided code snippet using OpenAI
async function generateComments(codeInput) {
  try {
    const openai = new OpenAI({
      apiKey: key(),
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `Please provide a code snippet. I will generate functions for each XPath provided, where each function clicks on the corresponding element and logs a message using 'I.say()'. For example:\n\n/**\n * Clicks the element associated with the XPath provided.\n */\nasync clickData() {\n  await I.click("//span[contains(@class,'toolbar-icon-title with-icon') and text()='Data']");\n  await I.say('Clicked on "Data" element.');\n}\n\n/**\n * Clicks the element associated with the XPath provided.\n */\nasync clickAddNewNode() {\n  await I.click('addNewNode.addNewNode');\n  await I.say('Clicked on "Add New Node" element.');\n}\n\n/**\n * Clicks the element associated with the XPath provided.\n */\nasync clickClosePopupButton() {\n  await I.click('addNewNode.closePopupButton');\n  await I.say('Clicked on "Close Popup Button" element.');\n}`
        }
        ,
        {
          "role": "user",
          "content": codeInput
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating code comments:', error);
    throw error;
  }
}

// CodeInput component
export default function CodeInput() {
  const [codeInput, setCodeInput] = useState('');
  const [generatedComments, setGeneratedComments] = useState('');

  // Function to handle the submission of user-provided code
  const handleSubmit = async () => {
    try {
      // Generate comments for the provided code
      const generatedComments = await generateComments(codeInput);
      setGeneratedComments(generatedComments);

      // Delay before fetching the generated comments
      setTimeout(() => {
        // Display the generated comments after 2-3 seconds
        alert('Generated Comments:\n' + generatedComments);
      }, 2000);
    } catch (error) {
      console.error('Error handling submission:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="container">
      <h1>Code Input</h1>
      <p>Paste your code below:</p>
      <textarea
        id="codeInput"
        placeholder="Paste your code here..."
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
      ></textarea>
      <button
        id="submitCodeButton"
        className="cta-button"
        onClick={handleSubmit}
      >
        Submit
      </button>

      <div>
        <p>Generated Comments:</p>
        <textarea
          id="generatedComments"
          placeholder="Generated Comments..."
          value={generatedComments}
          readOnly
        ></textarea>
      </div>
    </div>
  )
}