# Script para renomear vídeos e corrigir paths no HTML
# Execute este script na raiz do projeto

Write-Host "🎬 Script de Correção de Vídeos para GitHub Pages" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (!(Test-Path "assets/images/novas-midias")) {
    Write-Host "❌ Erro: Pasta 'assets/images/novas-midias' não encontrada!" -ForegroundColor Red
    Write-Host "Execute este script na raiz do projeto." -ForegroundColor Yellow
    exit
}

Write-Host "✅ Pasta encontrada!" -ForegroundColor Green
Write-Host ""

# Listar vídeos atuais
Write-Host "📹 Vídeos encontrados:" -ForegroundColor Yellow
Get-ChildItem "assets/images/novas-midias/*.mp4" | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  - $($_.Name) ($sizeMB MB)" -ForegroundColor White
}
Write-Host ""

# Perguntar se deseja renomear
$resposta = Read-Host "Deseja renomear os arquivos para remover espaços e caracteres especiais? (S/N)"

if ($resposta -eq "S" -or $resposta -eq "s") {
    Write-Host ""
    Write-Host "🔄 Renomeando arquivos..." -ForegroundColor Cyan
    
    # Renomear Behind the scenes_1.mp4
    if (Test-Path "assets/images/novas-midias/Behind the scenes_1.mp4") {
        Rename-Item "assets/images/novas-midias/Behind the scenes_1.mp4" -NewName "behind-the-scenes-1.mp4"
        Write-Host "  ✅ Renomeado: Behind the scenes_1.mp4 → behind-the-scenes-1.mp4" -ForegroundColor Green
    }
    
    # Renomear Ovarense_Apresentação Pavilhões.mp4
    if (Test-Path "assets/images/novas-midias/Ovarense_Apresentação Pavilhões.mp4") {
        Rename-Item "assets/images/novas-midias/Ovarense_Apresentação Pavilhões.mp4" -NewName "ovarense-apresentacao-pavilhoes.mp4"
        Write-Host "  ✅ Renomeado: Ovarense_Apresentação Pavilhões.mp4 → ovarense-apresentacao-pavilhoes.mp4" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "✅ Arquivos renomeados com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANTE: Agora você precisa atualizar os caminhos no index.html" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Substitua no index.html:" -ForegroundColor White
    Write-Host "  'Behind the scenes_1.mp4' → 'behind-the-scenes-1.mp4'" -ForegroundColor Cyan
    Write-Host "  'Ovarense_Apresentação Pavilhões.mp4' → 'ovarense-apresentacao-pavilhoes.mp4'" -ForegroundColor Cyan
    Write-Host ""
    
} else {
    Write-Host "❌ Operação cancelada." -ForegroundColor Red
}

Write-Host ""
Write-Host "📊 Verificando tamanho dos arquivos..." -ForegroundColor Cyan
Write-Host ""

$arquivosGrandes = @()
Get-ChildItem "assets/images/novas-midias/*.mp4" | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    if ($sizeMB -gt 50) {
        $arquivosGrandes += $_.Name
        Write-Host "  ⚠️  $($_.Name) é grande: $sizeMB MB" -ForegroundColor Yellow
    } else {
        Write-Host "  ✅ $($_.Name): $sizeMB MB (OK)" -ForegroundColor Green
    }
}

if ($arquivosGrandes.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  ATENÇÃO: Arquivos grandes detectados!" -ForegroundColor Yellow
    Write-Host "Considere comprimir estes arquivos para melhor performance no GitHub Pages." -ForegroundColor Yellow
    Write-Host "Recomendado: < 50MB por arquivo" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Script concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "  1. Atualizar caminhos no index.html (se renomeou os arquivos)" -ForegroundColor White
Write-Host "  2. git add ." -ForegroundColor White
Write-Host "  3. git commit -m 'Fix: Renomear vídeos para GitHub Pages'" -ForegroundColor White
Write-Host "  4. git push origin main" -ForegroundColor White
Write-Host "  5. Aguardar deploy (1-2 minutos) e testar" -ForegroundColor White
Write-Host ""