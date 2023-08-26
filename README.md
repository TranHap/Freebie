Sau khi tải code về, chúng ta vào terminal gõ:
1. npm install
2. npm run dev
Sau đó, để hạy AI model, vào terminal gõ:
1. cd categorize_model
2. pip install -r requirements.txt
3. uvicorn mlapi:app --host 0.0.0.0 --port 8000
