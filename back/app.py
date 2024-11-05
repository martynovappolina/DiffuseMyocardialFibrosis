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


@app.route('/predict/', methods=['POST'])
def predict():
    data = {
        # 'ProBNP': [request.form['ProBNP']],
        # 'TGF-1b': [request.form['TGF-1b']],
        # 'LP_mm': [request.form['LP_mm']],
        'Длительность \nзаболевания\n(количество лет)': [request.form['duration_of_the_disease']],
        'TGF-1b': [request.form['tgf_1b']],
        'ProBNP\n(0-125)\nпг\мл': [request.form['nt_proBNP']],
        'PICP': [request.form['picp']],
        'ЛП мм\nдо 40 мм': [request.form['left_atrium']],
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
