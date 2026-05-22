from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  #permite que o front acesse a API sem problemas de segurança locais

#banco de dados fictício (Mock Data)
DESTINOS = [
    {
        "id": 1,
        "local": "Rio de Janeiro, Brasil",
        "imagem": "rio.jpg",
        "horarios": ["08:30", "14:15", "21:00"],
        "preco_economica": 450.00,
        "preco_executiva": 950.00
    },
    {
        "id": 2,
        "local": "Paris, França",
        "imagem": "paris.jpg",
        "horarios": ["05:00", "12:00", "23:30"],
        "preco_economica": 3200.00,
        "preco_executiva": 7500.00
    },
    {
        "id": 3,
        "local": "Tóquio, Japão",
        "imagem": "toquio.jpg",
        "horarios": ["01:15", "10:45", "18:20"],
        "preco_economica": 4800.00,
        "preco_executiva": 9900.00
    }
]

@app.route('/api/destinos', methods=['GET'])
def get_destinos():
    return jsonify(DESTINOS)

if __name__ == '__main__':
    #rodando em 0.0.0.0 para que o celular consiga acessar o computador na 
    #mesma rede Wi-Fi
    app.run(host='0.0.0.0', port=5000, debug=True)