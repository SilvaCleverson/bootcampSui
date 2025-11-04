@echo off
:: Instalar Sui (clique aqui).bat - versão sem emojis

setlocal ENABLEDELAYEDEXPANSION
set SCRIPT_DIR=%~dp0
set PS1=%SCRIPT_DIR%script_sui.ps1

NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo Solicitando permissao de administrador...
  powershell -NoProfile -Command "Start-Process PowerShell -Verb RunAs -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \"\"\"%PS1%\"\"\"' -Wait"
) ELSE (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%"
)

echo.
echo Se precisar de suporte, verifique o log: %SCRIPT_DIR%instalacao_sui.log
pause

