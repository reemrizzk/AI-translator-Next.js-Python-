from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from transformers import MarianMTModel, MarianTokenizer
import json

class TranslateHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.models = {
            "ar-de": 'Helsinki-NLP/opus-mt-ar-de',
            "ar-en": 'Helsinki-NLP/opus-mt-ar-en',
            "ar-es": 'Helsinki-NLP/opus-mt-ar-es',
            "ar-fr": 'Helsinki-NLP/opus-mt-ar-fr',
            "de-ar": 'Helsinki-NLP/opus-mt-de-ar',
            "de-en": 'Helsinki-NLP/opus-mt-de-en',
            "de-es": 'Helsinki-NLP/opus-mt-de-es',
            "de-fr": 'Helsinki-NLP/opus-mt-de-fr',
            "en-ar": 'Helsinki-NLP/opus-mt-en-ar',
            "en-de": 'Helsinki-NLP/opus-mt-en-de',
            "en-es": 'Helsinki-NLP/opus-mt-en-es',
            "en-fr": 'Helsinki-NLP/opus-mt-en-fr',
            "es-ar": 'Helsinki-NLP/opus-mt-es-ar',
            "es-de": 'Helsinki-NLP/opus-mt-es-de',
            "es-en": 'Helsinki-NLP/opus-mt-es-en',
            "es-fr": 'Helsinki-NLP/opus-mt-es-fr',
            "fr-ar": 'Helsinki-NLP/opus-mt-fr-ar',
            "fr-de": 'Helsinki-NLP/opus-mt-fr-de',
            "fr-en": 'Helsinki-NLP/opus-mt-fr-en',
            "fr-es": 'Helsinki-NLP/opus-mt-fr-es',
            "default": 'Helsinki-NLP/opus-mt-en-ar'
        }
        super().__init__(*args, **kwargs)

    def do_GET(self):
        parsed_url = urlparse(self.path)
        query_parameters = parse_qs(parsed_url.query)
        source_lang = query_parameters.get('langs', ['en'])[0]

        model_name = self.models.get(source_lang, self.models["default"])

        try:
            if 'text_to_translate' in query_parameters:
                text_to_translate = query_parameters['text_to_translate'][0]
                
                tokenizer = MarianTokenizer.from_pretrained(model_name)
                model = MarianMTModel.from_pretrained(model_name)

                inputs = tokenizer.encode(text_to_translate, return_tensors="pt")
                translated = model.generate(inputs, max_length=255, num_beams=4, no_repeat_ngram_size=3, early_stopping=True)
                translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)

                response = {
                    "status": True,
                    "translated_text": translated_text
                }

            else:
                response = {"status": False, "error": "text_to_translate parameter not found"}

        except Exception as e:
            response = {"status": False, "error": str(e)}

        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST')
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        self.wfile.write(json.dumps(response).encode('utf-8'))

def run_server():
    server_address = ('localhost', 8000)
    httpd = HTTPServer(server_address, TranslateHandler)
    print('The API is running at localhost:8000!')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
