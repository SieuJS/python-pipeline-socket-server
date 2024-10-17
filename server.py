import socket
import spacy
import os

def load_model():
    cwd = os.getcwd()
    model_path = os.path.join(cwd, "path_to_your_model")
    return spacy.load(model_path)

def handle_client(client_socket, nlp):
    data = client_socket.recv(1024).decode("utf-8")
    print(f"Received data: {data}")

    doc = nlp(data)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    response = str(entities)

    client_socket.send(response.encode("utf-8"))
    client_socket.close()

def start_server():
    nlp = load_model()
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(("localhost", 9090))  # Changed port to 9090
    server_socket.listen(5)
    print("Server is listening on port 9090...")

    while True:
        client_socket, addr = server_socket.accept()
        client_socket.emit("connect", addr)
        print(f"Connection from {addr}")
        handle_client(client_socket, nlp)

if __name__ == "__main__":
    start_server()
