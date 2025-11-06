QUICK INSTRUCTIONS — ONE-CLICK INSTALLER

This installer is available on GitHub:
https://github.com/SilvaCleverson/bootcampSui

INSTALLATION STEPS:

1) Extract the ZIP or clone the repository.
2) Navigate to the 'sui-one-click-installer' folder.
3) Right-click on "Install Sui (run as administrator).bat"
4) Select "Run as administrator" (or simply double-click)
5) Confirm the Windows UAC window and wait for installation.
6) At the end, open a NEW PowerShell window and test:
   - sui --version
   - git --version
   - code --version

WHAT WILL BE INSTALLED:

1. Chocolatey (Package Manager for Windows)
   - Required for installing other packages

2. Sui CLI
   - Command-line tool for Sui blockchain development
   - Latest version from Chocolatey repository

3. Git
   - Version control system
   - Latest version from Chocolatey repository

4. Visual Studio Code
   - Code editor
   - Latest version from Chocolatey repository

5. VS Code/Cursor Extensions (automatically installed):
   - Prettier Move (mysten.prettier-move)
   - Sui Move (mysten.move)
   - Move Syntax (damirka.move-syntax)

6. Sui First Steps Project
   - Downloads and extracts from GitHub
   - Installed in: C:\bootcampSui
   - If C:\bootcampSui already exists, creates: C:\bootcampSui_YYYYMMDD
   - Automatically opens VS Code in the project folder

INSTALLATION LOCATION:

- Project will be installed in: C:\bootcampSui
- If folder exists: C:\bootcampSui_YYYYMMDD (with current date)
- Log file: installation_sui.log (in installer folder)

TROUBLESHOOTING:

- If commands are not recognized after installation, CLOSE and OPEN a new terminal
- If installation fails, check the "installation_sui.log" file in the installer folder
- Make sure to run as administrator
- If VS Code doesn't open automatically, navigate to C:\bootcampSui manually

NEXT STEPS AFTER INSTALLATION:

1. Open a new PowerShell window
2. Run: sui client
3. Select network (testnet/devnet/mainnet)
4. Create address: sui client new-address ed25519
5. Get test tokens: sui client faucet (if on testnet/devnet)
