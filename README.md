# AI-translator-Next.js-Python-
An AI translator with front-end built with Next.js and backend built with Python

![image](https://github.com/reemrizzk/AI-translator-Next.js-Python-/assets/50383558/aaccb2dc-b262-490d-ba7b-380f21b397fc)

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Introduction

The AI Translator project is designed to facilitate language translation through an intuitive web interface. It uses Next.js, a React framework, for the front-end to create a user-friendly experience, and Python for the back-end to handle translation requests using AI models, and output it in JSON format.

The project uses Hugging Face's Helsinki Opus pre-trained models to translate text between various languages, providing an efficient and easy-to-use solution for language barriers. When loading a model for the first time, it can take a while for the installation.

This project currently offers translation between the languages Arabic, English, French, German, and Spanish.

## Installation

To set up the project locally, follow these steps:

Clone the repository:
```bash
   git clone https://github.com/reemrizzk/AI-translator-Next.js-Python-.git
```

Navigate to the project directory:
```bash
cd AI-translator-Next.js-Python-
```

Install dependencies for the frontend (Next.js):
```bash
cd front-end
npm install
```

Install Python dependencies for the backend:
```bash
# Navigate to the backend directory
cd ../back-end
# Install required Python packages (consider using a virtual environment)
pip install torch
pip install transformers
pip install accelerate
```

## Usage
To run the project locally:

Start the frontend (Next.js):
```bash
# Navigate to the frontend directory
cd front-end
# Start the Next.js development server
npm run dev
```

Start the backend (Python):
```bash
# Navigate to the backend directory
cd ../back-end
# Run the Python backend server
python server.py
```

Access the AI Translator web application in your browser at http://localhost:3000/ and start using the translation functionality.


## License
This project is licensed under the MIT License. Feel free to use and modify it according to your needs.

