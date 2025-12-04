"""
Script para criar thumbnails dos vídeos
Requer: pip install opencv-python pillow
"""

import cv2
import os
from PIL import Image

# Caminhos dos vídeos
video_path = r"assets\images\novas-midias"
videos = [
    ("Behind the scenes_1.mp4", "video-thumb-1.jpg"),
    ("Ovarense_Apresentação Pavilhões.mp4", "video-thumb-2.jpg")
]

def create_thumbnail(video_file, output_file, frame_at_second=2):
    """
    Extrai um frame do vídeo e salva como thumbnail
    """
    video_full_path = os.path.join(video_path, video_file)
    output_full_path = os.path.join(video_path, output_file)
    
    if not os.path.exists(video_full_path):
        print(f"❌ Vídeo não encontrado: {video_full_path}")
        return False
    
    # Abrir o vídeo
    cap = cv2.VideoCapture(video_full_path)
    
    # Obter FPS do vídeo
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_number = int(fps * frame_at_second)
    
    # Pular para o frame desejado
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
    
    # Ler o frame
    ret, frame = cap.read()
    
    if ret:
        # Converter de BGR (OpenCV) para RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Criar imagem PIL
        img = Image.fromarray(frame_rgb)
        
        # Redimensionar para 800x450 (16:9)
        img = img.resize((800, 450), Image.Resampling.LANCZOS)
        
        # Salvar com qualidade alta
        img.save(output_full_path, "JPEG", quality=85, optimize=True)
        
        print(f"✅ Thumbnail criado: {output_file}")
        cap.release()
        return True
    else:
        print(f"❌ Erro ao ler frame do vídeo: {video_file}")
        cap.release()
        return False

# Criar thumbnails
print("🎬 Criando thumbnails dos vídeos...")
print("-" * 50)

for video_file, thumb_file in videos:
    create_thumbnail(video_file, thumb_file, frame_at_second=3)

print("-" * 50)
print("✅ Processo concluído!")
