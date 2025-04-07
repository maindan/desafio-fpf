FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --upgrade pip && pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate

COPY . .

EXPOSE 8000
