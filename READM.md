[] native compile for:
yarn add sqlite3
yarn add serialport

# LINUX PERMISSION
port permission in linux
ls /dev/tty*
/dev/ttyUSB0
sudo usermod -a -G dialout $USER
sudo usermod -a -G tty $USER

#INSTALAR DEPENDENCIA PARA REBUILD ELECTRON
#WIN
npm install --global --production windows-build-tools
npm config set python "C:\\Program Files\\Python\\Python27\\python.exe"

#LINUX
sudo apt-get -y install build-essential

#somente se nescessario
sudo apt-get -y install g++
sudo apt-get -y install make


#PACKAGE
"rebuild": "electron-rebuild -f -w @serialport/bindings@2.0.8",
"install": "prebuild-install || node-gyp rebuild",
"rebuild": "electron-rebuild -f -w @serialport/bindings@2.0.8",




#FTDI FILE
10.2  USB B connector communication

the byte stream uses the ASCII characters in the range 1..255 / 0x01..0xFF in hexadecimal

HEADER:
1 = "Start of Header" (<SOH>, 1,  0x01)
2 = counter (range "A" to "Z" overflow "Z" to "A")
3 = "N" => modelos HC30/60TS


BODY:
4 = "Start of Text" (<STX>, 2, 0x02)
5 até fim body = (range 32..126,  0x20..0xFF)
	"Horizontal  tab"  (<HT>  or  <TAB>,  9,  0x09),	if(line.substring(0, 1).equals("\t")){ }
	"Carriage  return"  (<CR>, 13,  0x0D),  			if(line.substring(0, 1).equals("\r")){ }
	"Line  feed"  (<LF>,  10,  0x0A)					if(line.substring(0, 1).equals("\n")){ }
body lines separated by a two-byte sequence <CR><LF>    if(line.substring(0, 1).equals("\r\n")){ } separador linha
body is closed by "End of Text" (<ETX>, 3, 0x03).


FOOTER:
checksum  two-digit hexadecimal summing values of all characters in the message header and body, including the beginning <SOT> and <ETX>, adding 255 (hex: 0xFF) to it, and keeping only the last two hexadecimal(!) digits
last character of a record "End of Transmission" (<EOT>, 4, 0x04)
The next record can start right after the <EOT> character



10.2.2   DETAILS OF THE 3.1 PROTOCOL

header1 to header 8 header1 to header8 are the lab header lines these lines are defined by the user in the instrument settings any or all of these lines can be empty
Serial No.:<HT>serial serial is the 6 digit serial number of the instrument
RecNo:<HT>recno  recno is the internal record number, at most 6 digits
Sample ID:<HT>sampleid sampleid is at most 8 characters long
Patient ID:<HT>patientid patientid is at most 20 characters long
Patient Name:<HT>patientname   patinetname is at most 32 characters long
Mode:<HT>mode
Doctor:<HT>doctor doctor is at maximum 16 characters long
Age:<HT>value<HT>unit value is a number of at most 3 digits, unit is either "years" or "months"
Birth(ymd):<HT>birthdate birthdate is an 8 digit number, format: yyyymmdd
Sex:<HT>gender gender is "Male", "Female", "Neutered", "Spayed" or a single "-" character
Test date(ymd):<HT>date date is an 8 digit number, format: yyyymmdd
Test time(hm):<HT>time time is a 6 digit number, format: hhmmss
Param<HT> Flags<HT> Value<HT>  Unit<HT>[min-max] this is a header line, always the same


param<HT>flag<HT>value<HT> unit<HT>[min-max] :
There are 24 similar lines:
param is the parameter name, at most four characters long,
possible values are (in sequence): WBC, RBC, HGB, HCT, MCV,
MCH, MCHC, PLT, PCT, MPV, PDWs, PDWc, RDWs, RDWc,
LYM, MON, NEU, LY%, MO%, NE%, EOS, EO%, BAS, BA%
flag is a single character indicator, can be " " (space), "+", "-",
"E" and "*"(asterisk) value is the measured parameter value,
exactly 4 characters: number with a possible decimal dot,
padded with spaces on the left side, or 4 minus signs "----",
or 4 spaces " " unit is at most 4 characters long, possible
values are "10 9 /L", "10 3 / μ L", "10 12 /L", "10 6 /uL", "fL", "%", "g/L", "g/dL", "mmol/L", "pg", "fmol", depending on the
parameter. Min and max are the lower and upper bounds of
the normal range, exactly 4 characters, including a possible
decimal dot, padded with spaces on the left side



Flags:<HT>flags flags is a series of characters indicating errors, at most 32 characters long, upper or lowercase letters "a" to "z"
WBC graph  always the same, indicates the beginning of the WBC histo-gram
Scale(fl):<HT>wbcscale  wbcscale is maximum 3 digit number, indicating the fl value of the last channel, value is usually 400
Channels:<HT>wbcchannels  wbcchannels is the number of channels (columns) in the histogram, always 256
WMarker1:<HT>wm1  wm1 is the first WBC discriminator channel (RBC/WBC)
WMarker2:<HT>wm2  wm2 is the second WBC discriminator channel (LYM/MON)
WMarker3:<HT>wm3  wm3 is the third WBC discriminator channel (MON/NEU)
Points:<HT>ch0<HT>...<HT>ch255 chxx is the histogram height at a given channel (range 0..255), there are always wbcchannels values here (usually256)
RBC graph always the same, indicates the beginning of the RBC histo-gram
Scale(fl):<HT>rbcscale  rbcscale is maximum 3 digit number, indicating the fl value of the last channel, value is usually 200
Channels:<HT>rbcchannels rbcchannels is the number of channels (columns) in the histogram, always 256
RMarker1:<HT>rm1  rm1 is the RBC discriminator channel (PLT/RBC)
Points:<HT>ch0<HT>...<HT>ch255 chxx is the histogram height at a given channel (range 0..255), there are always rbcchannels values here (usually256)
EOS graph always the same, indicates the beginning of the EOS histo-gram
Scale(fl):<HT>eosscale  eosscale is maximum 3 digit number, indicating the fl value of the last channel, value is usually 400
Channels:<HT>eoschannels  eoschannels is the number of channels (columns) in the histogram, always 256
EMarker1:<HT>em1  em1 is the EOS discriminator channel (WBC/EOS)
Points:<HT>ch0<HT>...<HT>ch255 chxx is the histogram height at a given channel (range 0..255), there are always eoschannels values here (usually256)
PLT graph always the same, indicates the beginning of the PLT histo-gram
Scale(fl):<HT>pltscale pltscale is maximum 3 digit number, indicating the fl value of the last channel, value is usually 50
Channels:<HT>pltchannels pltchannels is the number of channels (columns) in the histogram, always 256
PMarker1:<HT>pm1 pm1 is the first PLT discriminator channel (PLT start)
PMarker2:<HT>pm2  pm2 is the second PLT discriminator channel (PLT/RBC)
Points:<HT>ch0<HT>...<HT>ch255 chxx is the histogram height at a given channel (range 0..255), there are always pltchannels values here usually 256)




Humacount30TS
short idVendor = 0x0403;
short idProduct = 0x6001;
Chip FT232R
http://www.ftdichip.com
