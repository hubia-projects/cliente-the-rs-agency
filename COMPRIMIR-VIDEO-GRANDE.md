# 🎬 SOLUÇÃO: Comprimir Vídeo Grande (152MB → <50MB)

## 🚨 PROBLEMA IDENTIFICADO

O vídeo `ovarense-apresentacao-pavilhoes.mp4` tem **152.43 MB**, mas:
- ❌ GitHub tem limite de **100 MB** por arquivo
- ❌ Por isso o vídeo retorna **404** no GitHub Pages

## ✅ SOLUÇÕES

### **SOLUÇÃO 1: Comprimir com Ferramenta Online** (MAIS FÁCIL) ⭐

Use uma dessas ferramentas gratuitas:

1. **HandBrake** (Recomendado - Desktop)
   - Download: https://handbrake.fr/downloads.php
   - Instalação rápida e grátis
   - Instruções abaixo

2. **CloudConvert** (Online - Sem instalar)
   - https://cloudconvert.com/mp4-compress
   - Upload do vídeo
   - Escolha qualidade média (50-70%)
   - Download do vídeo comprimido

3. **Clideo** (Online)
   - https://clideo.com/compress-video
   - Fácil de usar
   - Grátis até 500MB

### **SOLUÇÃO 2: Usar HandBrake (Recomendado)**

#### **Passo 1: Instalar HandBrake**
```
1. Baixe: https://handbrake.fr/downloads.php
2. Instale normalmente
3. Abra o HandBrake
```

#### **Passo 2: Comprimir o Vídeo**
```
1. Clique em "Open Source" ou "File"
2. Selecione: ovarense-apresentacao-pavilhoes.mp4
3. Em "Presets" à direita, escolha: "Fast 720p30"
4. Em "Save As", salve como: ovarense-apresentacao-pavilhoes-compressed.mp4
5. Clique em "Start Encode"
6. Aguarde a compressão (5-10 minutos)
```

#### **Passo 3: Verificar Tamanho**
O vídeo comprimido deve ficar entre 30-50 MB.

#### **Passo 4: Substituir o Arquivo**
```powershell
# Delete o arquivo antigo
Remove-Item "assets/images/novas-midias/ovarense-apresentacao-pavilhoes.mp4"

# Copie o novo arquivo comprimido para a pasta
Copy-Item "C:\Downloads\ovarense-apresentacao-pavilhoes-compressed.mp4" -Destination "assets/images/novas-midias/ovarense-apresentacao-pavilhoes.mp4"
```

### **SOLUÇÃO 3: Usar VLC Media Player**

Se já tem VLC instalado:

```
1. Abra VLC
2. Media > Convert/Save (ou Ctrl+R)
3. Add... > Selecione o vídeo > Convert/Save
4. Profile: Escolha "Video - H.264 + MP3 (MP4)"
5. Settings (ícone chave inglesa):
   - Video codec: H.264
   - Bitrate: 1000 kb/s
   - Audio: 128 kb/s
6. Destination file: ovarense-apresentacao-pavilhoes-compressed.mp4
7. Start
```

### **SOLUÇÃO 4: Hospedar Externamente** (Alternativa)

Se não quiser comprimir, hospede o vídeo em:

#### **YouTube (Privado ou Não Listado)**
```html
<!-- Substitua no HTML -->
<iframe width="100%" height="500" 
  src="https://www.youtube.com/embed/SEU_VIDEO_ID" 
  frameborder="0" allowfullscreen>
</iframe>
```

#### **Vimeo**
```html
<iframe src="https://player.vimeo.com/video/SEU_VIDEO_ID" 
  width="100%" height="500" frameborder="0" allowfullscreen>
</iframe>
```

#### **Google Drive**
1. Upload para Google Drive
2. Botão direito > Compartilhar > Qualquer pessoa com o link
3. Obter link de visualização
4. Usar iframe

## 📊 CONFIGURAÇÕES RECOMENDADAS

Para manter boa qualidade com tamanho menor:

- **Resolução**: 720p (1280x720) ou 1080p
- **Bitrate de Vídeo**: 1000-2000 kbps
- **Codec**: H.264
- **Bitrate de Áudio**: 128 kbps
- **Frame Rate**: 30 fps
- **Tamanho Final**: < 50 MB (ideal)

## 🔧 APÓS COMPRIMIR

### **Passo 1: Substituir o arquivo**
```powershell
# Navegue até a pasta do projeto
cd "C:\Users\HABILFIX\Desktop\DEV\gabriel\Hubia\cli gabriel\site-the-rs-agency\cliente-the-rs-agency"

# Verifique o tamanho do novo arquivo
Get-ChildItem "assets/images/novas-midias/ovarense-apresentacao-pavilhoes.mp4" | Select-Object Name, @{Name="SizeMB";Expression={[math]::Round($_.Length / 1MB, 2)}}
```

### **Passo 2: Descomentar o vídeo no HTML**

Abra `index.html` e procure por:
```html
<!-- Vídeo 2 - Apresentação Pavilhões (TEMPORARIAMENTE DESABILITADO - ARQUIVO MUITO GRANDE) -->
```

Remova os comentários `<!-- -->` para reativar o vídeo.

### **Passo 3: Commit e Push**
```bash
git add .
git commit -m "fix: Comprimir video grande para < 50MB"
git push origin main
```

### **Passo 4: Aguarde Deploy**
Aguarde 1-2 minutos e teste novamente.

## ⚡ SOLUÇÃO RÁPIDA TEMPORÁRIA

Por enquanto, substituí o vídeo grande por uma imagem do logo do Ovarense.
O site está funcionando, mas quando você comprimir o vídeo:

1. Substitua o arquivo
2. Descomente o código do vídeo no HTML
3. Remova a seção do placeholder de imagem
4. Commit e push

## 📞 QUAL SOLUÇÃO VOCÊ PREFERE?

1. **HandBrake Desktop** - Melhor qualidade (5-10 minutos)
2. **CloudConvert Online** - Mais rápido (2-3 minutos)
3. **VLC Media Player** - Se já tem instalado
4. **YouTube/Vimeo** - Sem compressão necessária

**Recomendação**: Use HandBrake para melhor resultado! 🎬