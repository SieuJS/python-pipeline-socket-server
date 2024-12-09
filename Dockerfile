# Sử dụng base image hỗ trợ PyTorch
FROM pytorch/pytorch:1.12.0-cuda11.3-cudnn8-runtime

# Cài đặt các thư viện cần thiết
RUN apt-get update && apt-get install -y \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Copy mô hình và mã nguồn vào container
WORKDIR /app
COPY ./exported_model /app/exported_model
COPY ./score.py /app/score.py
COPY ./requirements.txt /app/requirements.txt

# Cài đặt các thư viện Python
RUN pip install --no-cache-dir -r requirements.txt

# Khởi chạy API với Flask hoặc FastAPI
EXPOSE 80
CMD ["python", "score.py"]
