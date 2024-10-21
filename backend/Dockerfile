FROM python:3.9-slim

WORKDIR /backend

COPY ./ /backend/

COPY ./app /app/

COPY requirements.txt /backend/requirements.txt

RUN pip install --no-cache-dir -r /backend/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
