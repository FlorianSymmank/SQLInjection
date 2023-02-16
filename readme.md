# Vorrausetzungen:
## VirtualBox

(VirtualBox 6 & 7: Terminal öffnet sicht nicht: "Install the virtual system without unattended installation. Check Skip unattended installation.")  

Typ: linux  
Version: Ubuntu 64bit  
Speichergroeße: 8192  
Festplatte erzeugen
Dateigroeße: 15 GB (VDI, dynamisch alloziert)  
Medium für start -> .iso aus link unten (Ubuntu 22.04.1 LTS)

### Ubuntu 22.04.1 LTS  
https://ubuntu.com/download/desktop  

### VirtualBox SQLInject Ubuntu  
name: sqlinject  
computername: sqlinject-VirtualBox  
password: j4UvH)kgeD  

# Ausführung
### Einrichten aller programme (script.sh)  
Im GitRepo liegt ein [Script](./script.sh) zum automatischen Installieren der benötigten Programme (Git, Node, Postgres, React). Kopier dir Script auf die VM und führe es mit z.B.: `sh script.sh` aus.  

Der NodeJS Server wird auf Port 3001 und der React Server auf Port 3000 gestartet.

# Mögliche Angriffe
Einige SQL Injections sind in [sqli.txt](sqli.txt) beschrieben.  
Möglich sind:
- Boolean-Based
- Error-Based
- Time-Based (Komplexes [Angriffsscript](attack_scripts\fs\viaHeader.py) zum Herrausfinden von Tabellen und Spaltennamen)
- Union-Based
- Stack-Based

# Anderes
### psql zugriff per cmd
sudo -u postgres psql  
change db = \connect hospital