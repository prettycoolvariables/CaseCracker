from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load environment variables from .env file
load_dotenv()

# Initialize global variables
conversation_chains = {}
vector_stores = {}

def get_pdf_text(pdf_files):
    text = ""
    for pdf_file in pdf_files:
        reader = PdfReader(pdf_file)
        for page in reader.pages:
            text += page.extract_text()
    return text

def get_chunk_text(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = HuggingFaceEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vector_store):
    # Load Hugging Face model and tokenizer directly
    model_name = "google/flan-t5-xxl"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    question_answerer = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

    def llm(prompt):
        response = question_answerer(prompt, max_length=512, do_sample=False)
        return response[0]['generated_text']

    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vector_store.as_retriever(),
        memory=memory
    )
    return conversation_chain

# Function to initialize conversation chain with pre-existing PDF
def initialize_conversation_chain(pdf_file, session_id):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()

    text_chunks = get_chunk_text(text)
    vector_store = get_vector_store(text_chunks)
    vector_stores[session_id] = vector_store
    conversation_chains[session_id] = get_conversation_chain(vector_store)

@app.route('/initialize', methods=['POST'])
def initialize_with_existing_pdf():
    # Example endpoint to initialize with a pre-existing PDF
    # This assumes 'COI.pdf' is already uploaded and processed
    pdf_file = 'COI...pdf'  # Path to the pre-existing PDF file
    session_id = 'default'  # Session ID to associate with this conversation chain

    initialize_conversation_chain(pdf_file, session_id)

    return jsonify({"message": "Conversation chain initialized with pre-existing PDF"}), 200

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'files' not in request.files:
        return jsonify({"error": "No files provided"}), 400

    files = request.files.getlist('files')
    pdf_files = [file.stream for file in files]

    raw_text = get_pdf_text(pdf_files)
    text_chunks = get_chunk_text(raw_text)
    vector_store = get_vector_store(text_chunks)

    session_id = request.form.get('session_id')
    if not session_id:
        return jsonify({"error": "No session ID provided"}), 400

    vector_stores[session_id] = vector_store
    conversation_chains[session_id] = get_conversation_chain(vector_store)

    return jsonify({"message": "PDF processed and conversation chain created", "session_id": session_id}), 200

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    session_id = data.get('session_id')
    question = data.get('question')

    if not session_id or not question:
        return jsonify({"error": "Session ID and question are required"}), 400

    if session_id not in conversation_chains:
        return jsonify({"error": "Session ID not found"}), 404

    conversation_chain = conversation_chains[session_id]
    response = conversation_chain({'question': question})
    chat_history = response['chat_history']

    messages = []
    for i, message in enumerate(chat_history):
        if i % 2 == 0:
            messages.append({"sender": "user", "message": message.content})
        else:
            messages.append({"sender": "bot", "message": message.content})

    return jsonify({"chat_history": messages}), 200

if __name__ == '__main__':
    app.run(debug=True)
