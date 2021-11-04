import React, {useEffect, useState} from 'react';
import $ from 'jquery';
// https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json

export default function TextAnalysisForm() {
    // declaring state variables to be controlled in the TextAnalysisForm Hook
    const [inputText, setInputText] = useState('');
    const [commonWords, setCommonWords] = useState([]);

    // useEffect allows for DOM manipulation once the user's input is connect from the form.
    useEffect(() =>  {
        $.get(
            "https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json",
            function(data, status) {
                console.log(status);
                console.log(typeof data);
                setCommonWords(JSON.parse(data));
            }
        );
    }, [])

    /**
     * analyzeKeywordsFrequency() checks how
     * many times a common english word was
     * used for the user input.
     * @param data
     */
    const analyzeKeywordsFrequency = (data) => {
        console.log(`data from api: ${data} \nType of data type: ${Array.isArray(data)}`);

        // Converting the incoming user input as a string to an array of strings for comparison.
        const inputArray = inputText.split(' ');

        console.log(`user input: ${inputArray} ${Array.isArray(inputArray)}`);

        // Nested for loop is used to check for any common english word matches and their frequency
        for(let i = 0; i < inputArray.length; i++) {
            for(let j = 0; j < commonWords.length; j++) {
                if(inputArray[i] === commonWords[j]) {
                    console.log(`It's a match: ${commonWords[j]}`);
                }
            }
        }

    }

    // Handles the state of the text input coming in from the text area field.
    const handleTextFieldSubmit = (event) => {
        event.preventDefault();

        analyzeKeywordsFrequency(commonWords);

        // Testing methods here ++
        let testString = reversingString(inputText);

        let reversedString = reverseUserInput(inputText);
        window.alert(`User had inputted the following: ${reversedString} \n\nTest 1: ${testString}`);
    }


    // reverseUserInput reverses every character of string.
    const reverseUserInput = (string) => {
        let reversedString;

        for(let i = string.length - 1; i >= 0; i--) {
            reversedString += string.charAt(i);
        }

        return reversedString;
    }

    /*
     Reverse the words in the string, not every letter.
     These string reversal algorithm uses JS built string
     and array functions to reverse a string.
    */
    const reversingString = (string) => {
        let splitStringArray = string.split(' ');
        let reverseStringArray = splitStringArray.reverse();
        return reverseStringArray.join(' ');
    }

    // JSX for the GUI display the form to the client; form gathers input and stores it in the controlled hook state for further analyzes.
    return(
        <main className="container p-5">
            <form style={{ borderColor: '#0576c1' }} className="card row shadow-lg rounded bg-light" onSubmit={handleTextFieldSubmit}>
                <h2 className="card-header bg-dark text-light text-center p-3 m-0">Analyze Your Text</h2>

                <div className="col p-5">
                    <label for="text-area-input" className="form-label fs-4 p-1" style={{ fontWeight: 900}}>Input any text for analysis</label>
                    <textarea
                        className="form-control bg-light border-dark rounded"
                        id="text-area-input"
                        placeholder="Input text here"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        style={{ height: 400 }}>
                    </textarea>

                    <div>
                        <input id="btn" style={{ width: 500, margin: "auto" }} type="submit" className="btn btn-dark btn-lg shadow-sm btn-block mt-5" value="Submit" />
                    </div>
                </div>
            </form>

            <div id="test-display" className="container card mt-1"></div>
        </main>
    );
}