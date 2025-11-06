# script_sui.ps1
# Instalador de 1 clique: Sui CLI + Git + VS Code via Chocolatey
# Gera log: instalacao_sui.log na mesma pasta.

param([switch]$Quiet)

Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Path)

$LogPath = Join-Path (Get-Location) "instalacao_sui.log"
try { Stop-Transcript | Out-Null } catch {}
Start-Transcript -Path $LogPath -Append | Out-Null

Write-Host "=== Instalador Sui (Windows) ==="

# Verificar Admin
$principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Host "ERRO: este instalador precisa ser executado como Administrador." -ForegroundColor Red
  try { Stop-Transcript | Out-Null } catch {}
  exit 1
}

# ExecutionPolicy temporário
try { Set-ExecutionPolicy Bypass -Scope Process -Force | Out-Null } catch {}

# Chocolatey
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
  Write-Host "Instalando Chocolatey..."
  $chocoScript = 'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString("https://community.chocolatey.org/install.ps1"))'
  powershell -NoProfile -ExecutionPolicy Bypass -Command $chocoScript
  if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Falha ao instalar Chocolatey." -ForegroundColor Red
    try { Stop-Transcript | Out-Null } catch {}
    exit 1
  }
  if (Get-Command refreshenv -ErrorAction SilentlyContinue) { refreshenv | Out-Null }
} else {
  Write-Host "Chocolatey já instalado."
}

function Install-Pkg {
  param([string]$Name, [string]$Title)
  if (-not $Title) { $Title = $Name }
  Write-Host "Instalando $Title ..."
  choco install $Name -y --no-progress
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Tentando novamente: $Title"
    choco install $Name -y --no-progress
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Falha ao instalar $Title." -ForegroundColor Red
      try { Stop-Transcript | Out-Null } catch {}
      exit 1
    }
  }
}

# Pacotes
Install-Pkg -Name "sui"    -Title "Sui CLI"
Install-Pkg -Name "git"    -Title "Git"
Install-Pkg -Name "vscode" -Title "Visual Studio Code"

# Validar PATH atualizado
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$suiVersion  = (sui --version) 2>$null
$gitVersion  = (git --version) 2>$null
$codeVersion = (code --version | Select-Object -First 1) 2>$null

Write-Host ""
if ($suiVersion) { Write-Host "Sui: $suiVersion" } else { Write-Host "Sui não detectado no PATH (abra um novo terminal e rode 'sui --version')." }
if ($gitVersion) { Write-Host "$gitVersion" } else { Write-Host "Git não detectado no PATH (abra um novo terminal e rode 'git --version')." }
if ($codeVersion) { Write-Host "VS Code: $codeVersion" } else { Write-Host "VS Code não detectado no PATH (abra um novo terminal e rode 'code --version')." }

# Instalar extensões do VS Code/Cursor
Write-Host ""
Write-Host "Instalando extensões do VS Code/Cursor para Move..."
Write-Host ""

function Install-Extension {
  param([string]$ExtensionId, [string]$ExtensionName)
  Write-Host "Instalando extensão: $ExtensionName ..."
  code --install-extension $ExtensionId --force 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ $ExtensionName instalada com sucesso" -ForegroundColor Green
  } else {
    Write-Host "  ⚠ Falha ao instalar $ExtensionName (pode já estar instalada)" -ForegroundColor Yellow
  }
}

# Aguardar um pouco para garantir que o VS Code está disponível
Start-Sleep -Seconds 2

Install-Extension -ExtensionId "mysten.prettier-move" -ExtensionName "Prettier Move"
Install-Extension -ExtensionId "mysten.move" -ExtensionName "Sui Move"
Install-Extension -ExtensionId "damirka.move-syntax" -ExtensionName "Move Syntax"

Write-Host ""
Write-Host "Proximos passos:"
Write-Host "  - Abra um PowerShell novo e rode: sui client"
Write-Host "  - Selecione a rede (testnet/devnet/mainnet)"
Write-Host "  - Crie endereço: sui client new-address ed25519"
Write-Host "  - Faucet (se aplicável): sui client faucet"
Write-Host ""

# Baixar e descompactar o projeto bootcampSui
Write-Host ""
Write-Host "Baixando projeto Sui First Steps..." -ForegroundColor Cyan

$ProjetoUrl = "https://github.com/AguaPotavel/sui-first-steps/archive/refs/heads/main.zip"
# Pasta bootcampSui será criada no diretório pai do instalador
# Se o script está em bootcampSui/instalador/, então .Parent é bootcampSui/
$PastaBootcamp = (Get-Location).Parent
$ArquivoZip = Join-Path $env:TEMP "sui-first-steps-main.zip"

# Criar pasta bootcampSui se não existir
if (-not (Test-Path $PastaBootcamp)) {
    Write-Host "Criando pasta bootcampSui: $PastaBootcamp"
    New-Item -ItemType Directory -Path $PastaBootcamp -Force | Out-Null
} else {
    Write-Host "Usando pasta bootcampSui existente: $PastaBootcamp"
}

# Baixar o arquivo ZIP
Write-Host "Baixando arquivo do GitHub..."
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $ProjetoUrl -OutFile $ArquivoZip -UseBasicParsing
    Write-Host "  ✓ Download concluído" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Erro ao baixar o arquivo: $_" -ForegroundColor Red
    Write-Host "  Tentando novamente..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    try {
        Invoke-WebRequest -Uri $ProjetoUrl -OutFile $ArquivoZip -UseBasicParsing
        Write-Host "  ✓ Download concluído na segunda tentativa" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Falha ao baixar após tentativas" -ForegroundColor Red
        $ArquivoZip = $null
    }
}

# Descompactar o arquivo
if ($ArquivoZip -and (Test-Path $ArquivoZip)) {
    Write-Host "Descompactando arquivo..."
    try {
        # Limpar pasta se já existir conteúdo do projeto
        $PastaExtraida = Join-Path $PastaBootcamp "sui-first-steps-main"
        if (Test-Path $PastaExtraida) {
            Write-Host "  Removendo conteúdo anterior..."
            Remove-Item -Path $PastaExtraida -Recurse -Force -ErrorAction SilentlyContinue
        }
        
        # Descompactar
        Expand-Archive -Path $ArquivoZip -DestinationPath $PastaBootcamp -Force
        Write-Host "  ✓ Arquivo descompactado com sucesso" -ForegroundColor Green
        
        # Renomear pasta extraída se necessário (o ZIP extrai como sui-first-steps-main)
        $PastaExtraida = Join-Path $PastaBootcamp "sui-first-steps-main"
        if (Test-Path $PastaExtraida) {
            # Mover conteúdo para dentro de bootcampSui diretamente
            Get-ChildItem -Path $PastaExtraida | Move-Item -Destination $PastaBootcamp -Force
            Remove-Item -Path $PastaExtraida -Force -ErrorAction SilentlyContinue
            Write-Host "  ✓ Estrutura de pastas organizada" -ForegroundColor Green
        }
        
        # Limpar arquivo ZIP temporário
        Remove-Item -Path $ArquivoZip -Force -ErrorAction SilentlyContinue
        
    } catch {
        Write-Host "  ✗ Erro ao descompactar: $_" -ForegroundColor Red
    }
} else {
    Write-Host "  ⚠ Não foi possível baixar o projeto. Você pode baixar manualmente de:" -ForegroundColor Yellow
    Write-Host "  $ProjetoUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Log salvo em: $LogPath"

try { Stop-Transcript | Out-Null } catch {}

# Abrir VS Code/Cursor na pasta bootcampSui
Write-Host ""
Write-Host "Abrindo VS Code/Cursor na pasta bootcampSui..." -ForegroundColor Cyan
Start-Sleep -Seconds 1
if (Test-Path $PastaBootcamp) {
    code $PastaBootcamp 2>&1 | Out-Null
} else {
    code . 2>&1 | Out-Null
}

if (-not $Quiet) { Read-Host "Instalacao concluida. Pressione ENTER para sair." }