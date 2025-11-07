# script_sui.ps1
# One-click installer: Sui CLI + Git + VS Code via Chocolatey
# Generates log: installation_sui.log in the same folder.

param([switch]$Quiet)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $ScriptDir

$LogPath = Join-Path $ScriptDir "installation_sui.log"
try { Stop-Transcript | Out-Null } catch {}
Start-Transcript -Path $LogPath -Append | Out-Null

Write-Host "=== Sui Installer (Windows) ==="

# Check Admin
$principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Host "ERROR: this installer must be run as Administrator." -ForegroundColor Red
  try { Stop-Transcript | Out-Null } catch {}
  exit 1
}

# Temporary ExecutionPolicy
try { Set-ExecutionPolicy Bypass -Scope Process -Force | Out-Null } catch {}

# Chocolatey
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
  Write-Host "Installing Chocolatey..."
  $chocoScript = 'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(''https://community.chocolatey.org/install.ps1''))'
  powershell -NoProfile -ExecutionPolicy Bypass -Command $chocoScript
  if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Failed to install Chocolatey." -ForegroundColor Red
    try { Stop-Transcript | Out-Null } catch {}
    exit 1
  }
  if (Get-Command refreshenv -ErrorAction SilentlyContinue) { refreshenv | Out-Null }
} else {
  Write-Host "Chocolatey already installed."
}

function Install-Pkg {
  param([string]$Name, [string]$Title)
  if (-not $Title) { $Title = $Name }
  Write-Host "Installing $Title ..."
  choco install $Name -y --no-progress
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Retrying: $Title"
    choco install $Name -y --no-progress
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Failed to install $Title." -ForegroundColor Red
      try { Stop-Transcript | Out-Null } catch {}
      exit 1
    }
  }
}

# Packages
Install-Pkg -Name "sui"    -Title "Sui CLI"
Install-Pkg -Name "git"    -Title "Git"
Install-Pkg -Name "vscode" -Title "Visual Studio Code"

# Validate updated PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$suiVersion  = (sui --version) 2>$null
$gitVersion  = (git --version) 2>$null
$codeVersion = (code --version | Select-Object -First 1) 2>$null

Write-Host ""
if ($suiVersion) { Write-Host "Sui: $suiVersion" } else { Write-Host "Sui not detected in PATH (open a new terminal and run 'sui --version')." }
if ($gitVersion) { Write-Host "$gitVersion" } else { Write-Host "Git not detected in PATH (open a new terminal and run 'git --version')." }
if ($codeVersion) { Write-Host "VS Code: $codeVersion" } else { Write-Host "VS Code not detected in PATH (open a new terminal and run 'code --version')." }

# Install VS Code/Cursor extensions
Write-Host ""
Write-Host "Installing VS Code/Cursor extensions for Move..."
Write-Host ""

function Install-Extension {
  param([string]$ExtensionId, [string]$ExtensionName)
  Write-Host "Installing extension: $ExtensionName ..."
  code --install-extension $ExtensionId --force 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] $ExtensionName installed successfully" -ForegroundColor Green
  } else {
    Write-Host "  [WARN] Failed to install $ExtensionName (may already be installed)" -ForegroundColor Yellow
  }
}

# Wait a bit to ensure VS Code is available
Start-Sleep -Seconds 2

Install-Extension -ExtensionId "mysten.prettier-move" -ExtensionName "Prettier Move"
Install-Extension -ExtensionId "mysten.move" -ExtensionName "Sui Move"
Install-Extension -ExtensionId "damirka.move-syntax" -ExtensionName "Move Syntax"

Write-Host ""
Write-Host "Next steps:"
Write-Host "  - Open a new PowerShell and run: sui client"
Write-Host "  - Select network (testnet/devnet/mainnet)"
Write-Host "  - Create address: sui client new-address ed25519"
Write-Host "  - Faucet (if applicable): sui client faucet"
Write-Host ""

# Download and extract sui-first-steps project
Write-Host ""
Write-Host "Downloading Sui First Steps project..." -ForegroundColor Cyan

$ProjetoUrl = "https://github.com/AguaPotavel/sui-first-steps/archive/refs/heads/main.zip"
# Install project in C:\bootcampSui (or C:\bootcampSui_YYYYMMDD if exists)
$PastaBase = "C:\bootcampSui"
$ArquivoZip = Join-Path $env:TEMP "sui-first-steps-main.zip"

# Check if C:\bootcampSui exists, if so, create folder with date
if (Test-Path $PastaBase) {
    $DataAtual = Get-Date -Format "yyyyMMdd"
    $PastaBootcamp = "$PastaBase`_$DataAtual"
    Write-Host "C:\bootcampSui already exists. Creating folder with date: $PastaBootcamp"
} else {
    $PastaBootcamp = $PastaBase
    Write-Host "Creating bootcampSui folder: $PastaBootcamp"
}

# Create folder if it doesn't exist
if (-not (Test-Path $PastaBootcamp)) {
    New-Item -ItemType Directory -Path $PastaBootcamp -Force | Out-Null
    Write-Host "Folder created: $PastaBootcamp" -ForegroundColor Green
} else {
    Write-Host "Using existing folder: $PastaBootcamp"
}

# Download ZIP file
Write-Host "Downloading file from GitHub..."
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $ProjetoUrl -OutFile $ArquivoZip -UseBasicParsing
    Write-Host "  [OK] Download completed" -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] Error downloading file: $_" -ForegroundColor Red
    Write-Host "  Retrying..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    try {
        Invoke-WebRequest -Uri $ProjetoUrl -OutFile $ArquivoZip -UseBasicParsing
        Write-Host "  [OK] Download completed on second attempt" -ForegroundColor Green
    } catch {
        Write-Host "  [ERROR] Failed to download after attempts" -ForegroundColor Red
        $ArquivoZip = $null
    }
}

# Extract file
if ($ArquivoZip -and (Test-Path $ArquivoZip) -and $PastaBootcamp) {
    Write-Host "Extracting file..."
    try {
        # Clean folder if project content already exists
        $PastaExtraida = Join-Path $PastaBootcamp "sui-first-steps-main"
        if (Test-Path $PastaExtraida) {
            Write-Host "  Removing previous content..."
            Remove-Item -Path $PastaExtraida -Recurse -Force -ErrorAction SilentlyContinue
        }
        
        # Extract to C:\bootcampSui
        Expand-Archive -Path $ArquivoZip -DestinationPath $PastaBootcamp -Force
        Write-Host "  [OK] File extracted successfully" -ForegroundColor Green
        
        # Move extracted content directly into bootcampSui
        $PastaExtraida = Join-Path $PastaBootcamp "sui-first-steps-main"
        if (Test-Path $PastaExtraida) {
            # Move all content directly into bootcampSui folder
            Get-ChildItem -Path $PastaExtraida | Move-Item -Destination $PastaBootcamp -Force
            Remove-Item -Path $PastaExtraida -Force -ErrorAction SilentlyContinue
            Write-Host "  [OK] Project installed in: $PastaBootcamp" -ForegroundColor Green
        }
        
        # Clean temporary ZIP file
        Remove-Item -Path $ArquivoZip -Force -ErrorAction SilentlyContinue
        
    } catch {
        Write-Host "  [ERROR] Error extracting: $_" -ForegroundColor Red
    }
} else {
    Write-Host "  [WARN] Could not download project. You can download manually from:" -ForegroundColor Yellow
    Write-Host "  $ProjetoUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Log saved at: $LogPath"

try { Stop-Transcript | Out-Null } catch {}

# Open VS Code/Cursor in bootcampSui folder
Write-Host ""
Write-Host "Opening VS Code/Cursor in bootcampSui folder..." -ForegroundColor Cyan
Start-Sleep -Seconds 1
if ($PastaBootcamp -and (Test-Path $PastaBootcamp)) {
    code $PastaBootcamp 2>&1 | Out-Null
} else {
    code . 2>&1 | Out-Null
}

if (-not $Quiet) {
    Read-Host 'Installation completed. Press ENTER to exit.'
}
