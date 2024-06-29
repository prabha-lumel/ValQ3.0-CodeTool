import React, { useState } from 'react';
import OpenAI from "openai";

// Function to generate comments for the provided code snippet using OpenAI
async function generateComments(codeInput) {
  try {
    const openai = new OpenAI({
      apiKey: "Empty",
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "Please provide a code snippet. I will add JSDoc comments based on the function and include `I.say()` statements where necessary inside the function. For example:\n\n/**\n * Clicks on the provided element if it's not already present, or logs a message if it's present.\n * @param {string} elementXPath - The XPath of the element to check for existence.\n * @param {string} clickXPath - The XPath of the element to click if the provided element is not present.\n * @param {string} elementName - The name of the element for logging purposes.\n */\nasync clickOnElementIfNotPresent(elementXPath, clickXPath, elementName) {\n  const elementExists = await tryTo(() => I.waitForElement(elementXPath, 3));\n\n  if (!elementExists) {\n    await I.click(clickXPath);\n    I.say(`Clicked on \"${elementName}\" element.`);\n  } else {\n    I.say(`The \"${elementName}\" element was already present.`);\n  }\n}"
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
      }, 2000);
    } catch (error) {
      console.log('Error handling submission:', error);

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