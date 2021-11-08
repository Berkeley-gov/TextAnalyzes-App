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
    const analyzeKeywordsFrequency = () => {
        let filteredArray = [];

        // Converting the incoming user input as a string to an array of strings for comparison.
        const inputArray = inputText.split(' ');

        // Nested for loop is used to check for any common english word matches and their frequency
        for(let i = 0; i < inputArray.length; i++) {
            for(let j = 0; j < commonWords.length; j++) {
                if(inputArray[i] === commonWords[j]) {
                    filteredArray.push(inputArray[i])
                }
            }
        }

        return filteredArray;
    }

    // Word counting function that determines keyword frequency.
    const analyze1000CommonWords = (array) => {
        let counts = {};
        let keys = [];

        for(let i = 0; i < array.length; i++) {
            let word = array[i].toLowerCase();

            if(!/\d+/.test(word)) {
                if(counts[word] === undefined) {
                    counts[word] = 1;
                    keys.push(word);
                } else {
                    counts[word] = counts[word] + 1;
                }
            }
        }

        keys.sort(compare);

        function compare(a, b) {
            let countA = counts[a];
            let countB = counts[b];

            return countB - countA;
        }

        return counts;
    }

    const createKeyFrequencyUI = (array) => {
        console.log(`Final array ui function is working:`);
        console.log(array)

        // keyWords holds a list of the top keywords found in the user's input.
        const dataValues = Object.entries(array);

        // Creating the div element that holds the list of keywords for UI.
        let wordCard = document.getElementById("words");
        wordCard.classList.add("card", "p-1", "m-5", "shadow-sm", "bg-light");

        let testString = reversingString(inputText);
        let reversedString = reverseUserInput(inputText);

        wordCard.innerHTML = `<p><strong>The User had inputted the following:</strong> ${inputText}</p>
                               <br/>
                               <p><strong>Input reversed by word:</strong> ${reversedString}</p>
                               <br/>
                               <p><strong>Input reversed charaters:</strong> ${testString}</p>
                               <br/>
                               <p><strong>Most common used words:</strong> ${dataValues}</p>`;
    }

    // Handles the state of the text input coming in from the text area field.
    const handleTextFieldSubmit = (event) => {
        event.preventDefault();

        // Array is filtered to root out the usage for any of the 1000 common english words.
        let analyzedArray =  analyzeKeywordsFrequency();
        const completedArray = analyze1000CommonWords(analyzedArray);

        console.log(completedArray)
        console.log('filtering is completed.');

        createKeyFrequencyUI(completedArray);

        // Testing methods here ++
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
            <div id="words" style={{marginBottom: 60}}>

            </div>

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
        </main>
    );
}