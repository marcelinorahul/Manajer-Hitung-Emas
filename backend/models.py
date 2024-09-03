from app import db

class GoldTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price_per_gram = db.Column(db.Float, nullable=False)
    total_gold = db.Column(db.Float, nullable=False)
    operator_percent = db.Column(db.Float, default=10)
    member_percent = db.Column(db.Float, default=10)
    credit_percent = db.Column(db.Float, default=30)
    profit_percent = db.Column(db.Float, default=50)

    def calculate_distribution(self):
        total_income = self.price_per_gram * self.total_gold
        operator_share = total_income * (self.operator_percent / 100)
        member_share = total_income * (self.member_percent / 100)
        credit_share = total_income * (self.credit_percent / 100)
        profit_share = total_income * (self.profit_percent / 100)
        return {
            'total_income': total_income,
            'operator_share': operator_share,
            'member_share': member_share,
            'credit_share': credit_share,
            'profit_share': profit_share
        }
