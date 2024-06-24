

![LangChain notion](https://github.com/TH-Activities/saturday-hack-night-template/assets/117498997/af58a18d-932c-4ee7-870b-20820cfa3f3f)




# CaseCracker 

## Overview
**CaseCracker** is an AI-powered legal assistant designed to help users navigate the complexities of Indian law. It can answer general legal queries, provide detailed information about legal issues, rules, petitions, and suggest relevant sections of the Indian Penal Code (IPC). CaseCracker leverages advanced natural language processing (NLP) techniques to provide accurate and contextually relevant legal advice.

## Team Members
1. [Jebin Shaju](https://github.com/jebinshaju)
2. [Sandeep Sreekumar](https://github.com/sandeepsreekumar4067)
3. [Aleena Maria](https://github.com/prettycoolvariables)

## Link to Product Walkthrough
[link to video](Link Here)

## How It Works
1. **User Interface**: The UI has two options - a general chatbot for basic legal queries and a professional chatbot for more in-depth legal advice, including IPC sections and laws.
2. **Interaction**: Users choose the appropriate chatbot for their needs, input their questions, and receive answers based on the AI's training and knowledge of Indian law.

## Libraries Used
### Backend
- **Flask** (v2.0.1): A micro web framework for Python used to create the backend server.
- **Flask-CORS** (v3.0.10): A Flask extension for handling Cross-Origin Resource Sharing (CORS), making it possible to communicate between the frontend and backend.
- **langchain** (v0.0.1): A library for building applications powered by language models.
- **PDFPlumber** (v0.5.28): A library for extracting text, metadata, and other information from PDF files.

### Frontend
- **react-icons** (v4.2.0): A library for including popular icons in React projects.

## Technical Specifications

### LangChain
LangChain is a framework for developing applications using language models. It provides tools to manage and interact with these models, enabling the creation of powerful NLP applications like CaseCracker.

### ChromaDB
ChromaDB is a vector store used for efficient storage and retrieval of document embeddings. In CaseCracker, it helps in managing the embeddings of legal documents, enabling quick and relevant retrieval during queries.

### Flask
Flask is a lightweight WSGI web application framework in Python. It is designed with simplicity and flexibility in mind, allowing developers to quickly set up a web server for backend functionalities.

### Embeddings
Embeddings in NLP are vector representations of words or phrases. In CaseCracker, embeddings are used to convert legal documents into a format that can be efficiently searched and compared.

## How to Configure

### Clone the Repository
```sh
git clone https://github.com/prettycoolvariables/CaseCracker.git
cd CaseCracker
```

### Install Node.js Dependencies
```sh

npm install
```

### Install Python Dependencies
```sh
cd backend
pip install -r requirements.txt
```

## How to Run

### Running the Frontend
1. **Start the React Development Server**:
    ```sh
   
    npm start
    ```
    This will start the frontend on `http://localhost:3000`.

### Running the Backend
1. **Start the Flask Server**:
    ```sh
    cd BACKEND
    python app.py
    ```
    This will start the backend server on `http://localhost:8080`.

### Interacting with the Chatbot
1. **Open your Browser** and navigate to `http://localhost:3000`.
2. **Click the Chat Button** to open the chatbot interface.
3. **Type Your Question** in the input field and press Enter or click the send button.

## Backend Code Details

### Flask Application Setup
Flask is used to set up a simple web server, with CORS configured to allow communication between the frontend (React) and backend (Flask).

### Chatbot Endpoints
- **/ai**: Handles general AI queries.
- **/ask_pdf**: Handles queries requiring detailed document retrieval.
- **/pdf**: Handles PDF uploads for document parsing and embedding.

### AI and Document Retrieval
The necessary components for managing language models, embeddings, and document processing include Ollama for the language model, Chroma for the vector store, RecursiveCharacterTextSplitter for text splitting, and FastEmbedEmbeddings for creating embeddings.

### PDF Handling
This endpoint handles PDF file uploads, extracts text using PDFPlumber, splits the text into manageable chunks, and stores them in ChromaDB with embeddings for efficient retrieval.

### AI Query Handling
Handles general AI queries by invoking the language model and returning the response.

### Document Retrieval and Query Handling
Creates a chain of processes for retrieving relevant documents based on user queries and previous chat history. This involves loading the vector store, setting up a retriever, and managing the conversation context.

### Running the Application
To start the application, run the Flask server which will handle all backend operations and the React development server for the frontend interface.





