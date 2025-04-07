FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

COPY ./entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

CMD ["/app/entrypoint.sh", "daphne", "-b", "0.0.0.0", "-p", "8000", "api.asgi:application"]