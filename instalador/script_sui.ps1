# script_sui.ps1
# Instalador de 1 clique: Sui CLI + Git + VS Code via Chocolatey (sem emojis)
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

Write-Host ""
Write-Host "Proximos passos:"
Write-Host "  - Abra um PowerShell novo e rode: sui client"
Write-Host "  - Selecione a rede (testnet/devnet/mainnet)"
Write-Host "  - Crie endereço: sui client new-address ed25519"
Write-Host "  - Faucet (se aplicável): sui client faucet"
Write-Host ""
Write-Host "Log salvo em: $LogPath"

try { Stop-Transcript | Out-Null } catch {}
if (-not $Quiet) { Read-Host "Instalação concluída. Pressione ENTER para sair." }