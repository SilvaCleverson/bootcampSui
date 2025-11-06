@echo off
:: Install Sui (click here).bat

setlocal ENABLEDELAYEDEXPANSION
set SCRIPT_DIR=%~dp0
set PS1=%SCRIPT_DIR%script_sui.ps1

NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo Requesting administrator permission...
  powershell -NoProfile -Command "Start-Process PowerShell -Verb RunAs -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \"\"\"%PS1%\"\"\"' -Wait"
) ELSE (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%"
)

echo.
echo If you need support, check the log: %SCRIPT_DIR%installation_sui.log
pause

