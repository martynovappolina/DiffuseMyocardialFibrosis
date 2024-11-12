FROM python:3.9
RUN mkdir /server
WORKDIR /server
COPY ./back/requirements.txt /server/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
COPY ./back /server
CMD ["flask", "run", "--host=0.0.0.0", "--port=5001"]
