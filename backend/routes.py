from app import app, db
from models import GoldTransaction
from flask import request, jsonify

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    transaction = GoldTransaction(
        price_per_gram=data['price_per_gram'],
        total_gold=data['total_gold'],
        operator_percent=data.get('operator_percent', 10),
        member_percent=data.get('member_percent', 10),
        credit_percent=data.get('credit_percent', 30),
        profit_percent=data.get('profit_percent', 50)
    )
    result = transaction.calculate_distribution()
    return jsonify(result)
