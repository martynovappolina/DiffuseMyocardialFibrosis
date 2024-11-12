import pandas as pd
from flask import Flask, request, Response
from flask_cors import CORS
from joblib import dump, load

random_forest = load('./RandomForest_DN.joblib')

app = Flask(__name__)
CORS(app)

def getDataFromFields(request):
    data = [request.form[field] for field in request.form]
    return [data]


@app.route('/hello')
def hello_world():
    return 'Hello, world!'


@app.route('/predict', methods=['POST'])
def predict():
    data = {
        'Пол': 0,
        'Galectin-3': 0,
        'PICP': [request.form['picp']],
        'PIIINP': 0,
        'ProBNP\n(0-125)\nпг\мл': [request.form['nt_proBNP']],
        'TGF-1b': [request.form['tgf_1b']],
        'Возраст': 0,
        'Рост': 0,
        'Вес': 0,
        'ИМТ кг/м2': 0,
        'Длительность \nзаболевания\n(количество лет)': [request.form['duration_of_the_disease']],
        'ИФР-1\n(15-250 нг/мл)': 0,
        'Ремиссия\n0-нет ремиссии\n1-ремиссия\n': 0,
        'Нарушение\nуглеводного\nобмена\n1-нет\n2-есть': 0,
        'АГ степень': 0,
        'Интервал\nPQ  (мс)': 0,
        'ЛП мм\nдо 40 мм': [request.form['left_atrium']],
        'ЛП V мл\nдо 69 мл': 0,
        'МЖП\nдо10 мм': 0,
        'ЗС': 0,
        'КДР\nдо 58 мм': 0,
        'ИММЛЖ\nм до 115г/м2\nж до 95 г/м2': 0,
        'КДО\n': 0,
        'КСО': 0,
        'ФВ%\n(>54)': 0,
    }

    df = pd.DataFrame(data)
    predicted = random_forest.predict(df)

    res = {'data': '', 'status': 200}

    if predicted[0] == 0:
        res['data'] = "Прогнозируется отсутствие отсроченного диффузного накопления миокарда. Вероятность правильного прогноза от 29% до 100%."
    if predicted[0] == 1:
        res['data'] = "Прогнозируется наличие отсроченного диффузного накопления миокарда. Вероятность правильного прогноза от 83% до 100%."

    return res

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
