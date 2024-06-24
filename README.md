

![LangChain notion](https://github.com/TH-Activities/saturday-hack-night-template/assets/117498997/af58a18d-932c-4ee7-870b-20820cfa3f3f)




# CaseCracker
Do you have trouble with legal things? Then better talk to CaseCracker! An ai bot that will answer all your questions and queries about legal issues, rules, petitions etc.
## Team members
1. [Jebin Shaju](https://github.com/jebinshaju)
2. [Sandeep Sreekumar]((https://github.com/sandeepsreekumar4067))
3. [Aleena Maria](https://github.com/prettycoolvariables)
## Link to product walkthrough
[link to video](Link Here)
## How it Works ?
1. The UI consists of 2 options: a general chatbot which answers general queries about legal things and a more professionally trained chatbot that gives more in-depth replies consisting of IPC sections and laws.
2. Choose the ai chatbot for your requirement and ask away.
## Libraries used
- Flask - Version 2.0.1
- Flask-CORS - Version 3.0.10
- langchain - Version 0.0.1
- PDFPlumber - Version 0.5.28
- transformers - Version 4.5.1
- react-icons - Version 4.2.0
## How to configure
1. **Clone the repository**:
    ```sh
    git clone https://github.com/prettycoolvariables/CaseCracker.git
    cd CaseCracker
    ```

2. **Install Node.js dependencies**:
    ```sh
    cd frontend
    npm install
    ```

3. **Install Python dependencies**:
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

## How to Run
### Running the Frontend
1. **Start the React development server**:
    ```sh
    cd frontend
    npm start
    ```

    This will start the frontend on `http://localhost:3000`.

### Running the Backend
1. **Start the Flask server**:
    ```sh
    cd backend
    python app.py
    ```

    This will start the backend server on `http://localhost:8080`.

### Interacting with the Chatbot
1. **Open your browser** and navigate to `http://localhost:3000`.
2. **Click the chat button** to open the chatbot interface.
3. **Type your question** in the input field and press Enter or click the send button.



