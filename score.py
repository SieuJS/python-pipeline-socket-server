from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from flask import Flask, request, jsonify

app = Flask(__name__)

# Nạp mô hình và tokenizer
model_path = "./exported_model"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSeq2SeqLM.from_pretrained(model_path)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data['text']
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    summary_ids = model.generate(inputs['input_ids'], max_length=512, min_length=10, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
