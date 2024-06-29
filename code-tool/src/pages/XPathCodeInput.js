import React, { useState } from 'react';
import OpenAI from 'openai';

// Function to generate comments for the provided code snippet using OpenAI
async function generateComments(codeInput) {
  try {

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_API__KEY,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });


    const completion = await openai.chat.completions.create({
      model: "meta/llama3-70b-instruct",
      messages: [
        {
          "role": "system",
          "content": `Please provide a code snippet. I will generate functions for each XPath provided, where each function clicks on the corresponding element and logs a message using 'I.say()'. For example:\n\n/**\n * Clicks the element associated with the XPath provided.\n */\nasync clickData() {\n  await I.click("//span[contains(@class,'toolbar-icon-title with-icon') and text()='Data']");\n  await I.say('Clicked on "Data" element.');\n}\n\n/**\n * Clicks the element associated with the XPath provided.\n */\nasync clickAddNewNode() {\n  await I.click('addNewNode.addNewNode');\n  await I.say('Clicked on "Add New Node" element.');\n}\n\n/**\n * Clicks the element associated with the XPath provided.\n */\nasync clickClosePopupButton() {\n  await I.click('addNewNode.closePopupButton');\n  await I.say('Clicked on "Close Popup Button" element.');\n}`
        },
        {
          "role": "user",
          "content": codeInput
        }
      ],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: true,
    });

    let generatedComments = '';
    for await (const chunk of completion) {
      generatedComments += chunk.choices[0]?.delta?.content || '';
    }

    return generatedComments;
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