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
  
  # Update PATH to include Chocolatey bin directory
  $chocoPath = "C:\ProgramData\chocolatey\bin"
  if (Test-Path $chocoPath) {
    $env:Path = "$env:Path;$chocoPath"
    [System.Environment]::SetEnvironmentVariable("Path", [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";$chocoPath", "Process")
  }
  
  # Wait a moment and check again
  Start-Sleep -Seconds 2
  
  if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    # Try to refresh environment
    if (Test-Path "$env:ProgramData\chocolatey\bin\refreshenv.cmd") {
      & "$env:ProgramData\chocolatey\bin\refreshenv.cmd" | Out-Null
    }
    Start-Sleep -Seconds 1
    
    if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
      Write-Host "Failed to install Chocolatey. Please restart PowerShell and run the installer again." -ForegroundColor Red
      try { Stop-Transcript | Out-Null } catch {}
      exit 1
    }
  }
  Write-Host "Chocolatey installed successfully." -ForegroundColor Green
} else {
  Write-Host "Chocolatey already installed."
}

function Install-Pkg {
  param([string]$Name, [string]$Title, [switch]$Optional)
  if (-not $Title) { $Title = $Name }
  Write-Host "Installing $Title ..."
  choco install $Name -y --no-progress
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Retrying: $Title"
    choco install $Name -y --no-progress
    if ($LASTEXITCODE -ne 0) {
      if ($Optional) {
        Write-Host "  [WARN] $Title not available in Chocolatey repository. Skipping..." -ForegroundColor Yellow
        return $false
      } else {
        Write-Host "Failed to install $Title." -ForegroundColor Red
        try { Stop-Transcript | Out-Null } catch {}
        exit 1
      }
    }
  }
  return $true
}

# Packages
Install-Pkg -Name "sui"    -Title "Sui CLI"
Install-Pkg -Name "git"    -Title "Git"
Install-Pkg -Name "vscode" -Title "Visual Studio Code"

# Install suiup from GitHub releases
# COMMENTED OUT - Uncomment if needed
<#
Write-Host ""
Write-Host "Installing Suiup from GitHub..." -ForegroundColor Cyan
try {
    # Detect architecture
    $arch = $env:PROCESSOR_ARCHITECTURE
    $procArch = (Get-WmiObject Win32_Processor).Architecture
    
    if ($procArch -eq 9 -or $arch -eq "AMD64" -or $arch -eq "x86_64") {
        $platform = "x86_64-pc-windows-msvc"
        $archName = "x86_64"
    } elseif ($procArch -eq 12 -or $arch -eq "ARM64") {
        $platform = "aarch64-pc-windows-msvc"
        $archName = "ARM64"
    } else {
        $platform = "x86_64-pc-windows-msvc"
        $archName = "x86_64 (default)"
    }
    
    Write-Host "  Detected architecture: $archName" -ForegroundColor Gray
    
    # suiup installs to %LOCALAPPDATA%\bin by default on Windows
    $suiupBinPath = Join-Path $env:LOCALAPPDATA "bin"
    $suiupExe = Join-Path $suiupBinPath "suiup.exe"
    
    # Create bin directory if it doesn't exist
    if (-not (Test-Path $suiupBinPath)) {
        New-Item -ItemType Directory -Path $suiupBinPath -Force | Out-Null
    }
    
    # Try to download from latest release
    # Try different possible URL formats
    $suiupUrls = @(
        "https://github.com/MystenLabs/suiup/releases/latest/download/suiup-$platform.exe",
        "https://github.com/MystenLabs/suiup/releases/latest/download/suiup-$archName-windows.exe",
        "https://github.com/MystenLabs/suiup/releases/latest/download/suiup.exe"
    )
    
    $downloaded = $false
    foreach ($suiupUrl in $suiupUrls) {
        try {
            Write-Host "  Trying: $suiupUrl" -ForegroundColor Gray
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
            Invoke-WebRequest -Uri $suiupUrl -OutFile $suiupExe -UseBasicParsing -ErrorAction Stop
            Write-Host "  [OK] Suiup downloaded successfully" -ForegroundColor Green
            $downloaded = $true
            break
        } catch {
            Write-Host "  Failed: $_" -ForegroundColor DarkGray
            continue
        }
    }
    
    if (-not $downloaded) {
        throw "Could not download suiup from any of the attempted URLs"
    }
    
    # Add to PATH if not already there
    $currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
    if ($currentPath -notlike "*$suiupBinPath*") {
        [System.Environment]::SetEnvironmentVariable("Path", "$currentPath;$suiupBinPath", "User")
    }
    $env:Path = "$env:Path;$suiupBinPath"
    
    # Wait a moment for suiup to be available
    Start-Sleep -Seconds 2
    
    Write-Host "  [OK] Suiup installed successfully" -ForegroundColor Green
} catch {
    Write-Host "  [WARN] Failed to install Suiup: $_" -ForegroundColor Yellow
    Write-Host "         You can install manually from: https://github.com/MystenLabs/suiup/releases" -ForegroundColor Yellow
}
#>

# Install MVR using suiup (if suiup is available)
# COMMENTED OUT - Uncomment if needed
<#
Write-Host ""
Write-Host "Installing MVR via Suiup..." -ForegroundColor Cyan
try {
    # Update PATH to include suiup bin
    $suiupBinPath = Join-Path $env:LOCALAPPDATA "bin"
    $env:Path = "$env:Path;$suiupBinPath"
    
    # Wait a moment for suiup to be available
    Start-Sleep -Seconds 2
    
    # Check if suiup is available
    $suiupCheck = (suiup --version 2>&1)
    Write-Host "  Checking suiup availability..."
    
    if ($LASTEXITCODE -eq 0 -or $suiupCheck -like "*suiup*" -or $suiupCheck -like "*version*") {
        Write-Host "  Installing MVR via suiup..."
        $mvrInstall = suiup install mvr 2>&1
        Write-Host "  Output: $mvrInstall" -ForegroundColor Gray
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  [OK] MVR installed successfully via suiup" -ForegroundColor Green
        } else {
            Write-Host "  [WARN] MVR installation may have failed" -ForegroundColor Yellow
            Write-Host "         You can try manually: suiup install mvr" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [INFO] Suiup not available yet, skipping MVR installation" -ForegroundColor Cyan
        Write-Host "         Install MVR manually after suiup is ready: suiup install mvr" -ForegroundColor Gray
    }
} catch {
    Write-Host "  [INFO] MVR installation skipped: $_" -ForegroundColor Cyan
    Write-Host "         Install manually: suiup install mvr" -ForegroundColor Gray
}
#>

# Validate updated PATH
Write-Host ""
Write-Host "Validating installation..." -ForegroundColor Cyan
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Wait a moment for PATH to be fully updated
Start-Sleep -Seconds 2

# Test installations - Show results in console
Write-Host ""
Write-Host "Testing installed tools..." -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Testing Sui CLI:" -ForegroundColor Yellow
try {
    $suiVersion = sui --version 2>&1
    Write-Host "   Output: $suiVersion" -ForegroundColor Gray
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   [OK] $suiVersion" -ForegroundColor Green
    } else {
        Write-Host "   [WARN] Sui not detected in PATH" -ForegroundColor Yellow
        Write-Host "          Please open a new terminal and run: sui --version" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   [WARN] Sui not detected in PATH" -ForegroundColor Yellow
    Write-Host "          Please open a new terminal and run: sui --version" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "2. Testing Git:" -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    Write-Host "   Output: $gitVersion" -ForegroundColor Gray
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   [OK] $gitVersion" -ForegroundColor Green
    } else {
        Write-Host "   [WARN] Git not detected in PATH" -ForegroundColor Yellow
        Write-Host "          Please open a new terminal and run: git --version" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   [WARN] Git not detected in PATH" -ForegroundColor Yellow
    Write-Host "          Please open a new terminal and run: git --version" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "3. Testing VS Code:" -ForegroundColor Yellow
try {
    $codeVersion = code --version 2>&1 | Select-Object -First 1
    Write-Host "   Output: $codeVersion" -ForegroundColor Gray
    if ($LASTEXITCODE -eq 0 -and $codeVersion) {
        Write-Host "   [OK] VS Code: $codeVersion" -ForegroundColor Green
    } else {
        Write-Host "   [WARN] VS Code not detected in PATH" -ForegroundColor Yellow
        Write-Host "          Please open a new terminal and run: code --version" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   [WARN] VS Code not detected in PATH" -ForegroundColor Yellow
    Write-Host "          Please open a new terminal and run: code --version" -ForegroundColor Yellow
}

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
# Install project in C:\bootcampSui (or C:\bootcampSui_TIMESTAMP if exists)
$PastaBase = "C:\bootcampSui"
$ArquivoZip = Join-Path $env:TEMP "sui-first-steps-main.zip"

# Initialize PastaBootcamp variable
$PastaBootcamp = $null

# Check if C:\bootcampSui exists, if so, create folder with unique timestamp
if (Test-Path $PastaBase) {
    # Use timestamp with date, time, and milliseconds to ensure uniqueness
    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss_fff"
    $PastaBootcamp = "$PastaBase`_$Timestamp"
    Write-Host "C:\bootcampSui already exists. Creating folder with unique timestamp: $PastaBootcamp" -ForegroundColor Yellow
} else {
    $PastaBootcamp = $PastaBase
    Write-Host "Creating bootcampSui folder: $PastaBootcamp"
}

# Ensure PastaBootcamp is set
if (-not $PastaBootcamp) {
    $PastaBootcamp = $PastaBase
}

# Create folder if it doesn't exist
Write-Host "Ensuring folder exists: $PastaBootcamp"
if (-not (Test-Path $PastaBootcamp)) {
    try {
        New-Item -ItemType Directory -Path $PastaBootcamp -Force | Out-Null
        Write-Host "  [OK] Folder created: $PastaBootcamp" -ForegroundColor Green
    } catch {
        Write-Host "  [ERROR] Failed to create folder: $_" -ForegroundColor Red
        Write-Host "  Trying alternative location..." -ForegroundColor Yellow
        $PastaBootcamp = Join-Path $env:USERPROFILE "bootcampSui"
        New-Item -ItemType Directory -Path $PastaBootcamp -Force | Out-Null
        Write-Host "  [OK] Folder created in alternative location: $PastaBootcamp" -ForegroundColor Green
    }
} else {
    Write-Host "  [OK] Using existing folder: $PastaBootcamp" -ForegroundColor Green
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
