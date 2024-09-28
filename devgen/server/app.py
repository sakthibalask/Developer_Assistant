from groq import Groq
import re

GROQ_KEY = "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"

client = Groq(
    api_key=GROQ_KEY
)

def Planning_Agent(topic):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": """
                    You are the Planning Assistant. Your task is to generate specific and detailed plans for both frontend and backend executions based on the provided project description. The plan should include a list of steps for each execution, specifying the tech stack if not mentioned by the user. Additionally, generate a prompt for the Task Execution Agent to create prompts for the Developer Agent to write the code for each execution.

                    Example Response:
                    1. User Query: Design a Login Page for a web application using React.js
                    Response:
                        Plan:
                        Tech Stack: React.js
                        1. Set up the React App.
                        2. Create the Login component.
                        3. Add basic styling.
                        4. Render the Login component.
                        5. Run the application.
                        Prompt:
                        Tech Stack: React.js
                        Tasks:
                        1. Set up the React App.
                        2. Create the Login component.
                        3. Add basic styling.
                        4. Render the Login component.
                        5. Run the application.

                    2. User Query: Implement Login logic using Python
                    Response:
                        Plan:
                        Tech Stack: Python
                        1. Create a user database.
                        2. Develop the login function.
                        3. Implement the main logic loop.
                        Prompt:
                        Tech Stack: Python
                        Tasks:
                        1. Create a user database.
                        2. Develop the login function.
                        3. Implement the main logic loop.

                    Notes:
                    - Use plain text for headings and points, without special symbols.
                    - Include only the specified information.
                    - Ensure accuracy in the execution steps as they will be processed by another agent.
                    - If the tech stack is not provided, recommend a modern and productive technology.
                """,
            },
            {
                "role":"user",
                "content":f"{topic}"
            }
        ],
        model="gemma2-9b-it",
    )
    text = chat_completion.choices[0].message.content
    output = []
    if "Plan" in text:
        context = (text[(text.index("Plan") + 8):(text.index("},"))])
        steps = context.strip().split("\n")
        for step in steps:
            output.append(step.strip().replace('\n',''))
        for step in output:
            print(step.strip())
    print("-----------------------------------------------XXXXXXXXXXXXXXXXXXXXXX------------------------------------------------")
    if "Prompt" in text:
        prompt = text[text.index("Prompt"):]
        Developer_Agent(prompt)

def Developer_Agent(prompt):
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content":
                """
                    Your a developer assistant. You have been provided with the set of task, for which you have to provide better code based on the tech stack provided within the context.
                    -> Example Responses : 
                        Example 1 : 
                            User Query : Prompt": {
                                            "Generate code based on the provided tech stack for each of the executions provided.
                                            Tech Stack: React Js
                                            Tasks:
                                            1. Set Up Your React App
                                            2. Create the Login Component
                                            3. Add Basic Styling
                                            4. Render the Login Component
                                            5. Run the Application
                                        }
                            Response : 
                                1. Set Up Your React App : 
                                    Language : Terminal
                                    Code/Command : npx create-react-app login-page cd login-page
                                2. Create the Login Component : 
                                    Language : React Js
                                    Code/Command :
                                            import React, { useState } from "react";
                                            import './Login.css';

                                            function Login() {
                                            const [email, setEmail] = useState("");
                                            const [password, setPassword] = useState("");
                                            const [errorMessage, setErrorMessage] = useState("");

                                            const handleSubmit = (event) => {
                                                event.preventDefault();

                                                // Basic validation
                                                if (email === "" || password === "") {
                                                setErrorMessage("Both fields are required.");
                                                return;
                                                }

                                                // Here you can add your login logic, such as API calls
                                                console.log("Email:", email);
                                                console.log("Password:", password);
                                                setErrorMessage(""); // Clear error message on successful submission
                                            };

                                            return (
                                                <div className="login-container">
                                                <h2>Login</h2>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                    <label>Email:</label>
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    </div>
                                                    <div className="form-group">
                                                    <label>Password:</label>
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    </div>
                                                    {errorMessage && <p className="error">{errorMessage}</p>}
                                                    <button type="submit">Login</button>
                                                </form>
                                                </div>
                                            );
                                            }

                                            export default Login;
                                3. Add Basic Styling :
                                    Language : CSS
                                    Code/Command : 
                                                .login-container {
                                                width: 300px;
                                                margin: 100px auto;
                                                padding: 20px;
                                                border: 1px solid #ccc;
                                                border-radius: 5px;
                                                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                                                text-align: center;
                                                background-color: #f9f9f9;
                                                }

                                                .login-container h2 {
                                                margin-bottom: 20px;
                                                }

                                                .form-group {
                                                margin-bottom: 15px;
                                                text-align: left;
                                                }

                                                .form-group label {
                                                display: block;
                                                margin-bottom: 5px;
                                                }

                                                .form-group input {
                                                width: 100%;
                                                padding: 8px;
                                                box-sizing: border-box;
                                                border: 1px solid #ccc;
                                                border-radius: 5px;
                                                }

                                                button {
                                                width: 100%;
                                                padding: 10px;
                                                background-color: #007bff;
                                                color: white;
                                                border: none;
                                                border-radius: 5px;
                                                cursor: pointer;
                                                }

                                                button:hover {
                                                background-color: #0056b3;
                                                }

                                                .error {
                                                color: red;
                                                margin-bottom: 15px;
                                                }
                                4. Render the Login Component : 
                                        Language : React Js
                                        Code/Command : 
                                                    import React from 'react';
                                                    import './App.css';
                                                    import Login from './Login';

                                                    function App() {
                                                    return (
                                                        <div className="App">
                                                        <Login />
                                                        </div>
                                                    );
                                                    }

                                                    export default App;
                                5. Run the Application : 
                                    Language : Terminal
                                    Code/Command : npm start
                            
                ->Note : 
                        1) Don't provide any additonal informations just stick with the context and provide the required code.
                        2) Don't include any type of special symbols in any of the heading or supporting text such as astrick etc, especially to code or command in the response.
                        3) Generate code only based on the provided Tech Stack and have the code optimized.
                        4) Don't mention the programming language inside the code
                        5) Make sure you have mentioned Language in the response and if some command that are needed to be run on terminal kindly mention the language as Terminal otherwise just provide the required tech stack.
                        6) When you are giving command for terminal don't mention any normal text, just mention the command to be typed in the terminal.
                """,
        },
        {
            "role":"user",
            "content":f"{prompt}"
        }
    ],
    model="llama-3.1-70b-versatile",
    )
    context = chat_completion.choices[0].message.content
    steps = re.split(r'\n(?=\d+\.\s)', context.strip())
    codes = []
    for step in steps:
         text = step.strip()
        #  print(text)
         if "Language" and "Code/Command" in text:
             language =(text[(text.index("Language") + 9):text.index("Code")].split(" ")[1]).replace('\n','')
             code = (text[(text.index("Code/Command") + 15) : ])
         elif "Language" and "Code" in text:
             language =(text[(text.index("Language") + 9):text.index("Code")].split(" ")[1]).replace('\n','')
             code = (text[(text.index("Code") + 5) : ])
         elif "Language" and "Command" in text:
             language =(text[(text.index("Language") + 9):text.index("Command")].split(" ")[1]).replace('\n','')
             code = (text[(text.index("Command") + 8) : ])
         s = {"language":language, "code": code}
         codes.append(s)
    print("Implementation with code....")
    for code in codes:
        print(code["code"])
    # count = len(steps)
    # print(count)
    
    return


if __name__ == '__main__':
    topic = input("Enter your idea of project: ")
    Planning_Agent(topic)

