## VirtualBox    
Neue erstellen  
Typ: linux  
Version: Unbuntu 64bit  
Speichergroeße: 8192  
Festplatte erzeugen
Dateigroeße: 15 GB (VDI, dynamisch alloziert)  
Medium für start -> .iso aus link unten (Ubuntu 22.04.1 LTS)

### Ubuntu 22.04.1 LTS  
https://ubuntu.com/download/desktop  

### VirtualBox SQLInject Ubuntu  
name: sqlinject  
computername: sqlinject-VirtalBox  
password: j4UvH)kgeD  

### [Einrichten](./script.sh)  aller programme (script.sh)  
sh script.sh

### psql zugriff per cmd
sudo -u postgres psql  
change db = \connect hospital