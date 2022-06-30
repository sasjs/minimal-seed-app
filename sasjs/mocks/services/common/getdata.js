// this file will take input and return a response
const responses = [
  `
{"SYSDATE":"21JUN22","SYSTIME":"17:59","springs":[{"LATITUDE":51.925,"LONGITUDE":-177.16,"NAME":"Fumaroles on Kanaga Island","AREA":"Adak","TYPE":"Hotspring","FARENHEIT":219,"CELSIUS":104},{"LATITUDE":52.042,"LONGITUDE":-176.108,"NAME":"Hot Springs on Great Sitkin Island","AREA":"Adak","TYPE":"Hotspring","FARENHEIT":210,"CELSIUS":99},{"LATITUDE":51.81,"LONGITUDE":-177.79,"NAME":"Hot Spring on Tanaga Island","AREA":"Adak","TYPE":"Hotspring","FARENHEIT":null,"CELSIUS":null},{"LATITUDE":51.97,"LONGITUDE":-176.61,"NAME":"Hot Springs on Adak Island","AREA":"Adak","TYPE":"Hotspring","FARENHEIT":154,"CELSIUS":68}],
"SYSUSERID":"sasjsuser",
"MF_GETUSER":"SASjs User",
"_DEBUG":"",
"_PROGRAM":"/Public/app/minimal-seed-app/services/common/getdata",
"SYSCC":"0",
"SYSERRORTEXT":"","SYSHOSTINFOLONG":"","SYSHOSTNAME":"sas",
"SYSPROCESSID":"41DD607F9C7200B90000000000000000",
"SYSPROCESSMODE":"Stored Program","SYSPROCESSNAME":"",
"SYSJOBID":"542908",
"SYSSCPL":"LINUX","SYSSITE":"0",
"SYSTCPIPHOSTNAME":"https://sasjs.com",
"SYSVLONG":"",
"SYSWARNINGTEXT":"",
"END_DTTM":"2022-06-21T17:59:14.515731",
"AUTOEXEC":"","MEMSIZE":"0KB"}
`,
  `
  {"SYSDATE" : "29JUN22"
,"SYSTIME" : "18:25"
, "springs":
[
{"LATITUDE":51.925 ,"LONGITUDE":-177.16 ,"NAME":"Fumaroles on Kanaga Island" ,"AREA":"Adak" ,"TYPE":"Hotspring" ,"FARENHEIT":219 ,"CELSIUS":104 }
,{"LATITUDE":65.858 ,"LONGITUDE":-164.71 ,"NAME":"Serpentine Hot Springs" ,"AREA":"Bendeleben" ,"TYPE":"Hotspring" ,"FARENHEIT":171 ,"CELSIUS":77 }
,{"LATITUDE":53.851 ,"LONGITUDE":-166.918 ,"NAME":"Hot Springs Near Makushin Volcano" ,"AREA":"Unalaska" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.877 ,"LONGITUDE":-166.448 ,"NAME":"Hot Springs Near Summer Bay" ,"AREA":"Unalaska" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.27 ,"LONGITUDE":-174.042 ,"NAME":"Hot Springs on Atka Island" ,"AREA":"Atka" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.34 ,"LONGITUDE":-174.26 ,"NAME":"Hot Springs on Atka Island" ,"AREA":"Atka" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.358 ,"LONGITUDE":-172.317 ,"NAME":"Hot Spring on Seguam Island" ,"AREA":"Seguam" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.84 ,"LONGITUDE":-169.9 ,"NAME":"Chuginadak Hot Springs" ,"AREA":"Samalga Island" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.96 ,"LONGITUDE":-169.71 ,"NAME":"Hot Spring on Kagamil Island" ,"AREA":"Samalga Island" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":51.94 ,"LONGITUDE":-178.5 ,"NAME":"Hot Spring on Little Sitkin Island" ,"AREA":"Rat Islands" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":51.963 ,"LONGITUDE":-178.491 ,"NAME":"Fumaroles on Little Sitkin Island" ,"AREA":"Rat Islands" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":51.775 ,"LONGITUDE":-178.793 ,"NAME":"Fumaroles on Gareloi Island" ,"AREA":"Gareloi Island" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.207 ,"LONGITUDE":-168.445 ,"NAME":"Hot Springs Near Geyser Bight" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.892 ,"LONGITUDE":-166.93 ,"NAME":"Makushin Volcano Fumaroles" ,"AREA":"Unalaska" ,"TYPE":"Hotspring" ,"FARENHEIT":310 ,"CELSIUS":154 }
,{"LATITUDE":54.9 ,"LONGITUDE":-162.885 ,"NAME":"Hot Spring on Amagat Island" ,"AREA":"False Pass" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.213 ,"LONGITUDE":-168.463 ,"NAME":"Hot Springs Near Geyser Bight" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":216 ,"CELSIUS":102 }
,{"LATITUDE":53.223 ,"LONGITUDE":-168.477 ,"NAME":"Hot Springs Near Geyser Bight" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":214 ,"CELSIUS":101 }
,{"LATITUDE":53.443 ,"LONGITUDE":-168.092 ,"NAME":"Thermal Springs In Okmok Caldera" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":212 ,"CELSIUS":100 }
],
"SYSUSERID" : "sasjsuser"
,"MF_GETUSER" : "SASjs User"
,"_DEBUG" : ""
,"_PROGRAM" : "/Public/app/minimal-seed-app/services/common/getdata.sas"
,"SYSCC" : "1012"
,"SYSERRORTEXT" : "File WORK.AREAS.DATA does not exist."
,"SYSHOSTINFOLONG" : ""
,"SYSHOSTNAME" : "https://sasjs.com"
,"SYSPROCESSID" : "41DD63242C44ED914018000000000000"
,"SYSPROCESSMODE" : "SAS Batch Mode"
,"SYSPROCESSNAME" : ""
,"SYSJOBID" : "24184"
,"SYSSCPL" : "WINDOWS"
,"SYSSITE" : "0"
,"SYSTCPIPHOSTNAME" : "https://sasjs.com"
,"SYSVLONG" : ""
,"SYSWARNINGTEXT" : ""
,"END_DTTM" : "2022-06-29T18:25:55.407000"
,"AUTOEXEC" : ""
,"MEMSIZE" : "2GB"
}
  `,
  `
  {"SYSDATE" : "28JUN22"
,"SYSTIME" : "10:46"
, "springs":
[
{"LATITUDE":51.925 ,"LONGITUDE":-177.16 ,"NAME":"Fumaroles on Kanaga Island" ,"AREA":"Adak" ,"TYPE":"Hotspring" ,"FARENHEIT":219 ,"CELSIUS":104 }
,{"LATITUDE":65.858 ,"LONGITUDE":-164.71 ,"NAME":"Serpentine Hot Springs" ,"AREA":"Bendeleben" ,"TYPE":"Hotspring" ,"FARENHEIT":171 ,"CELSIUS":77 }
,{"LATITUDE":53.851 ,"LONGITUDE":-166.918 ,"NAME":"Hot Springs Near Makushin Volcano" ,"AREA":"Unalaska" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.877 ,"LONGITUDE":-166.448 ,"NAME":"Hot Springs Near Summer Bay" ,"AREA":"Unalaska" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.27 ,"LONGITUDE":-174.042 ,"NAME":"Hot Springs on Atka Island" ,"AREA":"Atka" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.34 ,"LONGITUDE":-174.26 ,"NAME":"Hot Springs on Atka Island" ,"AREA":"Atka" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.358 ,"LONGITUDE":-172.317 ,"NAME":"Hot Spring on Seguam Island" ,"AREA":"Seguam" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.84 ,"LONGITUDE":-169.9 ,"NAME":"Chuginadak Hot Springs" ,"AREA":"Samalga Island" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.96 ,"LONGITUDE":-169.71 ,"NAME":"Hot Spring on Kagamil Island" ,"AREA":"Samalga Island" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":51.94 ,"LONGITUDE":-178.5 ,"NAME":"Hot Spring on Little Sitkin Island" ,"AREA":"Rat Islands" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":51.963 ,"LONGITUDE":-178.491 ,"NAME":"Fumaroles on Little Sitkin Island" ,"AREA":"Rat Islands" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":51.775 ,"LONGITUDE":-178.793 ,"NAME":"Fumaroles on Gareloi Island" ,"AREA":"Gareloi Island" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.207 ,"LONGITUDE":-168.445 ,"NAME":"Hot Springs Near Geyser Bight" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.892 ,"LONGITUDE":-166.93 ,"NAME":"Makushin Volcano Fumaroles" ,"AREA":"Unalaska" ,"TYPE":"Hotspring" ,"FARENHEIT":310 ,"CELSIUS":154 }
,{"LATITUDE":54.9 ,"LONGITUDE":-162.885 ,"NAME":"Hot Spring on Amagat Island" ,"AREA":"False Pass" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.213 ,"LONGITUDE":-168.463 ,"NAME":"Hot Springs Near Geyser Bight" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":216 ,"CELSIUS":102 }
,{"LATITUDE":53.223 ,"LONGITUDE":-168.477 ,"NAME":"Hot Springs Near Geyser Bight" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":214 ,"CELSIUS":101 }
,{"LATITUDE":53.443 ,"LONGITUDE":-168.092 ,"NAME":"Thermal Springs In Okmok Caldera" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":212 ,"CELSIUS":100 }
,{"LATITUDE":52.042 ,"LONGITUDE":-176.108 ,"NAME":"Hot Springs on Great Sitkin Island" ,"AREA":"Adak" ,"TYPE":"Hotspring" ,"FARENHEIT":210 ,"CELSIUS":99 }
,{"LATITUDE":55.983 ,"LONGITUDE":-131.661 ,"NAME":"Bailey Hot Spring" ,"AREA":"Ketchikan" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":53.242 ,"LONGITUDE":-168.365 ,"NAME":"Hot Springs Near Hot Springs Cove" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":192 ,"CELSIUS":89 }
,{"LATITUDE":54.157 ,"LONGITUDE":-165.85 ,"NAME":"Hot Springs Near Hot Springs Bay" ,"AREA":"Unimak" ,"TYPE":"Hotspring" ,"FARENHEIT":181 ,"CELSIUS":83 }
,{"LATITUDE":58.033 ,"LONGITUDE":-136.017 ,"NAME":"Hot Springs North End Tenakee Inle" ,"AREA":"Mt. Fairweathe" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":65.093 ,"LONGITUDE":-164.922 ,"NAME":"Pilgrim Springs" ,"AREA":"Bendeleben" ,"TYPE":"Hotspring" ,"FARENHEIT":178 ,"CELSIUS":81 }
,{"LATITUDE":57.831 ,"LONGITUDE":-156.513 ,"NAME":"W Ukinek Spring" ,"AREA":"Ugashik" ,"TYPE":"Hotspring" ,"FARENHEIT":178 ,"CELSIUS":81 }
,{"LATITUDE":65.459 ,"LONGITUDE":-153.312 ,"NAME":"Little Melozitna Hot Springs" ,"AREA":"Melozitna" ,"TYPE":"Hotspring" ,"FARENHEIT":176 ,"CELSIUS":80 }
,{"LATITUDE":51.81 ,"LONGITUDE":-177.79 ,"NAME":"Hot Spring on Tanaga Island" ,"AREA":"Adak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":65.233 ,"LONGITUDE":-144.483 ,"NAME":"Hot Springs on Big Windy Creek" ,"AREA":"Circle" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":55.334 ,"LONGITUDE":-162.137 ,"NAME":"Hot Spring at West End Emmons Lake" ,"AREA":"Cold Bay" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":66.197 ,"LONGITUDE":-154.006 ,"NAME":"Tunalkten Lake Hot Spring" ,"AREA":"Hughes" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":67.403 ,"LONGITUDE":-153.883 ,"NAME":"Hot Spring Near Arrigetch Peaks" ,"AREA":"Survey Pass" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":65.047 ,"LONGITUDE":-142.848 ,"NAME":"Hot Spring on Flat Creek" ,"AREA":"Charley River" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":63.683 ,"LONGITUDE":-151.233 ,"NAME":"Hot Springs Near Glacier" ,"AREA":"Mt. Mckinley" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":63.883 ,"LONGITUDE":-150.717 ,"NAME":"Hot Springs East of Diamond" ,"AREA":"Mt. Mckinley" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":62.45 ,"LONGITUDE":-157.933 ,"NAME":"Hot Spring Near Flat" ,"AREA":"Iditarod" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":60.837 ,"LONGITUDE":-142.42 ,"NAME":"Hot Spring on Twelvemile Creek" ,"AREA":"Bering Glacier" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":56.58 ,"LONGITUDE":-132.18 ,"NAME":"South Stikine Spring" ,"AREA":"Petersburg" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":52.87 ,"LONGITUDE":-173.13 ,"NAME":"Hot Spring on Attu Island" ,"AREA":"Attu" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":65.908 ,"LONGITUDE":-154.993 ,"NAME":"Deniktow Ridge Hot Springs" ,"AREA":"Melozitna" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":53.95 ,"LONGITUDE":-168.037 ,"NAME":"Hot Springs on Bogoslof Island" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":65.45 ,"LONGITUDE":-150 ,"NAME":"Hot Spring Near Little Minook Cr" ,"AREA":"Tanana" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":51.967 ,"LONGITUDE":-178.444 ,"NAME":"Fumaroles on Little Sitkin Island" ,"AREA":"Rat Islands" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":64.002 ,"LONGITUDE":-156.3 ,"NAME":"Hot Spring on Tributary of Innoko" ,"AREA":"Nulato" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":61.058 ,"LONGITUDE":-160.692 ,"NAME":"Hot Spring Near Tuluksak River" ,"AREA":"Russian Missio" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":61.363 ,"LONGITUDE":-157.733 ,"NAME":"Hot Springs on Upper Chuilnuk Rive" ,"AREA":"Sleetmute" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":61.267 ,"LONGITUDE":-151.238 ,"NAME":"Hot Lake In Bottom of Crater Peak" ,"AREA":"Tyonek" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":58.24 ,"LONGITUDE":-155.09 ,"NAME":"Hot Spring Near Katmai Pass" ,"AREA":"Mt. Katmai" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":58.27 ,"LONGITUDE":-154.89 ,"NAME":"Hot Springs Near Mt Katmai" ,"AREA":"Mt. Katmai" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":58.92 ,"LONGITUDE":-153.98 ,"NAME":"Hot Spring West of Cape Douglas" ,"AREA":"Afognak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":55.368 ,"LONGITUDE":-161.961 ,"NAME":"Fumarole" ,"AREA":"Port Moller" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":54.18 ,"LONGITUDE":-165.41 ,"NAME":"Hot Springs on Akun Island" ,"AREA":"Unimak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":54.23 ,"LONGITUDE":-165.66 ,"NAME":"Hot Springs on Akun Island" ,"AREA":"Unimak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":54.66 ,"LONGITUDE":-164.55 ,"NAME":"Hot Spring on Unimak Island" ,"AREA":"Unimak" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":65.97 ,"LONGITUDE":-154.033 ,"NAME":"Pocahontas Hot Springs" ,"AREA":"Melozitna" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":65.216 ,"LONGITUDE":-149.993 ,"NAME":"Hutlinana Hot Springs" ,"AREA":"Livengood" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":57.085 ,"LONGITUDE":-134.839 ,"NAME":"Baranof Warm Springs" ,"AREA":"Sitka" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":67.283 ,"LONGITUDE":-155.067 ,"NAME":"Reed River Hot Spring" ,"AREA":"Survey Pass" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":66.15 ,"LONGITUDE":-157.117 ,"NAME":"Hot Springs Near South Bm" ,"AREA":"Shungnak" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":66.233 ,"LONGITUDE":-157.583 ,"NAME":"Hot Springs on Hawk River" ,"AREA":"Shungnak" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":65.81 ,"LONGITUDE":-151.237 ,"NAME":"Kilo Hot Spring" ,"AREA":"Tanana" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":56.717 ,"LONGITUDE":-132.005 ,"NAME":"Chief Shakes Hot Springs" ,"AREA":"Petersburg" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":69.33 ,"LONGITUDE":-144.044 ,"NAME":"Okpilak Springs" ,"AREA":"Mt. Michelson" ,"TYPE":"Hotspring" ,"FARENHEIT":119 ,"CELSIUS":49 }
,{"LATITUDE":65.367 ,"LONGITUDE":-161.25 ,"NAME":"Granite Mountain Hot Springs" ,"AREA":"Candle" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":57.644 ,"LONGITUDE":-135.333 ,"NAME":"Nylen Hot Springs" ,"AREA":"Sitka" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":65.963 ,"LONGITUDE":-150.919 ,"NAME":"Ray River Hot Spring" ,"AREA":"Tanana" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":64.924 ,"LONGITUDE":-154.837 ,"NAME":"Horner Hot Springs" ,"AREA":"Ruby" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":65.267 ,"LONGITUDE":-155.28 ,"NAME":"Hot Springs Near Dulbi River" ,"AREA":"Melozitna" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":57.807 ,"LONGITUDE":-136.341 ,"NAME":"White Sulphur Springs (Hooniah H S" ,"AREA":"Sitka" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":57.781 ,"LONGITUDE":-135.217 ,"NAME":"Tenakee Hot Springs" ,"AREA":"Sitka" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":52.19 ,"LONGITUDE":-174.25 ,"NAME":"Hot Springs on Atka Island" ,"AREA":"Atka" ,"TYPE":"Hotspring" ,"FARENHEIT":167 ,"CELSIUS":75 }
,{"LATITUDE":55.334 ,"LONGITUDE":-133.641 ,"NAME":"Dalton (Craig) Hot Springs" ,"AREA":"Craig" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":51.944 ,"LONGITUDE":-178.547 ,"NAME":"Fumaroles on Little Sitkin Island" ,"AREA":"Rat Islands" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":57.771 ,"LONGITUDE":-135.82 ,"NAME":"Hot Spring North Arm Peril Strait" ,"AREA":"Sitka" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":53.848 ,"LONGITUDE":-166.873 ,"NAME":"Hot Springs Near Makushin Volcano" ,"AREA":"Unalaska" ,"TYPE":"Hotspring" ,"FARENHEIT":94 ,"CELSIUS":34 }
,{"LATITUDE":69.627 ,"LONGITUDE":-146.027 ,"NAME":"Red Hill Spring" ,"AREA":"Mt. Michelson" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":62.081 ,"LONGITUDE":-145.007 ,"NAME":"Upper Klawasi Warm Springs" ,"AREA":"Gulkana" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":62.058 ,"LONGITUDE":-145.222 ,"NAME":"Mineral Spring (Lower Klawasi Cone" ,"AREA":"Gulkana" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":56.68 ,"LONGITUDE":-131.882 ,"NAME":"Barnes Lake Hot Springs" ,"AREA":"Bradfield Cana" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":56.928 ,"LONGITUDE":-158.12 ,"NAME":"Surprise Lake Hot Spring" ,"AREA":"Chignik" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":56.667 ,"LONGITUDE":-132.28 ,"NAME":"Twin Lakes Hot Springs" ,"AREA":"Petersburg" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":66.383 ,"LONGITUDE":-157.517 ,"NAME":"Warm Spring Near Purcell Mountain" ,"AREA":"Shungnak" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":57.348 ,"LONGITUDE":-135.385 ,"NAME":"Hot Spring Near Fish Bay" ,"AREA":"Sitka" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":65.983 ,"LONGITUDE":-150.56 ,"NAME":"Hot Springs on Lower Ray River" ,"AREA":"Tanana" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":55.863 ,"LONGITUDE":-160.493 ,"NAME":"Hot Spring Near Port Moller" ,"AREA":"Port Moller" ,"TYPE":"Hotspring" ,"FARENHEIT":160 ,"CELSIUS":71 }
,{"LATITUDE":53.253 ,"LONGITUDE":-168.358 ,"NAME":"Hot Springs Near Hot Springs Cove" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":51.97 ,"LONGITUDE":-176.61 ,"NAME":"Hot Springs on Adak Island" ,"AREA":"Adak" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":65.053 ,"LONGITUDE":-146.057 ,"NAME":"Chena Hot Springs" ,"AREA":"Circle" ,"TYPE":"Hotspring" ,"FARENHEIT":153 ,"CELSIUS":67 }
,{"LATITUDE":58.37 ,"LONGITUDE":-137.09 ,"NAME":"Hot Springs Near Icy Point" ,"AREA":"Mt. Fairweathe" ,"TYPE":"Hotspring" ,"FARENHEIT":153 ,"CELSIUS":67 }
,{"LATITUDE":56.836 ,"LONGITUDE":-135.374 ,"NAME":"Goddard Hot Springs" ,"AREA":"Port Alexander" ,"TYPE":"Hotspring" ,"FARENHEIT":153 ,"CELSIUS":67 }
,{"LATITUDE":66.342 ,"LONGITUDE":-150.85 ,"NAME":"Kanuti Hot Springs" ,"AREA":"Bettles" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":64.85 ,"LONGITUDE":-162.3 ,"NAME":"Clear Creek Hot Springs" ,"AREA":"Solomon" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":53.233 ,"LONGITUDE":-168.3 ,"NAME":"Hot Spring on Umnak Island" ,"AREA":"Umnak" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":61.2 ,"LONGITUDE":-159.863 ,"NAME":"Hot Springs Near Ophir Creek" ,"AREA":"Russian Missio" ,"TYPE":"Hotspring" ,"FARENHEIT":145 ,"CELSIUS":63 }
,{"LATITUDE":57.865 ,"LONGITUDE":-156.499 ,"NAME":"Gas Rocks Hot Spring" ,"AREA":"Ugashik" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":51.762 ,"LONGITUDE":-178.77 ,"NAME":"Fumaroles on Gareloi Island" ,"AREA":"Gareloi Island" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":66.367 ,"LONGITUDE":-156.767 ,"NAME":"Hot Springs Near Division Bm" ,"AREA":"Shungnak" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":64.7 ,"LONGITUDE":-162.467 ,"NAME":"Hot Spring Near Kwiniuk River" ,"AREA":"Solomon" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":65.274 ,"LONGITUDE":-148.847 ,"NAME":"Tolovana Hot Springs" ,"AREA":"Livengood" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":55.933 ,"LONGITUDE":-131.559 ,"NAME":"Bell Island Hot Springs" ,"AREA":"Ketchikan" ,"TYPE":"Hotspring" ,"FARENHEIT":165 ,"CELSIUS":74 }
,{"LATITUDE":57.178 ,"LONGITUDE":-157.015 ,"NAME":"Hot Spring Near Mother Goose Lake" ,"AREA":"Ugashik" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":65.483 ,"LONGITUDE":-144.637 ,"NAME":"Circle Hot Springs" ,"AREA":"Circle" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":56.233 ,"LONGITUDE":-131.267 ,"NAME":"Bradfield Canal Hot Springs" ,"AREA":"Bradfield Cana" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":65.006 ,"LONGITUDE":-150.633 ,"NAME":"Manley Hot Springs" ,"AREA":"Tanana" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":65.129 ,"LONGITUDE":-154.692 ,"NAME":"Melozi (Melozitna) Springs" ,"AREA":"Melozitna" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":66.217 ,"LONGITUDE":-149.547 ,"NAME":"Dall Hot Springs" ,"AREA":"Beaver" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":55.217 ,"LONGITUDE":-162.483 ,"NAME":"Hot Springs East of Cold Bay" ,"AREA":"Cold Bay" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":65.217 ,"LONGITUDE":-162.9 ,"NAME":"Hot Springs Near Lava Creek" ,"AREA":"Bendeleben" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":54.944 ,"LONGITUDE":-163.251 ,"NAME":"Hot Springs Near Morzhovoi" ,"AREA":"False Pass" ,"TYPE":"Hotspring" ,"FARENHEIT":145 ,"CELSIUS":63 }
,{"LATITUDE":36.48 ,"LONGITUDE":-91.053 ,"NAME":"Warm Springs" ,"AREA":"Poplar Bluff" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":34.384 ,"LONGITUDE":-93.607 ,"NAME":"Caddo Gap Springs" ,"AREA":"Little Rock" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":34.321 ,"LONGITUDE":-93.739 ,"NAME":"Spring on Redland Mountain" ,"AREA":"Little Rock" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":34.406 ,"LONGITUDE":-93.908 ,"NAME":"Spring on Little Missouri River" ,"AREA":"Little Rock" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":23 }
,{"LATITUDE":34.542 ,"LONGITUDE":-93.024 ,"NAME":"Big Chalybeate Spring" ,"AREA":"Little Rock" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":34.513 ,"LONGITUDE":-93.053 ,"NAME":"Hot Springs" ,"AREA":"Little Rock" ,"TYPE":"Hotspring" ,"FARENHEIT":147 ,"CELSIUS":64 }
,{"LATITUDE":33.008 ,"LONGITUDE":-109.778 ,"NAME":"Grapevine Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":32.984 ,"LONGITUDE":-113.324 ,"NAME":"Agua Caliente Springs" ,"AREA":"Ajo" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":34.563 ,"LONGITUDE":-113.497 ,"NAME":"Kaiser Hot Spring" ,"AREA":"Prescott" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":34.076 ,"LONGITUDE":-111.708 ,"NAME":"Spring (Hot)" ,"AREA":"Holbrook" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":33.17 ,"LONGITUDE":-110.528 ,"NAME":"Coolidge Dam Warm Spring" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":34.695 ,"LONGITUDE":-113.572 ,"NAME":"Cofer Hot Spring" ,"AREA":"Prescott" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":33.209 ,"LONGITUDE":-110.818 ,"NAME":"Pioneer Spring" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":33.988 ,"LONGITUDE":-112.362 ,"NAME":"Castle Hot Springs" ,"AREA":"Phoenix" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":32.345 ,"LONGITUDE":-110.247 ,"NAME":"Warm Springs" ,"AREA":"Tucson" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":36.196 ,"LONGITUDE":-113.081 ,"NAME":"Lava Warm Springs" ,"AREA":"Grand Canyon" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":33.068 ,"LONGITUDE":-109.975 ,"NAME":"Warm Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":31.943 ,"LONGITUDE":-113.013 ,"NAME":"Quitobaquito Springs" ,"AREA":"Lukeville" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":31.695 ,"LONGITUDE":-110.963 ,"NAME":"Agua Caliente Spring" ,"AREA":"Nogales" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":33.075 ,"LONGITUDE":-109.298 ,"NAME":"Seep" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":34.357 ,"LONGITUDE":-111.71 ,"NAME":"Verde Hot Springs" ,"AREA":"Holbrook" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":32.998 ,"LONGITUDE":-109.901 ,"NAME":"Indian Hot Springs" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":33.669 ,"LONGITUDE":-111.165 ,"NAME":"Roosevelt Dam Springs" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":32.336 ,"LONGITUDE":-110.24 ,"NAME":"Hookers Hot Springs" ,"AREA":"Tucson" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":33.4 ,"LONGITUDE":-109.152 ,"NAME":"Hannah Hot Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":33.08 ,"LONGITUDE":-109.303 ,"NAME":"Hot Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":32.741 ,"LONGITUDE":-114.068 ,"NAME":"Radium Hot Springs" ,"AREA":"El Centro" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":32.971 ,"LONGITUDE":-109.35 ,"NAME":"Gillard Hot Springs" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":35.984 ,"LONGITUDE":-114.742 ,"NAME":"Hot Spring" ,"AREA":"Kingman" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":33.78 ,"LONGITUDE":-110.317 ,"NAME":"Warm Spring" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":36.418 ,"LONGITUDE":-113.956 ,"NAME":"Pakoon Springs" ,"AREA":"Grand Canyon" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":33.493 ,"LONGITUDE":-112.94 ,"NAME":"El Dorado Hot Springs" ,"AREA":"Phoenix South" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":44 }
,{"LATITUDE":34.896 ,"LONGITUDE":-114.308 ,"NAME":"Oatman Warm Springs" ,"AREA":"Needles" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":33.055 ,"LONGITUDE":-109.295 ,"NAME":"Clifton Hot Springs" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":34.445 ,"LONGITUDE":-112.693 ,"NAME":"Spring" ,"AREA":"Prescott" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":32.337 ,"LONGITUDE":-110.708 ,"NAME":"Mercer Spring" ,"AREA":"Tucson" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":34.649 ,"LONGITUDE":-111.744 ,"NAME":"Soda Spring" ,"AREA":"Holbrook" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":33.253 ,"LONGITUDE":-110.703 ,"NAME":"Spring" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":31.362 ,"LONGITUDE":-109.265 ,"NAME":"Astin Spring" ,"AREA":"Douglas" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":35.169 ,"LONGITUDE":-113.851 ,"NAME":"Frost Mine Spring" ,"AREA":"Williams" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":31.673 ,"LONGITUDE":-109.902 ,"NAME":"Antelope Spring" ,"AREA":"Douglas" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":35.213 ,"LONGITUDE":-113.425 ,"NAME":"Casa Grande Spring" ,"AREA":"Williams" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":33.51 ,"LONGITUDE":-110.403 ,"NAME":"Cassadore Spring" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":34.32 ,"LONGITUDE":-111.453 ,"NAME":"Tonto Natural Bridge Spring" ,"AREA":"Holbrook" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":34.405 ,"LONGITUDE":-111.602 ,"NAME":"Spring" ,"AREA":"Holbrook" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":34.436 ,"LONGITUDE":-109.402 ,"NAME":"Salado Springs" ,"AREA":"Saint Johns" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":31.592 ,"LONGITUDE":-109.51 ,"NAME":"Lewis Spring" ,"AREA":"Douglas" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":33.046 ,"LONGITUDE":-109.44 ,"NAME":"Eagle Creek Hot Springs" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":36.509 ,"LONGITUDE":-111.852 ,"NAME":"Colorado Pool" ,"AREA":"Marble Canyon" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":33.062 ,"LONGITUDE":-109.482 ,"NAME":"Warm Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":31.637 ,"LONGITUDE":-110.703 ,"NAME":"Monkey Spring" ,"AREA":"Nogales" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":32.281 ,"LONGITUDE":-110.73 ,"NAME":"Agua Caliente" ,"AREA":"Tucson" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":32.327 ,"LONGITUDE":-110.228 ,"NAME":"N-O Spring" ,"AREA":"Tucson" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":32.983 ,"LONGITUDE":-110.373 ,"NAME":"Warm Spring" ,"AREA":"Tucson" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":33.152 ,"LONGITUDE":-110.639 ,"NAME":"Mescal Warm Spring" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":33.163 ,"LONGITUDE":-110.662 ,"NAME":"Spring" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":35.077 ,"LONGITUDE":-113.267 ,"NAME":"Trout Creek Spring" ,"AREA":"Williams" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":33.438 ,"LONGITUDE":-110.213 ,"NAME":"Warm Springs" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":36.895 ,"LONGITUDE":-113.913 ,"NAME":"Springs" ,"AREA":"Grand Canyon" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":35.96 ,"LONGITUDE":-114.725 ,"NAME":"Hot Spring" ,"AREA":"Kingman" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":34.925 ,"LONGITUDE":-114.221 ,"NAME":"Caliche Spring" ,"AREA":"Needles" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":33.915 ,"LONGITUDE":-112.332 ,"NAME":"Mitchell Spring" ,"AREA":"Phoenix" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":33.831 ,"LONGITUDE":-110.574 ,"NAME":"Salt Banks" ,"AREA":"Mesa" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":34.91 ,"LONGITUDE":-113.608 ,"NAME":"Tom Brown Warm Spring" ,"AREA":"Prescott" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":38.873 ,"LONGITUDE":-122.689 ,"NAME":"Seigler Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":36.814 ,"LONGITUDE":-117.763 ,"NAME":"Palm Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":34.498 ,"LONGITUDE":-119.341 ,"NAME":"Stingleys Hot Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":123 ,"CELSIUS":51 }
,{"LATITUDE":33.67 ,"LONGITUDE":-117.325 ,"NAME":"Wrenden Hot Sprs, Elsinore Hot Spr" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":125 ,"CELSIUS":52 }
,{"LATITUDE":37.253 ,"LONGITUDE":-118.373 ,"NAME":"Keough Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":36.229 ,"LONGITUDE":-118.302 ,"NAME":"Jordan Hot Springs" ,"AREA":"Fresno" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":34.502 ,"LONGITUDE":-119.346 ,"NAME":"Vickers Hot Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":36.123 ,"LONGITUDE":-121.64 ,"NAME":"Slates Hot Springs" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":35.881 ,"LONGITUDE":-118.67 ,"NAME":"California Hot Springs" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":38.788 ,"LONGITUDE":-122.777 ,"NAME":"Sulphur Creek" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":37.648 ,"LONGITUDE":-118.806 ,"NAME":"Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":36.703 ,"LONGITUDE":-120.86 ,"NAME":"Mercey Hot Springs" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":119 ,"CELSIUS":48 }
,{"LATITUDE":33.589 ,"LONGITUDE":-117.511 ,"NAME":"San Juan Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":38.785 ,"LONGITUDE":-122.655 ,"NAME":"Harbin Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":37.677 ,"LONGITUDE":-118.79 ,"NAME":"Dehy Hot Spring" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":134 ,"CELSIUS":57 }
,{"LATITUDE":39.183 ,"LONGITUDE":-122.7 ,"NAME":"Bartlett Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":36.234 ,"LONGITUDE":-121.546 ,"NAME":"Tassajara Hot Springs" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":36.144 ,"LONGITUDE":-120.555 ,"NAME":"Coalinga Mineral Springs" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":44 }
,{"LATITUDE":39.033 ,"LONGITUDE":-122.445 ,"NAME":"Jones Fountain of Life Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":35.575 ,"LONGITUDE":-118.534 ,"NAME":"Miracle Hot Sprs, Hobo Hot Sprs" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":119 ,"CELSIUS":48 }
,{"LATITUDE":33.284 ,"LONGITUDE":-116.631 ,"NAME":"Warner Hot Spring" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":38.237 ,"LONGITUDE":-119.326 ,"NAME":"Buckeye Hot Spring" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":41.266 ,"LONGITUDE":-120.08 ,"NAME":"Hot Springs (Menlo Baths)" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":33.753 ,"LONGITUDE":-117.495 ,"NAME":"Glen Ivy Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":37.802 ,"LONGITUDE":-118.532 ,"NAME":"Benton Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":134 ,"CELSIUS":57 }
,{"LATITUDE":38.691 ,"LONGITUDE":-123.024 ,"NAME":"Skaggs Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":56 }
,{"LATITUDE":35.62 ,"LONGITUDE":-118.473 ,"NAME":"Scovern Hot Springs" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":34.538 ,"LONGITUDE":-119.56 ,"NAME":"Agua Caliente Spring" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":33.558 ,"LONGITUDE":-117.154 ,"NAME":"Murrietta Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":132 ,"CELSIUS":56 }
,{"LATITUDE":39.226 ,"LONGITUDE":-120.01 ,"NAME":"Brockway Hot Springs" ,"AREA":"Chico" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":41.036 ,"LONGITUDE":-121.926 ,"NAME":"Hunt Hot Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":34.582 ,"LONGITUDE":-119.044 ,"NAME":"Willett Hot Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":37.234 ,"LONGITUDE":-118.881 ,"NAME":"Blaney Meadows Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":36.477 ,"LONGITUDE":-118.404 ,"NAME":"Kern Hot Spring" ,"AREA":"Fresno" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":36.806 ,"LONGITUDE":-117.771 ,"NAME":"Lower Warm Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":110 ,"CELSIUS":43 }
,{"LATITUDE":34.482 ,"LONGITUDE":-119.302 ,"NAME":"Matilija Hot Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":34.537 ,"LONGITUDE":-119.879 ,"NAME":"San Marcos Hot Spring" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":110 ,"CELSIUS":43 }
,{"LATITUDE":33.896 ,"LONGITUDE":-117.057 ,"NAME":"Eden Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":39.573 ,"LONGITUDE":-120.348 ,"NAME":"Campbell Hot Springs" ,"AREA":"Chico" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":38.994 ,"LONGITUDE":-122.742 ,"NAME":"Horseshoe Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":33.969 ,"LONGITUDE":-116.942 ,"NAME":"Highland Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":44 }
,{"LATITUDE":34.34 ,"LONGITUDE":-117.173 ,"NAME":"Warm Spring, Hot Spring" ,"AREA":"San Bernardino" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":41.219 ,"LONGITUDE":-120.066 ,"NAME":"Squaw Baths" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":40.142 ,"LONGITUDE":-120.935 ,"NAME":"Indian Valley Hot Springs" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":39.292 ,"LONGITUDE":-122.821 ,"NAME":"Crabtree Hot Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":37.108 ,"LONGITUDE":-121.478 ,"NAME":"Gilroy Hot Springs" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":39.227 ,"LONGITUDE":-123.362 ,"NAME":"Orrs Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":38.773 ,"LONGITUDE":-122.705 ,"NAME":"Anderson Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":38.858 ,"LONGITUDE":-122.671 ,"NAME":"Howard Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":34.461 ,"LONGITUDE":-119.637 ,"NAME":"Montecito Hot Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":33.551 ,"LONGITUDE":-117.167 ,"NAME":"Temecula Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":116 ,"CELSIUS":47 }
,{"LATITUDE":33.835 ,"LONGITUDE":-116.988 ,"NAME":"Gilman Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":37.618 ,"LONGITUDE":-119.074 ,"NAME":"Reds Meadow Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":35.528 ,"LONGITUDE":-118.665 ,"NAME":"Democrat Hot Springs" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":33.731 ,"LONGITUDE":-118.348 ,"NAME":"Whites Point Hot Springs" ,"AREA":"Long Beach" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":37.532 ,"LONGITUDE":-119.025 ,"NAME":"Fish Creek Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":110 ,"CELSIUS":43 }
,{"LATITUDE":39.032 ,"LONGITUDE":-122.432 ,"NAME":"Blank Spring, Manzanita Mine Sprs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":45 }
,{"LATITUDE":37.327 ,"LONGITUDE":-119.018 ,"NAME":"Mono Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":38.225 ,"LONGITUDE":-119.217 ,"NAME":"The Hot Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":35.727 ,"LONGITUDE":-118.408 ,"NAME":"Hot Spring" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":41.6 ,"LONGITUDE":-120.088 ,"NAME":"Leonards Hot Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":38.874 ,"LONGITUDE":-123.518 ,"NAME":"Point Arena Hot Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":41.126 ,"LONGITUDE":-121.028 ,"NAME":"Kellog Hot Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":172 ,"CELSIUS":78 }
,{"LATITUDE":35.558 ,"LONGITUDE":-118.612 ,"NAME":"Delonegha Hot Springs" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":44 }
,{"LATITUDE":35.871 ,"LONGITUDE":-116.23 ,"NAME":"Tecopa Hot Springs" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":41.86 ,"LONGITUDE":-120.158 ,"NAME":"Fort Bidwell Hot Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":41.534 ,"LONGITUDE":-120.078 ,"NAME":"Hot Springs (Surprise Valley)" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":208 ,"CELSIUS":98 }
,{"LATITUDE":33.345 ,"LONGITUDE":-115.588 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.012 ,"LONGITUDE":-121.274 ,"NAME":"Hot Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.922 ,"LONGITUDE":-120.024 ,"NAME":"Zamboni Hot Springs" ,"AREA":"Chico" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":38.979 ,"LONGITUDE":-122.659 ,"NAME":"Fumarole" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":37.622 ,"LONGITUDE":-119.028 ,"NAME":"Fumaroles" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.364 ,"LONGITUDE":-120.243 ,"NAME":"Hot Spring" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":204 ,"CELSIUS":96 }
,{"LATITUDE":38.767 ,"LONGITUDE":-122.748 ,"NAME":"Little Geysers" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":210 ,"CELSIUS":99 }
,{"LATITUDE":33.328 ,"LONGITUDE":-115.583 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.67 ,"LONGITUDE":-120.206 ,"NAME":"Lake City Hot Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":207 ,"CELSIUS":97 }
,{"LATITUDE":36.036 ,"LONGITUDE":-117.802 ,"NAME":"Devils Kitchen" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":207 ,"CELSIUS":97 }
,{"LATITUDE":36.045 ,"LONGITUDE":-117.769 ,"NAME":"Coso Hot Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":207 ,"CELSIUS":97 }
,{"LATITUDE":40.382 ,"LONGITUDE":-121.513 ,"NAME":"Morgan Hot Spring" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":40.421 ,"LONGITUDE":-121.375 ,"NAME":"Terminal Geyser" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":41.19 ,"LONGITUDE":-120.383 ,"NAME":"West Valley Reservoir Hot Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":171 ,"CELSIUS":77 }
,{"LATITUDE":38.802 ,"LONGITUDE":-122.81 ,"NAME":"The Geysers" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":214 ,"CELSIUS":101 }
,{"LATITUDE":35.888 ,"LONGITUDE":-116.258 ,"NAME":"Springs" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":34.185 ,"LONGITUDE":-117.262 ,"NAME":"Arrowhead Springs, Waterman Hot Sp" ,"AREA":"San Bernardino" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":90 }
,{"LATITUDE":33.823 ,"LONGITUDE":-116.542 ,"NAME":"Palm Springs (Agua Caliente Spring" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":41.196 ,"LONGITUDE":-120.475 ,"NAME":"Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.959 ,"LONGITUDE":-120.936 ,"NAME":"Warm Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":37.929 ,"LONGITUDE":-121.965 ,"NAME":"Springs" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":36.83 ,"LONGITUDE":-117.736 ,"NAME":"Upper Warm Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":33.343 ,"LONGITUDE":-115.573 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":35.536 ,"LONGITUDE":-118.651 ,"NAME":"Spring (Hot)" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":33.332 ,"LONGITUDE":-115.575 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":35.967 ,"LONGITUDE":-116.931 ,"NAME":"Warm Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":33.28 ,"LONGITUDE":-115.592 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":33.288 ,"LONGITUDE":-115.575 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":33.312 ,"LONGITUDE":-115.577 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":33.313 ,"LONGITUDE":-115.605 ,"NAME":"Mud Volcanoes" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.393 ,"LONGITUDE":-121.507 ,"NAME":"Growler Hot Spring" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":35.148 ,"LONGITUDE":-118.783 ,"NAME":"Warm Spring" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.973 ,"LONGITUDE":-122.202 ,"NAME":"Klamath Hot Spring" ,"AREA":"Weed" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":41.143 ,"LONGITUDE":-121.11 ,"NAME":"Bassett Hot Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":174 ,"CELSIUS":79 }
,{"LATITUDE":38.58 ,"LONGITUDE":-122.575 ,"NAME":"Calistoga Hot Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":172 ,"CELSIUS":78 }
,{"LATITUDE":37.656 ,"LONGITUDE":-118.834 ,"NAME":"Hot Creek Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":171 ,"CELSIUS":77 }
,{"LATITUDE":41.229 ,"LONGITUDE":-121.405 ,"NAME":"Little Hot Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":169 ,"CELSIUS":76 }
,{"LATITUDE":37.664 ,"LONGITUDE":-118.802 ,"NAME":"The Tub" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":167 ,"CELSIUS":75 }
,{"LATITUDE":40.355 ,"LONGITUDE":-120.257 ,"NAME":"Wendel Hot Springs" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":38.768 ,"LONGITUDE":-122.717 ,"NAME":"Castle Rock Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":38.245 ,"LONGITUDE":-119.205 ,"NAME":"Travertine Hot Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":39.002 ,"LONGITUDE":-122.664 ,"NAME":"Sulphur Bank" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":39.057 ,"LONGITUDE":-122.475 ,"NAME":"Elgin Mine" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":39.039 ,"LONGITUDE":-122.421 ,"NAME":"Wilbur Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":153 ,"CELSIUS":67 }
,{"LATITUDE":40.444 ,"LONGITUDE":-121.409 ,"NAME":"Drakesbad" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":40.457 ,"LONGITUDE":-121.545 ,"NAME":"Mill Creek Springs" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":150 ,"CELSIUS":66 }
,{"LATITUDE":38.048 ,"LONGITUDE":-119.081 ,"NAME":"Hot Spring" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":37.647 ,"LONGITUDE":-118.859 ,"NAME":"Casa Diablo Hot Pool" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":165 ,"CELSIUS":74 }
,{"LATITUDE":41.607 ,"LONGITUDE":-121.523 ,"NAME":"Hot Spot" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":191 ,"CELSIUS":88 }
,{"LATITUDE":40.44 ,"LONGITUDE":-121.434 ,"NAME":"Devils Kitchen" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":40.302 ,"LONGITUDE":-120.195 ,"NAME":"Amedee Hot Springs" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":36.031 ,"LONGITUDE":-117.833 ,"NAME":"Fumarole" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":40.447 ,"LONGITUDE":-121.536 ,"NAME":"Sulphur Works, Tophet Hot Springs" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":40.455 ,"LONGITUDE":-121.501 ,"NAME":"Bumpass Hell" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":37.648 ,"LONGITUDE":-118.914 ,"NAME":"Casa Diablo Hot Springs And Geyser" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":37.692 ,"LONGITUDE":-118.839 ,"NAME":"Little Hot Creek Spring" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":34.596 ,"LONGITUDE":-118.998 ,"NAME":"Sespe Hot Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":90 }
,{"LATITUDE":38.348 ,"LONGITUDE":-119.4 ,"NAME":"Fales Hot Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":40.434 ,"LONGITUDE":-121.399 ,"NAME":"Boiling Springs Lake" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":41.615 ,"LONGITUDE":-120.102 ,"NAME":"Seyferth Hot Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":41.407 ,"LONGITUDE":-122.197 ,"NAME":"Hot Spring, Fumaroles" ,"AREA":"Weed" ,"TYPE":"Hotspring" ,"FARENHEIT":183 ,"CELSIUS":84 }
,{"LATITUDE":37.993 ,"LONGITUDE":-119.028 ,"NAME":"Paoha Island Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":181 ,"CELSIUS":83 }
,{"LATITUDE":41.025 ,"LONGITUDE":-121.924 ,"NAME":"Big Bend Hot Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":38.699 ,"LONGITUDE":-119.846 ,"NAME":"Grovers Hot Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":147 ,"CELSIUS":64 }
,{"LATITUDE":37.665 ,"LONGITUDE":-118.828 ,"NAME":"Hot Creek Gorge Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":39.43 ,"LONGITUDE":-122.538 ,"NAME":"Sulphur Spring, Salt Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":38.925 ,"LONGITUDE":-122.77 ,"NAME":"Hildebrande Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":38.203 ,"LONGITUDE":-119.118 ,"NAME":"Warm Spring" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":36.938 ,"LONGITUDE":-121.565 ,"NAME":"Sargent Estate Warm Spring" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":34.826 ,"LONGITUDE":-116.677 ,"NAME":"Newberry Spring" ,"AREA":"San Bernardino" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":41.919 ,"LONGITUDE":-122.369 ,"NAME":"Bogus Soda Springs" ,"AREA":"Weed" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":39.053 ,"LONGITUDE":-122.597 ,"NAME":"Quigley Soda Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":41.252 ,"LONGITUDE":-120.521 ,"NAME":"Warm Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":38.85 ,"LONGITUDE":-122.693 ,"NAME":"Pine Cone Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":38.339 ,"LONGITUDE":-122.259 ,"NAME":"Napa Vichy Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":38.892 ,"LONGITUDE":-122.533 ,"NAME":"Baker Soda Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":38.897 ,"LONGITUDE":-122.882 ,"NAME":"England Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":38.916 ,"LONGITUDE":-122.799 ,"NAME":"Carlsbad Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":38.192 ,"LONGITUDE":-120.827 ,"NAME":"Valley Springs" ,"AREA":"Sacramento" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":38.85 ,"LONGITUDE":-120.025 ,"NAME":"Myers Warm Spring" ,"AREA":"Sacramento" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.708 ,"LONGITUDE":-118.813 ,"NAME":"Hot Spring" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":36.122 ,"LONGITUDE":-117.217 ,"NAME":"Warm Sulphur Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":35.682 ,"LONGITUDE":-116.422 ,"NAME":"Saratoga Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":33.733 ,"LONGITUDE":-114.907 ,"NAME":"Mccoy Spring" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":41.484 ,"LONGITUDE":-120.764 ,"NAME":"Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":39.657 ,"LONGITUDE":-123.585 ,"NAME":"Jackson Valley Mud Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":39.198 ,"LONGITUDE":-122.505 ,"NAME":"Pseudo Complexion Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":38.85 ,"LONGITUDE":-122.667 ,"NAME":"Bad Creek Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":32.97 ,"LONGITUDE":-116.423 ,"NAME":"Vallecitos Spring" ,"AREA":"San Diego" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":36.765 ,"LONGITUDE":-120.901 ,"NAME":"Spring" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":34.159 ,"LONGITUDE":-118.499 ,"NAME":"El Encino Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":35.879 ,"LONGITUDE":-116.153 ,"NAME":"Resting Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":41.828 ,"LONGITUDE":-120.917 ,"NAME":"Pothole Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":39.348 ,"LONGITUDE":-122.668 ,"NAME":"Fouts Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":38.519 ,"LONGITUDE":-122.26 ,"NAME":"Napa Rock Soda Spring, Phillips So" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":38.838 ,"LONGITUDE":-122.653 ,"NAME":"Spiers Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":35.141 ,"LONGITUDE":-116.101 ,"NAME":"Soda Station Springs" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.503 ,"LONGITUDE":-121.904 ,"NAME":"Alameda Warm Springs" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":39.429 ,"LONGITUDE":-123.308 ,"NAME":"Muir Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":37.924 ,"LONGITUDE":-122.046 ,"NAME":"Sulphur Spring" ,"AREA":"San Francisco" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":40.58 ,"LONGITUDE":-120.265 ,"NAME":"Tipton Springs" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":39.697 ,"LONGITUDE":-123.478 ,"NAME":"Pinches Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":38.755 ,"LONGITUDE":-122.285 ,"NAME":"Zim Zim Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":37.083 ,"LONGITUDE":-121.042 ,"NAME":"Spring In Oneill Forebay" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":37.632 ,"LONGITUDE":-121.762 ,"NAME":"Crohare Spring" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":33.625 ,"LONGITUDE":-115.325 ,"NAME":"Corn Spring" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":36.117 ,"LONGITUDE":-118.776 ,"NAME":"Ward Spring" ,"AREA":"Fresno" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":34.423 ,"LONGITUDE":-119.538 ,"NAME":"Boron Spring" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":39.002 ,"LONGITUDE":-122.498 ,"NAME":"Grizzly Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":39.088 ,"LONGITUDE":-122.525 ,"NAME":"Sulphur Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":38.125 ,"LONGITUDE":-122.188 ,"NAME":"Vallejo White Sulphur Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":38.31 ,"LONGITUDE":-122.053 ,"NAME":"Tolenas Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":41.45 ,"LONGITUDE":-120.834 ,"NAME":"Kelly Hot Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":36.512 ,"LONGITUDE":-116.821 ,"NAME":"Nevares Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":37.888 ,"LONGITUDE":-118.487 ,"NAME":"Bertrand Ranch Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":35.483 ,"LONGITUDE":-119.917 ,"NAME":"Mize Spring" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":36.698 ,"LONGITUDE":-117.848 ,"NAME":"Little Hunter Canyon Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":38.995 ,"LONGITUDE":-122.642 ,"NAME":"Davis Soda Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":37.432 ,"LONGITUDE":-121.308 ,"NAME":"Salt Grass Springs" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":37.573 ,"LONGITUDE":-121.445 ,"NAME":"Lone Tree Mineral Spring" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":37.638 ,"LONGITUDE":-118.887 ,"NAME":"Chance Spring" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":36.295 ,"LONGITUDE":-120.985 ,"NAME":"Sulphur Springs" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.16 ,"LONGITUDE":-120.403 ,"NAME":"Warm Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":35.4 ,"LONGITUDE":-120.25 ,"NAME":"Cameta Warm Spring" ,"AREA":"San Luis Obisp" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":37.719 ,"LONGITUDE":-118.735 ,"NAME":"Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":35.588 ,"LONGITUDE":-116.359 ,"NAME":"Sheep Creek Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":40.568 ,"LONGITUDE":-120.325 ,"NAME":"Sellicks Springs" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.833 ,"LONGITUDE":-122.357 ,"NAME":"One Shot Mining Co" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.95 ,"LONGITUDE":-122.572 ,"NAME":"Soda Spring In Cache Formation" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":37.635 ,"LONGITUDE":-118.72 ,"NAME":"Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":36.13 ,"LONGITUDE":-118.816 ,"NAME":"Soda Spring" ,"AREA":"Fresno" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":36.773 ,"LONGITUDE":-120.898 ,"NAME":"Iridat Spring" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":33.545 ,"LONGITUDE":-115.654 ,"NAME":"Canyon Spring" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":36.675 ,"LONGITUDE":-116.923 ,"NAME":"Keane Wonder Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":36.331 ,"LONGITUDE":-121.367 ,"NAME":"Paraiso Springs (Sulphur Spring)" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":98 ,"CELSIUS":37 }
,{"LATITUDE":35.122 ,"LONGITUDE":-120.542 ,"NAME":"Newsom Springs" ,"AREA":"San Luis Obisp" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":34.503 ,"LONGITUDE":-120.219 ,"NAME":"Las Cruces Hot Springs" ,"AREA":"Santa Maria" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":38.49 ,"LONGITUDE":-122.498 ,"NAME":"St Helena White Sulphur Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":35.946 ,"LONGITUDE":-116.189 ,"NAME":"Chappo Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":40.019 ,"LONGITUDE":-121.036 ,"NAME":"Spring" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":40.44 ,"LONGITUDE":-121.42 ,"NAME":"Hot Springs Valley" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":32.947 ,"LONGITUDE":-116.305 ,"NAME":"Agua Caliente Springs" ,"AREA":"San Diego" ,"TYPE":"Hotspring" ,"FARENHEIT":101 ,"CELSIUS":38 }
,{"LATITUDE":39.196 ,"LONGITUDE":-122.714 ,"NAME":"Newman Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":94 ,"CELSIUS":35 }
,{"LATITUDE":37.63 ,"LONGITUDE":-118.808 ,"NAME":"Whitmore Hot Springs" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":35.269 ,"LONGITUDE":-120.851 ,"NAME":"Pecho Warm Springs" ,"AREA":"San Luis Obisp" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":33.514 ,"LONGITUDE":-117.604 ,"NAME":"Spring" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":38.958 ,"LONGITUDE":-122.701 ,"NAME":"Riviera Beach Spring" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":36.33 ,"LONGITUDE":-117.948 ,"NAME":"Dirty Socks Hot Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":37.847 ,"LONGITUDE":-121.635 ,"NAME":"Byron Hot Springs" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":96 ,"CELSIUS":36 }
,{"LATITUDE":35.433 ,"LONGITUDE":-118.478 ,"NAME":"Yates Hot Springs" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":35.663 ,"LONGITUDE":-120.692 ,"NAME":"Paso Robles Artesian Spring" ,"AREA":"San Luis Obisp" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":34.507 ,"LONGITUDE":-119.291 ,"NAME":"Wheeler Springs" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":33.8 ,"LONGITUDE":-116.927 ,"NAME":"Soboda Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":40.223 ,"LONGITUDE":-122.747 ,"NAME":"Stinking Springs" ,"AREA":"Redding" ,"TYPE":"Hotspring" ,"FARENHEIT":101 ,"CELSIUS":38 }
,{"LATITUDE":38.8 ,"LONGITUDE":-123.17 ,"NAME":"Hoods Hot Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":37.029 ,"LONGITUDE":-117.383 ,"NAME":"Grapevine Springs" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":36.084 ,"LONGITUDE":-121.584 ,"NAME":"Dolans Hot Spring" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":98 ,"CELSIUS":37 }
,{"LATITUDE":36.21 ,"LONGITUDE":-118.176 ,"NAME":"Soda Springs" ,"AREA":"Fresno" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":33.664 ,"LONGITUDE":-117.913 ,"NAME":"Fairview Hot Spring" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":96 ,"CELSIUS":36 }
,{"LATITUDE":35.143 ,"LONGITUDE":-116.813 ,"NAME":"Paradise Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":33.837 ,"LONGITUDE":-117.145 ,"NAME":"Lakeview Hot Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":33.201 ,"LONGITUDE":-115.577 ,"NAME":"Mud Pots" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":33.212 ,"LONGITUDE":-115.591 ,"NAME":"Mud Pots" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":33.217 ,"LONGITUDE":-115.58 ,"NAME":"Wister Mud Pot" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":32.617 ,"LONGITUDE":-116.189 ,"NAME":"Jacumba Hot Springs" ,"AREA":"San Diego" ,"TYPE":"Hotspring" ,"FARENHEIT":101 ,"CELSIUS":38 }
,{"LATITUDE":36.618 ,"LONGITUDE":-121.845 ,"NAME":"Sulphur Hot Spring" ,"AREA":"Santa Cruz" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":36.495 ,"LONGITUDE":-117.893 ,"NAME":"Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":38.033 ,"LONGITUDE":-118.902 ,"NAME":"Mono Basin Warm Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":35.908 ,"LONGITUDE":-120.367 ,"NAME":"Table Mountain (Spring)" ,"AREA":"San Luis Obisp" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":34.271 ,"LONGITUDE":-116.838 ,"NAME":"Pan Hot Springs" ,"AREA":"San Bernardino" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":40.238 ,"LONGITUDE":-122.11 ,"NAME":"Tuscan Springs" ,"AREA":"Redding" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":40.245 ,"LONGITUDE":-120.007 ,"NAME":"High Rock Spring" ,"AREA":"Susanville" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":38.55 ,"LONGITUDE":-122.72 ,"NAME":"Mark West Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":43.513 ,"LONGITUDE":-119.903 ,"NAME":"Springs at Tecolote Tunnel" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":39.728 ,"LONGITUDE":-120.547 ,"NAME":"Mclear Warm Springs" ,"AREA":"Chico" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":38.835 ,"LONGITUDE":-122.731 ,"NAME":"Gordon Warm Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":39.166 ,"LONGITUDE":-123.159 ,"NAME":"Vichy Springs" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":85 ,"CELSIUS":29 }
,{"LATITUDE":38.936 ,"LONGITUDE":-122.907 ,"NAME":"Highland Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":37.398 ,"LONGITUDE":-121.794 ,"NAME":"Mineral Springs" ,"AREA":"San Jose" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":33.436 ,"LONGITUDE":-117.324 ,"NAME":"De Luz Warm Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":85 ,"CELSIUS":29 }
,{"LATITUDE":33.512 ,"LONGITUDE":-115.827 ,"NAME":"Dos Palmas Spring" ,"AREA":"Salton Sea" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":39.022 ,"LONGITUDE":-122.444 ,"NAME":"Abbott Mine" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":34.605 ,"LONGITUDE":-118.561 ,"NAME":"Warm Spring" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":41.659 ,"LONGITUDE":-123.319 ,"NAME":"Sulphur Springs" ,"AREA":"Weed" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":38.394 ,"LONGITUDE":-122.552 ,"NAME":"Los Guilicos Warm Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":41.492 ,"LONGITUDE":-120.7 ,"NAME":"Essex Springs" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":38.654 ,"LONGITUDE":-122.484 ,"NAME":"Aetna Springs" ,"AREA":"Santa Rosa" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":35.842 ,"LONGITUDE":-117.38 ,"NAME":"Bainter Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":34.228 ,"LONGITUDE":-117.483 ,"NAME":"Tylers Bath Spring" ,"AREA":"San Bernardino" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":33.363 ,"LONGITUDE":-117.017 ,"NAME":"Agua Tibia Spring" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":41.167 ,"LONGITUDE":-120.032 ,"NAME":"Bare Ranch Spring" ,"AREA":"Alturas" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":35.978 ,"LONGITUDE":-116.273 ,"NAME":"Shoshone Spring" ,"AREA":"Trona" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":33.407 ,"LONGITUDE":-116.035 ,"NAME":"Fish Springs" ,"AREA":"Santa Ana" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":35.582 ,"LONGITUDE":-120.666 ,"NAME":"Santa Ysabel Springs (Sulphur Spr)" ,"AREA":"San Luis Obisp" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":34.537 ,"LONGITUDE":-119.613 ,"NAME":"Little Caliente Spring" ,"AREA":"Los Angeles" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":39.006 ,"LONGITUDE":-122.787 ,"NAME":"Big Soda Spring" ,"AREA":"Ukiah" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":35.439 ,"LONGITUDE":-119.846 ,"NAME":"Carneros Spring" ,"AREA":"Bakersfield" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":36.441 ,"LONGITUDE":-116.829 ,"NAME":"Travertine Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":37.88 ,"LONGITUDE":-122.627 ,"NAME":"Rocky Point Springs" ,"AREA":"San Francisco" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":39.227 ,"LONGITUDE":-107.224 ,"NAME":"Penny Hot Springs" ,"AREA":"Leadville" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":38.732 ,"LONGITUDE":-106.178 ,"NAME":"Hortense Hot Spring" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":181 ,"CELSIUS":83 }
,{"LATITUDE":37.4 ,"LONGITUDE":-107.849 ,"NAME":"Tripp Hot Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":40.073 ,"LONGITUDE":-106.113 ,"NAME":"Hot Sulphur Springs" ,"AREA":"Craig" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":39.739 ,"LONGITUDE":-105.512 ,"NAME":"Idaho Springs" ,"AREA":"Denver" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":39.552 ,"LONGITUDE":-107.412 ,"NAME":"South Canyon Hot Springs" ,"AREA":"Leadville" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":39.548 ,"LONGITUDE":-107.322 ,"NAME":"Glenwood Springs" ,"AREA":"Leadville" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":38.133 ,"LONGITUDE":-107.736 ,"NAME":"Orvis Hot Spring" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":39.017 ,"LONGITUDE":-105.793 ,"NAME":"Hartsel Hot Springs" ,"AREA":"Denver" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":38.733 ,"LONGITUDE":-106.162 ,"NAME":"Mount Princeton Hot Springs" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":37.752 ,"LONGITUDE":-108.131 ,"NAME":"Paradise Warm Spring" ,"AREA":"Cortez" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":37.747 ,"LONGITUDE":-106.831 ,"NAME":"Wagon Wheel Gap Hot Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":37.263 ,"LONGITUDE":-107.011 ,"NAME":"Pagosa Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":38.812 ,"LONGITUDE":-106.226 ,"NAME":"Cottonwood Hot Springs" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":38.168 ,"LONGITUDE":-105.924 ,"NAME":"Mineral Hot Springs" ,"AREA":"Pueblo" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":40.559 ,"LONGITUDE":-106.849 ,"NAME":"Routt Hot Springs" ,"AREA":"Craig" ,"TYPE":"Hotspring" ,"FARENHEIT":147 ,"CELSIUS":64 }
,{"LATITUDE":38.021 ,"LONGITUDE":-107.672 ,"NAME":"Ouray Hot Springs" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":38.498 ,"LONGITUDE":-106.076 ,"NAME":"Poncha Hot Springs" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":160 ,"CELSIUS":71 }
,{"LATITUDE":38.514 ,"LONGITUDE":-106.508 ,"NAME":"Upper Waunita Hot Springs" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":176 ,"CELSIUS":80 }
,{"LATITUDE":38.272 ,"LONGITUDE":-107.1 ,"NAME":"Cebolla Hot Springs" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":37.313 ,"LONGITUDE":-107.344 ,"NAME":"Piedra River Hot Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":38.517 ,"LONGITUDE":-106.515 ,"NAME":"Lower Waunita Hot Springs" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":167 ,"CELSIUS":75 }
,{"LATITUDE":38.816 ,"LONGITUDE":-106.873 ,"NAME":"Ranger Hot Spring" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":37.294 ,"LONGITUDE":-105.784 ,"NAME":"Dexter Spring" ,"AREA":"Trinidad" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":38.634 ,"LONGITUDE":-106.072 ,"NAME":"Browns Grotto Warm Spring" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":39.164 ,"LONGITUDE":-106.062 ,"NAME":"Rhodes Warm Spring" ,"AREA":"Leadville" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":38.836 ,"LONGITUDE":-106.825 ,"NAME":"Cement Creek Hot Spring" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":38.653 ,"LONGITUDE":-106.056 ,"NAME":"Browns Canyon Warm Spring" ,"AREA":"Montrose" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":37.033 ,"LONGITUDE":-106.805 ,"NAME":"Stinking Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":37.747 ,"LONGITUDE":-108.117 ,"NAME":"Geyser Warm Spring" ,"AREA":"Cortez" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":38.479 ,"LONGITUDE":-105.891 ,"NAME":"Swissvale Warm Springs" ,"AREA":"Pueblo" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":37.751 ,"LONGITUDE":-106.317 ,"NAME":"Shaw Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":37.728 ,"LONGITUDE":-107.054 ,"NAME":"Birdsie Warm Spring" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":37.741 ,"LONGITUDE":-107.034 ,"NAME":"Antelope Spring" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":39.628 ,"LONGITUDE":-107.106 ,"NAME":"Dotsero Warm Springs" ,"AREA":"Leadville" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":38.485 ,"LONGITUDE":-105.91 ,"NAME":"Wellsville Warm Spring" ,"AREA":"Pueblo" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":38.014 ,"LONGITUDE":-108.054 ,"NAME":"Lemon Hot Spring" ,"AREA":"Moab" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":37.391 ,"LONGITUDE":-107.846 ,"NAME":"Trimble Hot Spr, Stratten Warm Spr" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":38.192 ,"LONGITUDE":-105.816 ,"NAME":"Valley View Hot Springs" ,"AREA":"Pueblo" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":38.433 ,"LONGITUDE":-105.261 ,"NAME":"Canon City Hot Springs" ,"AREA":"Pueblo" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":39.012 ,"LONGITUDE":-106.891 ,"NAME":"Conundrum Hot Springs" ,"AREA":"Leadville" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":37.511 ,"LONGITUDE":-106.945 ,"NAME":"Rainbow Hot Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":40.467 ,"LONGITUDE":-107.952 ,"NAME":"Juniper Hot Springs" ,"AREA":"Craig" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":40.483 ,"LONGITUDE":-106.827 ,"NAME":"Steamboat Springs" ,"AREA":"Craig" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":37.771 ,"LONGITUDE":-108.091 ,"NAME":"Dunton Hot Spring" ,"AREA":"Cortez" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":37.453 ,"LONGITUDE":-107.803 ,"NAME":"Pinkerton Hot Springs" ,"AREA":"Durango" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":39.932 ,"LONGITUDE":-105.277 ,"NAME":"Eldorado Springs" ,"AREA":"Denver" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":27.074 ,"LONGITUDE":-82.233 ,"NAME":"Little Salt Spring" ,"AREA":"Tampa" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":27.06 ,"LONGITUDE":-82.261 ,"NAME":"Warm Mineral Springs (Big Salt Spr" ,"AREA":"Tampa" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":32.92 ,"LONGITUDE":-84.438 ,"NAME":"Barker Spring" ,"AREA":"Phenix City" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":32.964 ,"LONGITUDE":-84.499 ,"NAME":"Thundering Spring" ,"AREA":"Phenix City" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":33.018 ,"LONGITUDE":-84.327 ,"NAME":"Taylor Spring" ,"AREA":"Atlanta" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":32.862 ,"LONGITUDE":-84.65 ,"NAME":"Parkman Spring" ,"AREA":"Phenix City" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":33.037 ,"LONGITUDE":-84.374 ,"NAME":"Lifsey Spring" ,"AREA":"Atlanta" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":32.893 ,"LONGITUDE":-84.69 ,"NAME":"Warm Springs" ,"AREA":"Phenix City" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":32.873 ,"LONGITUDE":-84.547 ,"NAME":"Tom Brown Spring" ,"AREA":"Phenix City" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":19.407 ,"LONGITUDE":-155.277 ,"NAME":"Steam Vents" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.46 ,"LONGITUDE":-154.847 ,"NAME":"Isaac Hale Park Spring" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":19.496 ,"LONGITUDE":-154.876 ,"NAME":"Warm Vapor" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.373 ,"LONGITUDE":-155.188 ,"NAME":"Steam Vents" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.39 ,"LONGITUDE":-155.311 ,"NAME":"Steam Vents" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.434 ,"LONGITUDE":-155.272 ,"NAME":"Steam Vents" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.486 ,"LONGITUDE":-155.598 ,"NAME":"Steam Vents" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.466 ,"LONGITUDE":-154.943 ,"NAME":"Steam Vents" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.421 ,"LONGITUDE":-155.62 ,"NAME":"Steam Vents" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":19.201 ,"LONGITUDE":-155.384 ,"NAME":"Waiwelawela Point Spring" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":19.593 ,"LONGITUDE":-154.928 ,"NAME":"Akins Spring" ,"AREA":"Hawaii" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":44.721 ,"LONGITUDE":-115.01 ,"NAME":"Thomas Creek Ranch Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":45.431 ,"LONGITUDE":-116.015 ,"NAME":"Cow Flats Hot Spring" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":44.062 ,"LONGITUDE":-115.685 ,"NAME":"Pine Flat Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":44.382 ,"LONGITUDE":-115.841 ,"NAME":"Dash Creek Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":44.077 ,"LONGITUDE":-115.553 ,"NAME":"Haven Lodge Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":147 ,"CELSIUS":64 }
,{"LATITUDE":43.647 ,"LONGITUDE":-114.816 ,"NAME":"Skillern Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":43.789 ,"LONGITUDE":-115.434 ,"NAME":"Dutch Frank Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":43.54 ,"LONGITUDE":-115.288 ,"NAME":"Bridge Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":43.72 ,"LONGITUDE":-115.617 ,"NAME":"Smith Cabin Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":42.688 ,"LONGITUDE":-114.826 ,"NAME":"Banbury Hot Spring" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":45.035 ,"LONGITUDE":-115.561 ,"NAME":"Sheep Creek Hot Spring" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.245 ,"LONGITUDE":-114.885 ,"NAME":"Elkhorn Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.642 ,"LONGITUDE":-115.693 ,"NAME":"Mollys Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":43.811 ,"LONGITUDE":-115.116 ,"NAME":"Atlanta Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":44.679 ,"LONGITUDE":-116.231 ,"NAME":"White Licks Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":45.512 ,"LONGITUDE":-115.046 ,"NAME":"Barth Hot Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":43.696 ,"LONGITUDE":-115.658 ,"NAME":"Sheep Creek Bridge Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":44.914 ,"LONGITUDE":-115.722 ,"NAME":"Teapot Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":43.788 ,"LONGITUDE":-115.444 ,"NAME":"Straight Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":43.116 ,"LONGITUDE":-115.305 ,"NAME":"Latty Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":45.039 ,"LONGITUDE":-116.291 ,"NAME":"Zims Resort Hot Springs" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":43.049 ,"LONGITUDE":-114.952 ,"NAME":"White Arrow Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":145 ,"CELSIUS":63 }
,{"LATITUDE":44.645 ,"LONGITUDE":-114.739 ,"NAME":"Upper Loon Creek Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":145 ,"CELSIUS":63 }
,{"LATITUDE":43.383 ,"LONGITUDE":-114.931 ,"NAME":"Wardrop Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":147 ,"CELSIUS":64 }
,{"LATITUDE":44.531 ,"LONGITUDE":-116.754 ,"NAME":"Fairchild Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":44.661 ,"LONGITUDE":-114.652 ,"NAME":"Foster Ranch Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":44.051 ,"LONGITUDE":-115.829 ,"NAME":"Dan Hodges Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":43.506 ,"LONGITUDE":-114.354 ,"NAME":"Hailey Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":43.982 ,"LONGITUDE":-114.486 ,"NAME":"West Pass Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":43.641 ,"LONGITUDE":-114.487 ,"NAME":"Warfield Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":44.145 ,"LONGITUDE":-112.554 ,"NAME":"Lidy Hot Springs" ,"AREA":"Dubois" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":44.054 ,"LONGITUDE":-115.907 ,"NAME":"Hot Spring Campground" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":42.032 ,"LONGITUDE":-115.363 ,"NAME":"Murphy Hot Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":43.561 ,"LONGITUDE":-114.415 ,"NAME":"Clarendon Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":43.423 ,"LONGITUDE":-114.627 ,"NAME":"Elk Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":43.553 ,"LONGITUDE":-115.267 ,"NAME":"Paradise Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":42.308 ,"LONGITUDE":-111.707 ,"NAME":"Maple Grove Hot Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":172 ,"CELSIUS":78 }
,{"LATITUDE":45.013 ,"LONGITUDE":-113.605 ,"NAME":"Sharkey Hot Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":44.73 ,"LONGITUDE":-114.993 ,"NAME":"Sunflower Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":43.974 ,"LONGITUDE":-114.499 ,"NAME":"Lower Bowery Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":43.724 ,"LONGITUDE":-115.604 ,"NAME":"Loftus Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":44.676 ,"LONGITUDE":-115.943 ,"NAME":"Gold Fork Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":44.044 ,"LONGITUDE":-115.851 ,"NAME":"Donlay Ranch Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":44.264 ,"LONGITUDE":-114.818 ,"NAME":"Basin Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":44.652 ,"LONGITUDE":-114.734 ,"NAME":"Owen Cabin Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":43.605 ,"LONGITUDE":-115.664 ,"NAME":"Rattlesnake Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":43.605 ,"LONGITUDE":-114.948 ,"NAME":"Lightfoot Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":45.788 ,"LONGITUDE":-115.198 ,"NAME":"Red River Hot Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":44.632 ,"LONGITUDE":-115.697 ,"NAME":"South Fork Plunge" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":44.853 ,"LONGITUDE":-116.442 ,"NAME":"Starkey Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":42.692 ,"LONGITUDE":-114.859 ,"NAME":"Hot Sulphur (Miracle Hot) Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":44.045 ,"LONGITUDE":-115.842 ,"NAME":"Corder Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":44.247 ,"LONGITUDE":-114.676 ,"NAME":"Robinson Bar Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":44.785 ,"LONGITUDE":-114.855 ,"NAME":"Cox Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":43.637 ,"LONGITUDE":-115.13 ,"NAME":"Willow Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":43.803 ,"LONGITUDE":-115.401 ,"NAME":"Granite Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":43.129 ,"LONGITUDE":-115.34 ,"NAME":"Coyote Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":44.211 ,"LONGITUDE":-116.71 ,"NAME":"Cove Creek Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":44.16 ,"LONGITUDE":-115.167 ,"NAME":"Grandjean Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.755 ,"LONGITUDE":-115.571 ,"NAME":"Ninemeyer Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":169 ,"CELSIUS":76 }
,{"LATITUDE":43.701 ,"LONGITUDE":-114.738 ,"NAME":"Big Smokey Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.831 ,"LONGITUDE":-115.192 ,"NAME":"Queens River Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.817 ,"LONGITUDE":-115.046 ,"NAME":"Leggit Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.718 ,"LONGITUDE":-115.563 ,"NAME":"Basset Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.588 ,"LONGITUDE":-115.988 ,"NAME":"Mores Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.951 ,"LONGITUDE":-114.704 ,"NAME":"Mormon Ranch Warm Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.896 ,"LONGITUDE":-114.563 ,"NAME":"Forge Creek Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.77 ,"LONGITUDE":-115.663 ,"NAME":"Billy Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.628 ,"LONGITUDE":-115.197 ,"NAME":"Sheepeater Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.585 ,"LONGITUDE":-115.072 ,"NAME":"Sulphur Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.554 ,"LONGITUDE":-115.301 ,"NAME":"Sulphur Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":42.107 ,"LONGITUDE":-113.39 ,"NAME":"Blm Well (Frazier Hot Spring)" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.4 ,"LONGITUDE":-115.82 ,"NAME":"Goat Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":45.307 ,"LONGITUDE":-114.338 ,"NAME":"Big Creek Hot Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.583 ,"LONGITUDE":-116.112 ,"NAME":"Cascade Reservoir Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":45.17 ,"LONGITUDE":-115.807 ,"NAME":"Secesh Hot Spring" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":46.235 ,"LONGITUDE":-114.707 ,"NAME":"Prospector Hot Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":46.138 ,"LONGITUDE":-115.09 ,"NAME":"Stuart Hot Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":46.006 ,"LONGITUDE":-115.021 ,"NAME":"Marten Hot Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":42.374 ,"LONGITUDE":-111.726 ,"NAME":"Mound Valley Warm Spring" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.255 ,"LONGITUDE":-114.829 ,"NAME":"Mormon Reservoir Warm Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.639 ,"LONGITUDE":-115.671 ,"NAME":"Warm Lake Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.445 ,"LONGITUDE":-115.239 ,"NAME":"Bear Valley Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.354 ,"LONGITUDE":-117.071 ,"NAME":"Old Homestead Warm Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.327 ,"LONGITUDE":-113.918 ,"NAME":"Condie Hot Springs" ,"AREA":"Idaho Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":43.038 ,"LONGITUDE":-112.004 ,"NAME":"Alkali Flats Warm Spring" ,"AREA":"Idaho Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":44.43 ,"LONGITUDE":-115.762 ,"NAME":"Bull Creek Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":42.119 ,"LONGITUDE":-111.928 ,"NAME":"Squaw Hot Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":42.333 ,"LONGITUDE":-111.716 ,"NAME":"Cleveland Hot Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":43.671 ,"LONGITUDE":-115.696 ,"NAME":"Twin Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":43.951 ,"LONGITUDE":-116.353 ,"NAME":"Roystone Hot Springs" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":42.704 ,"LONGITUDE":-114.856 ,"NAME":"Salmon Falls Hot Spring" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":153 ,"CELSIUS":67 }
,{"LATITUDE":44.16 ,"LONGITUDE":-115.177 ,"NAME":"Sacajawea Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":153 ,"CELSIUS":67 }
,{"LATITUDE":43.738 ,"LONGITUDE":-115.583 ,"NAME":"Vaughn Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":44.669 ,"LONGITUDE":-116.305 ,"NAME":"Council Mtn Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":44.831 ,"LONGITUDE":-115.215 ,"NAME":"Kwiskwis Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":43.684 ,"LONGITUDE":-114.41 ,"NAME":"Guyer Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":43.155 ,"LONGITUDE":-115.518 ,"NAME":"Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":44.586 ,"LONGITUDE":-116.63 ,"NAME":"Lakey Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":42.333 ,"LONGITUDE":-115.65 ,"NAME":"Indian Hot Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":160 ,"CELSIUS":71 }
,{"LATITUDE":42.637 ,"LONGITUDE":-114.892 ,"NAME":"Poison Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.813 ,"LONGITUDE":-115.123 ,"NAME":"Middle Fork Indian Creek Hot Sprin" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":44.072 ,"LONGITUDE":-115.543 ,"NAME":"Kirkham Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":43.328 ,"LONGITUDE":-114.399 ,"NAME":"Magic Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":43.293 ,"LONGITUDE":-114.908 ,"NAME":"Barrons Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":167 ,"CELSIUS":75 }
,{"LATITUDE":44.154 ,"LONGITUDE":-115.993 ,"NAME":"Warm Springs Creek Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":167 ,"CELSIUS":75 }
,{"LATITUDE":44.268 ,"LONGITUDE":-114.748 ,"NAME":"Sunbeam Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":169 ,"CELSIUS":76 }
,{"LATITUDE":44.092 ,"LONGITUDE":-116.052 ,"NAME":"Deer Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":176 ,"CELSIUS":80 }
,{"LATITUDE":43.563 ,"LONGITUDE":-114.798 ,"NAME":"Worswick Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":42.133 ,"LONGITUDE":-111.928 ,"NAME":"Battle Creek Hot Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":183 ,"CELSIUS":84 }
,{"LATITUDE":44.364 ,"LONGITUDE":-115.856 ,"NAME":"Boiling Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":44.157 ,"LONGITUDE":-115.314 ,"NAME":"Bonneville Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":44.799 ,"LONGITUDE":-115.129 ,"NAME":"Indian Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":44.568 ,"LONGITUDE":-115.695 ,"NAME":"Vulcan Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":44.306 ,"LONGITUDE":-116.745 ,"NAME":"Crane Creek Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.416 ,"LONGITUDE":-116.031 ,"NAME":"Cabarton Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":160 ,"CELSIUS":71 }
,{"LATITUDE":42.781 ,"LONGITUDE":-111.983 ,"NAME":"Portneuf River Warm Spring" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":44.621 ,"LONGITUDE":-115.985 ,"NAME":"Badley Warm Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":45.201 ,"LONGITUDE":-116.312 ,"NAME":"Boulder Creek Spring" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":42.24 ,"LONGITUDE":-113.588 ,"NAME":"Sears Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":44.257 ,"LONGITUDE":-112.639 ,"NAME":"Warm Springs" ,"AREA":"Dubois" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":42.911 ,"LONGITUDE":-111.556 ,"NAME":"Henry Warm Spring" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":43.021 ,"LONGITUDE":-111.695 ,"NAME":"Wilson Lake Warm Spring" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":44.495 ,"LONGITUDE":-116.732 ,"NAME":"Keithly Warm Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":42.655 ,"LONGITUDE":-111.643 ,"NAME":"Steamboat Hot Spring" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":45.152 ,"LONGITUDE":-116.296 ,"NAME":"Stinky Warm Spring" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":42.725 ,"LONGITUDE":-112.872 ,"NAME":"Indian Springs" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":43.114 ,"LONGITUDE":-112.167 ,"NAME":"Yandell Springs" ,"AREA":"Idaho Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":44.64 ,"LONGITUDE":-116.045 ,"NAME":"Arling Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":42.657 ,"LONGITUDE":-111.604 ,"NAME":"Soda Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":45.07 ,"LONGITUDE":-115.826 ,"NAME":"Lick Creek Warm Spring" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":42.337 ,"LONGITUDE":-111.726 ,"NAME":"Treasureton Hot Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":44.382 ,"LONGITUDE":-114.088 ,"NAME":"Little Antelope Flat Warm Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":43.21 ,"LONGITUDE":-111.495 ,"NAME":"Brockman Creek Hot Spring" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":44.398 ,"LONGITUDE":-115.149 ,"NAME":"Cape Horn Warm Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":42.337 ,"LONGITUDE":-114.509 ,"NAME":"Nat-Soo-Pah Warm Spring" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":44.9 ,"LONGITUDE":-115.505 ,"NAME":"Hot Creek Warm Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":42.405 ,"LONGITUDE":-114.142 ,"NAME":"Artesian City Hot Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":42.762 ,"LONGITUDE":-115.739 ,"NAME":"Indian Bathtub Hot Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":43.227 ,"LONGITUDE":-111.109 ,"NAME":"Alpine Warm Spring" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":42.545 ,"LONGITUDE":-112.906 ,"NAME":"Rockland Warm Springs" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":43.805 ,"LONGITUDE":-114.585 ,"NAME":"Russian John Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":43.779 ,"LONGITUDE":-114.539 ,"NAME":"Easley Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":44.26 ,"LONGITUDE":-114.838 ,"NAME":"Mormon Bend Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":44.64 ,"LONGITUDE":-113.504 ,"NAME":"Big Eightmile Creek Warm Spring" ,"AREA":"Dubois" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":42.339 ,"LONGITUDE":-112.436 ,"NAME":"Kent Warm Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":42.957 ,"LONGITUDE":-112.458 ,"NAME":"Tadpole Warm Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":43.607 ,"LONGITUDE":-111.189 ,"NAME":"Taylor Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":43.972 ,"LONGITUDE":-116.325 ,"NAME":"Sweet Warm Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":44.717 ,"LONGITUDE":-115.703 ,"NAME":"Dollar Creek Warm Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":42.625 ,"LONGITUDE":-113.107 ,"NAME":"Lake Walcott Hot Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":42.015 ,"LONGITUDE":-114.237 ,"NAME":"Thoroughbred Warm Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":69 ,"CELSIUS":21 }
,{"LATITUDE":42.928 ,"LONGITUDE":-111.592 ,"NAME":"Blackfoot Reservoir Warm Spring" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":42.286 ,"LONGITUDE":-113.446 ,"NAME":"Rice Spring, Ward Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":42.085 ,"LONGITUDE":-113.564 ,"NAME":"Grape Creek Warm Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.66 ,"LONGITUDE":-111.715 ,"NAME":"Elkhorn Warm Spring" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.367 ,"LONGITUDE":-113.884 ,"NAME":"Rush Warm Spring" ,"AREA":"Idaho Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":44.306 ,"LONGITUDE":-117.042 ,"NAME":"Weiser Warm Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":45.344 ,"LONGITUDE":-114.463 ,"NAME":"Owl Creek Hot Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":44.454 ,"LONGITUDE":-112.696 ,"NAME":"Big Spring" ,"AREA":"Dubois" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":44.269 ,"LONGITUDE":-113.449 ,"NAME":"Barney Hot Springs" ,"AREA":"Dubois" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":43.5 ,"LONGITUDE":-115.308 ,"NAME":"Towne Creek Warm Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":43.161 ,"LONGITUDE":-116.332 ,"NAME":"Thomas Flats Warm Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":44.612 ,"LONGITUDE":-113.363 ,"NAME":"Whittaker Warm Springs" ,"AREA":"Dubois" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":42.173 ,"LONGITUDE":-112.239 ,"NAME":"Malad Warm Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":42.156 ,"LONGITUDE":-112.348 ,"NAME":"Pleasantview Warm Springs" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":42.025 ,"LONGITUDE":-112.226 ,"NAME":"Prices Warm Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":42.865 ,"LONGITUDE":-116.368 ,"NAME":"Lower Birch Spring" ,"AREA":"Jordan Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":43.423 ,"LONGITUDE":-111.414 ,"NAME":"Fall Creek Mineral Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":42.986 ,"LONGITUDE":-111.743 ,"NAME":"Blackfoot River Warm Spring" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":42.426 ,"LONGITUDE":-111.378 ,"NAME":"Pescadero Warm Spring" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":44.091 ,"LONGITUDE":-111.458 ,"NAME":"Ashton Warm Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":42.056 ,"LONGITUDE":-112.246 ,"NAME":"Woodruff Hot Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":43.831 ,"LONGITUDE":-116.396 ,"NAME":"Highland Land Co Warm Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":44.847 ,"LONGITUDE":-115.696 ,"NAME":"Holdover Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":43.047 ,"LONGITUDE":-114.929 ,"NAME":"Hot Sulphur Lake" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":43.603 ,"LONGITUDE":-115.07 ,"NAME":"Baumgartner Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":44.465 ,"LONGITUDE":-116.037 ,"NAME":"Belvidere Hot Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":42.621 ,"LONGITUDE":-112.008 ,"NAME":"Lava Hot Springs" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":43.823 ,"LONGITUDE":-115.327 ,"NAME":"Weatherby Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":43.335 ,"LONGITUDE":-115.044 ,"NAME":"Wolf Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":44.905 ,"LONGITUDE":-113.929 ,"NAME":"Goldbug Hot Spring" ,"AREA":"Dubois" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":45.095 ,"LONGITUDE":-113.836 ,"NAME":"Salmon Hot Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":45.277 ,"LONGITUDE":-115.912 ,"NAME":"Burgdorf Hot Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":44.836 ,"LONGITUDE":-114.79 ,"NAME":"Hospital Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":44.72 ,"LONGITUDE":-114.016 ,"NAME":"Cronks Canyon Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":44.721 ,"LONGITUDE":-115.207 ,"NAME":"Pistol Creek Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":43.791 ,"LONGITUDE":-111.435 ,"NAME":"Pincock (Green Canyon) Hot Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":43.414 ,"LONGITUDE":-116.707 ,"NAME":"Givens Hot Springs" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":45.503 ,"LONGITUDE":-114.463 ,"NAME":"Horse Creek Hot Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":46.464 ,"LONGITUDE":-115.035 ,"NAME":"Weir Creek Hot Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":42.115 ,"LONGITUDE":-111.264 ,"NAME":"Bear Lake Hot Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":42.173 ,"LONGITUDE":-113.861 ,"NAME":"Oakley Hot Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":46.463 ,"LONGITUDE":-114.872 ,"NAME":"Jerry Johnson Hot Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":43.644 ,"LONGITUDE":-111.687 ,"NAME":"Heise Hot Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":44.799 ,"LONGITUDE":-114.806 ,"NAME":"Lower Loon Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":44.253 ,"LONGITUDE":-115.891 ,"NAME":"Rocky Canyon Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":46.316 ,"LONGITUDE":-115.258 ,"NAME":"Stanley Hot Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":43.779 ,"LONGITUDE":-115.486 ,"NAME":"Brown Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":44.628 ,"LONGITUDE":-114.601 ,"NAME":"Shower Bath Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":44.171 ,"LONGITUDE":-114.624 ,"NAME":"Slate Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":44.392 ,"LONGITUDE":-115.834 ,"NAME":"Ground Hog Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":42.797 ,"LONGITUDE":-115.723 ,"NAME":"Bat Hot Spring, Pence Hot Spring" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":42.767 ,"LONGITUDE":-115.725 ,"NAME":"Lower Indian Bathtub Hot Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":42.102 ,"LONGITUDE":-113.632 ,"NAME":"Durfee Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":44.33 ,"LONGITUDE":-115.802 ,"NAME":"Silver Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":42.447 ,"LONGITUDE":-113.523 ,"NAME":"Marsh Creek Hot Spring" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":42.449 ,"LONGITUDE":-113.511 ,"NAME":"Marsh Gully Hot Springs" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":42.798 ,"LONGITUDE":-115.742 ,"NAME":"Bruneau Hot Spring" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":43.576 ,"LONGITUDE":-114.83 ,"NAME":"Preis Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":43.677 ,"LONGITUDE":-116.208 ,"NAME":"Terteling Hot Springs" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":44.254 ,"LONGITUDE":-114.443 ,"NAME":"Sullivan Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":44.224 ,"LONGITUDE":-114.929 ,"NAME":"Stanley Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":44.101 ,"LONGITUDE":-114.865 ,"NAME":"Rosalys Warm Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":44.06 ,"LONGITUDE":-115.819 ,"NAME":"Danskin Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":45.852 ,"LONGITUDE":-114.937 ,"NAME":"Running Warm Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":43.363 ,"LONGITUDE":-113.779 ,"NAME":"Milford Sweat Hot Spring" ,"AREA":"Idaho Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":46.466 ,"LONGITUDE":-114.939 ,"NAME":"Colgate Warm Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":44.626 ,"LONGITUDE":-115.749 ,"NAME":"Trail Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":43.816 ,"LONGITUDE":-115.863 ,"NAME":"Warm Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":43.76 ,"LONGITUDE":-115.56 ,"NAME":"Pool Creek Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":45.042 ,"LONGITUDE":-114.616 ,"NAME":"Snowshoe Johnsons Hot Spring" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":42.388 ,"LONGITUDE":-112.085 ,"NAME":"Downata Hot Springs" ,"AREA":"Pocatello" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":42.013 ,"LONGITUDE":-114.504 ,"NAME":"Magic Hot Springs" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":42.779 ,"LONGITUDE":-115.715 ,"NAME":"Buckaroo Hot Spring" ,"AREA":"Twin Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":43.99 ,"LONGITUDE":-114.8 ,"NAME":"Pierson Hot Springs" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":43.038 ,"LONGITUDE":-114.988 ,"NAME":"Tschanne Hot Spring" ,"AREA":"Hailey" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":44.523 ,"LONGITUDE":-114.173 ,"NAME":"Beardsley Hot Springs" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":44.733 ,"LONGITUDE":-115.018 ,"NAME":"Sunflower Flat Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":44.516 ,"LONGITUDE":-115.295 ,"NAME":"Dagger Creek Hot Spring" ,"AREA":"Challis" ,"TYPE":"Hotspring" ,"FARENHEIT":110 ,"CELSIUS":43 }
,{"LATITUDE":44.971 ,"LONGITUDE":-116.203 ,"NAME":"Krigbaum Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":45.416 ,"LONGITUDE":-116.172 ,"NAME":"Riggins Hot Springs" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":42.735 ,"LONGITUDE":-73.2 ,"NAME":"Sand Spring" ,"AREA":"Albany" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":46.106 ,"LONGITUDE":-114.004 ,"NAME":"Sleeping Child Hot Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":45.697 ,"LONGITUDE":-114.365 ,"NAME":"Blue Joint Hot Springs 2" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":44.769 ,"LONGITUDE":-111.649 ,"NAME":"Sloan Cow Camp Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":47.632 ,"LONGITUDE":-112.855 ,"NAME":"Medicine (Sun River) Springs" ,"AREA":"Choteau" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":45.75 ,"LONGITUDE":-113.938 ,"NAME":"Gallogly Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":47.33 ,"LONGITUDE":-114.789 ,"NAME":"Quinns Hot Springs" ,"AREA":"Wallace" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":45.171 ,"LONGITUDE":-112.153 ,"NAME":"Puller Hot Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":46.728 ,"LONGITUDE":-114.533 ,"NAME":"Lolo Hot Springs, Granite Springs" ,"AREA":"Hamilton" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":45.337 ,"LONGITUDE":-110.691 ,"NAME":"Chico Hot Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":47.607 ,"LONGITUDE":-114.663 ,"NAME":"Camas Hot Springs" ,"AREA":"Wallace" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":45.841 ,"LONGITUDE":-114.038 ,"NAME":"Medicine Hot Springs" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":45.458 ,"LONGITUDE":-113.109 ,"NAME":"Elkhorn Hot Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":45.027 ,"LONGITUDE":-112.844 ,"NAME":"Mcmenomey Ranch Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":45.792 ,"LONGITUDE":-112.126 ,"NAME":"Renova Hot Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":44.701 ,"LONGITUDE":-111.878 ,"NAME":"Staudenmeyer Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":45.602 ,"LONGITUDE":-111.9 ,"NAME":"Potosi Warm Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":45.575 ,"LONGITUDE":-111.683 ,"NAME":"Norris Hot Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":45.462 ,"LONGITUDE":-112.475 ,"NAME":"New Biltmore Hot Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":45.66 ,"LONGITUDE":-111.186 ,"NAME":"Bozeman Hot Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":45.896 ,"LONGITUDE":-112.233 ,"NAME":"Pipestone Hot Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":46.547 ,"LONGITUDE":-110.903 ,"NAME":"White Sulphur Springs" ,"AREA":"White Sulphur" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":46.448 ,"LONGITUDE":-111.982 ,"NAME":"Alhambra Hot Springs" ,"AREA":"White Sulphur" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":45.757 ,"LONGITUDE":-110.256 ,"NAME":"Hunters Hot Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":45.368 ,"LONGITUDE":-113.403 ,"NAME":"Jardine Hot Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":46.596 ,"LONGITUDE":-112.108 ,"NAME":"Broadwater (Helena) Hot Springs" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":44.984 ,"LONGITUDE":-111.613 ,"NAME":"Wolf Creek Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":45.685 ,"LONGITUDE":-112.295 ,"NAME":"Silver Star Hot Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":45.59 ,"LONGITUDE":-111.899 ,"NAME":"Potosi Hot Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":45.105 ,"LONGITUDE":-112.751 ,"NAME":"Browns Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":46.718 ,"LONGITUDE":-113.306 ,"NAME":"Bearmouth Warm Spring 2" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":46.717 ,"LONGITUDE":-113.32 ,"NAME":"Bearmouth Warm Spring 1" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":47.217 ,"LONGITUDE":-109.471 ,"NAME":"Brooks Warm Spring" ,"AREA":"Lewistown" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":45.708 ,"LONGITUDE":-110.976 ,"NAME":"Bridger Canyon Warm Spring" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":46.795 ,"LONGITUDE":-108.883 ,"NAME":"Durfee Creek Springs" ,"AREA":"Roundup" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":46.704 ,"LONGITUDE":-113.452 ,"NAME":"Nimrod Springs" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":47.876 ,"LONGITUDE":-108.656 ,"NAME":"Landusky Springs" ,"AREA":"Lewistown" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":45.032 ,"LONGITUDE":-110.667 ,"NAME":"Bear Creek Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":45.111 ,"LONGITUDE":-112.714 ,"NAME":"Lovells Hot Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":46.106 ,"LONGITUDE":-112.903 ,"NAME":"Anaconda Hot Springs" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":45.235 ,"LONGITUDE":-112.135 ,"NAME":"Trudau Warm Springs" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":45.698 ,"LONGITUDE":-114.382 ,"NAME":"Blue Joint Hot Spring 1" ,"AREA":"Elk City" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":45.037 ,"LONGITUDE":-111.953 ,"NAME":"Vigilante Spring" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":45.608 ,"LONGITUDE":-110.571 ,"NAME":"Carter Bridge Warm Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":46.355 ,"LONGITUDE":-111.565 ,"NAME":"Bedford Hot Springs" ,"AREA":"White Sulphur" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":24 }
,{"LATITUDE":45.553 ,"LONGITUDE":-110.142 ,"NAME":"Anderson Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":45.42 ,"LONGITUDE":-112.692 ,"NAME":"Apex Warm Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":46.607 ,"LONGITUDE":-112.776 ,"NAME":"Garrison Warm Springs" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":47.843 ,"LONGITUDE":-108.598 ,"NAME":"The (Landusky) Plunge" ,"AREA":"Lewistown" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":44.785 ,"LONGITUDE":-111.649 ,"NAME":"West Fork Swimming Hole" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":46.61 ,"LONGITUDE":-112.555 ,"NAME":"Avon Warm Spring" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":46.334 ,"LONGITUDE":-112.886 ,"NAME":"Deerlodge Prison Ranch Springs" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":47.994 ,"LONGITUDE":-108.445 ,"NAME":"Lodgepole (Big Warm) Springs" ,"AREA":"Lewistown" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":47.451 ,"LONGITUDE":-114.648 ,"NAME":"Green Springs" ,"AREA":"Wallace" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":45.392 ,"LONGITUDE":-112.452 ,"NAME":"Beaverhead Rock Spring" ,"AREA":"Dillon" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":44.704 ,"LONGITUDE":-111.892 ,"NAME":"Andersons Pasture Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":47.971 ,"LONGITUDE":-108.395 ,"NAME":"Little Warm Springs" ,"AREA":"Lewistown" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":46.198 ,"LONGITUDE":-112.094 ,"NAME":"Boulder Hot Springs" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":169 ,"CELSIUS":76 }
,{"LATITUDE":46.178 ,"LONGITUDE":-112.794 ,"NAME":"Warm Springs (State Hospital)" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":172 ,"CELSIUS":78 }
,{"LATITUDE":45.367 ,"LONGITUDE":-111.726 ,"NAME":"Ennis Hot Springs" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":181 ,"CELSIUS":83 }
,{"LATITUDE":46.044 ,"LONGITUDE":-112.811 ,"NAME":"Gregson Hot Springs" ,"AREA":"Butte" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":45.09 ,"LONGITUDE":-110.774 ,"NAME":"Laduke (Corwin) Hot Spring" ,"AREA":"Bozeman" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":35.897 ,"LONGITUDE":-82.826 ,"NAME":"Hot Springs" ,"AREA":"Knoxville" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":32.644 ,"LONGITUDE":-108.128 ,"NAME":"Apache Tejo Warm Spring" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":33.135 ,"LONGITUDE":-107.254 ,"NAME":"Truth Or Consequences" ,"AREA":"Tularosa" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":36.305 ,"LONGITUDE":-106.053 ,"NAME":"Ojo Caliente (Arsenic Spring)" ,"AREA":"Aztec" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":33.162 ,"LONGITUDE":-108.209 ,"NAME":"Spring (Hot)" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":36.508 ,"LONGITUDE":-105.722 ,"NAME":"Manby Hot Springs" ,"AREA":"Raton" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":35.849 ,"LONGITUDE":-106.629 ,"NAME":"Spence Hot Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":35.972 ,"LONGITUDE":-106.56 ,"NAME":"San Antonio Warm Spring" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":101 ,"CELSIUS":38 }
,{"LATITUDE":35.82 ,"LONGITUDE":-106.627 ,"NAME":"Mccauley Hot Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":35.793 ,"LONGITUDE":-106.685 ,"NAME":"Soda Dam Hot Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":33.831 ,"LONGITUDE":-108.8 ,"NAME":"(Upper) Frisco Hot Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":98 ,"CELSIUS":37 }
,{"LATITUDE":35.646 ,"LONGITUDE":-106.888 ,"NAME":"Warm Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":36.324 ,"LONGITUDE":-105.606 ,"NAME":"Ponce De Leon Springs" ,"AREA":"Raton" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":34.038 ,"LONGITUDE":-106.94 ,"NAME":"Socorro Spring, Sedillo Spring" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":33.293 ,"LONGITUDE":-108.282 ,"NAME":"Spring Mfg Two, Spring Mfg Three" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":35.592 ,"LONGITUDE":-106.753 ,"NAME":"Indian Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":123 ,"CELSIUS":51 }
,{"LATITUDE":32.501 ,"LONGITUDE":-106.926 ,"NAME":"Radium Springs" ,"AREA":"Las Cruces" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":33.274 ,"LONGITUDE":-108.25 ,"NAME":"Spring Mfg Four" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":35.938 ,"LONGITUDE":-106.646 ,"NAME":"San Antonio Hot Spring" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":33.244 ,"LONGITUDE":-108.88 ,"NAME":"San Francisco Hot Springs" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":32.748 ,"LONGITUDE":-107.836 ,"NAME":"Mimbres Hot Springs" ,"AREA":"Las Cruces" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":35.653 ,"LONGITUDE":-105.29 ,"NAME":"Montezuma Hot Springs" ,"AREA":"Santa Fe" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":33.233 ,"LONGITUDE":-108.235 ,"NAME":"Spring (Hot)" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":33.199 ,"LONGITUDE":-108.209 ,"NAME":"Gila Hot Springs" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":33.108 ,"LONGITUDE":-108.483 ,"NAME":"Turkey Creek Hot Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":165 ,"CELSIUS":74 }
,{"LATITUDE":35.772 ,"LONGITUDE":-106.69 ,"NAME":"Jemez Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":169 ,"CELSIUS":76 }
,{"LATITUDE":35.908 ,"LONGITUDE":-106.615 ,"NAME":"Sulphur Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":189 ,"CELSIUS":87 }
,{"LATITUDE":33.237 ,"LONGITUDE":-108.88 ,"NAME":"Hot Springs" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":32.562 ,"LONGITUDE":-108.027 ,"NAME":"Kennecott Warm Springs" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":32.554 ,"LONGITUDE":-107.994 ,"NAME":"Faywood Hot Springs" ,"AREA":"Las Cruces" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":33.898 ,"LONGITUDE":-108.501 ,"NAME":"Aragon Springs" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":34.847 ,"LONGITUDE":-107.091 ,"NAME":"Spring (Salt)" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":34.903 ,"LONGITUDE":-107.085 ,"NAME":"El Ojo Escondido" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":35.06 ,"LONGITUDE":-107.133 ,"NAME":"Alamos Spring" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":34.912 ,"LONGITUDE":-108.951 ,"NAME":"Rainbow Spring" ,"AREA":"Saint Johns" ,"TYPE":"Hotspring" ,"FARENHEIT":71 ,"CELSIUS":22 }
,{"LATITUDE":34.698 ,"LONGITUDE":-107.129 ,"NAME":"Spring" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":71 ,"CELSIUS":22 }
,{"LATITUDE":32.455 ,"LONGITUDE":-104.489 ,"NAME":"Indian Big Spring" ,"AREA":"Carlsbad" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":34.995 ,"LONGITUDE":-106.454 ,"NAME":"Clear Water Spring" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":69 ,"CELSIUS":21 }
,{"LATITUDE":32.821 ,"LONGITUDE":-108.408 ,"NAME":"Ash Spring" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":32.83 ,"LONGITUDE":-109.047 ,"NAME":"Goat Camp Spring" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":69 ,"CELSIUS":21 }
,{"LATITUDE":35.548 ,"LONGITUDE":-106.827 ,"NAME":"San Ysidro Warm Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":34.116 ,"LONGITUDE":-106.98 ,"NAME":"Ojitos Springs" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":32.248 ,"LONGITUDE":-104.411 ,"NAME":"Mosley Spring" ,"AREA":"Carlsbad" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":33.708 ,"LONGITUDE":-109.025 ,"NAME":"Frieborn Canyon Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":33.192 ,"LONGITUDE":-108.18 ,"NAME":"Lyons Hunting Lodge Hot Springs" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":35.601 ,"LONGITUDE":-106.86 ,"NAME":"Phillips Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":33.285 ,"LONGITUDE":-108.262 ,"NAME":"Spring Mfg One" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":33.306 ,"LONGITUDE":-108.324 ,"NAME":"The Meadows Warm Spring" ,"AREA":"Clifton" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":34.049 ,"LONGITUDE":-106.939 ,"NAME":"Cook Spring" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":32.795 ,"LONGITUDE":-107.276 ,"NAME":"Derry Warm Springs" ,"AREA":"Las Cruces" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":32.884 ,"LONGITUDE":-108.358 ,"NAME":"Allen Springs" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":33.279 ,"LONGITUDE":-107.563 ,"NAME":"Warm Springs" ,"AREA":"Tularosa" ,"TYPE":"Hotspring" ,"FARENHEIT":87 ,"CELSIUS":31 }
,{"LATITUDE":32.606 ,"LONGITUDE":-107.19 ,"NAME":"Souse Springs" ,"AREA":"Las Cruces" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":34.808 ,"LONGITUDE":-107.091 ,"NAME":"Spring (Salt)" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":35.54 ,"LONGITUDE":-106.854 ,"NAME":"San Ysidro Hot Springs" ,"AREA":"Albuquerque" ,"TYPE":"Hotspring" ,"FARENHEIT":85 ,"CELSIUS":29 }
,{"LATITUDE":36.368 ,"LONGITUDE":-106.059 ,"NAME":"Statue Spring" ,"AREA":"Aztec" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":34.833 ,"LONGITUDE":-107.091 ,"NAME":"Laguna Pueblo Seeps" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":33.572 ,"LONGITUDE":-107.593 ,"NAME":"Ojo Caliente" ,"AREA":"Tularosa" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":34.854 ,"LONGITUDE":-107.088 ,"NAME":"Laguna Pueblo Springs" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":32.843 ,"LONGITUDE":-108.512 ,"NAME":"Mangas Springs" ,"AREA":"Silver City" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":34.769 ,"LONGITUDE":-107.085 ,"NAME":"Spring (Salt)" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":34.032 ,"LONGITUDE":-106.777 ,"NAME":"Ojo De Las Canas" ,"AREA":"Socorro" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":40.972 ,"LONGITUDE":-119.007 ,"NAME":"Black Rock Hot Spring" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":38.899 ,"LONGITUDE":-119.41 ,"NAME":"Nevada (Hinds) Hot Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":38.922 ,"LONGITUDE":-118.198 ,"NAME":"Wedell Hot Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":41.183 ,"LONGITUDE":-114.991 ,"NAME":"Hot Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":38.437 ,"LONGITUDE":-116.277 ,"NAME":"Hot Creek Valley Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":41.788 ,"LONGITUDE":-114.735 ,"NAME":"Mineral Hot Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":37.825 ,"LONGITUDE":-117.337 ,"NAME":"Alkali Hot Spring" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":41.412 ,"LONGITUDE":-114.675 ,"NAME":"Wine Cup Ranch Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":40.404 ,"LONGITUDE":-116.517 ,"NAME":"Crescent Valley Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":40.417 ,"LONGITUDE":-116.507 ,"NAME":"Crescent Valley Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":40.603 ,"LONGITUDE":-116.463 ,"NAME":"Horseshoe Ranch Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":41.378 ,"LONGITUDE":-119.182 ,"NAME":"Springs (Hot)" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":39.883 ,"LONGITUDE":-114.893 ,"NAME":"Cherry Creek Hot Springs" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":40.922 ,"LONGITUDE":-117.108 ,"NAME":"Hot Pot (Blossom Hot Springs)" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":41.721 ,"LONGITUDE":-118.505 ,"NAME":"Howard Hot Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":41.421 ,"LONGITUDE":-117.388 ,"NAME":"The Hot Springs" ,"AREA":"Mcdermitt" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":40.418 ,"LONGITUDE":-117.415 ,"NAME":"Buffalo Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":39.031 ,"LONGITUDE":-116.666 ,"NAME":"Dianas Punch Bowl" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":39.404 ,"LONGITUDE":-116.347 ,"NAME":"Klobe (Bartholomae) Hot Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":36.975 ,"LONGITUDE":-116.721 ,"NAME":"Hicks Hot Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":40.178 ,"LONGITUDE":-117.496 ,"NAME":"Home Station Ranch Hot Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":39.797 ,"LONGITUDE":-118.067 ,"NAME":"Dixie Hot Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":39.904 ,"LONGITUDE":-116.588 ,"NAME":"Walti Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":38.981 ,"LONGITUDE":-119.833 ,"NAME":"Walleys Hot Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":160 ,"CELSIUS":71 }
,{"LATITUDE":38.464 ,"LONGITUDE":-115.792 ,"NAME":"Chimney Warm Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":160 ,"CELSIUS":71 }
,{"LATITUDE":39.328 ,"LONGITUDE":-116.858 ,"NAME":"Spencer Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":41.108 ,"LONGITUDE":-117.578 ,"NAME":"Hot Springs" ,"AREA":"Mcdermitt" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":36.002 ,"LONGITUDE":-114.742 ,"NAME":"Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":145 ,"CELSIUS":63 }
,{"LATITUDE":41.576 ,"LONGITUDE":-115.181 ,"NAME":"Hot Creek Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":40.954 ,"LONGITUDE":-117.488 ,"NAME":"Golconda Hot Spring (South)" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":151 ,"CELSIUS":66 }
,{"LATITUDE":40.22 ,"LONGITUDE":-116.068 ,"NAME":"Bruffeys Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":40.249 ,"LONGITUDE":-115.409 ,"NAME":"Smith Ranch Springs" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":149 ,"CELSIUS":65 }
,{"LATITUDE":41.867 ,"LONGITUDE":-114.692 ,"NAME":"San Jacinto Ranch Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":148 ,"CELSIUS":64 }
,{"LATITUDE":40.765 ,"LONGITUDE":-116.04 ,"NAME":"Hot Sulphur Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":147 ,"CELSIUS":64 }
,{"LATITUDE":38.188 ,"LONGITUDE":-116.373 ,"NAME":"Warm Springs" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":145 ,"CELSIUS":63 }
,{"LATITUDE":41.567 ,"LONGITUDE":-118.564 ,"NAME":"Dyke Hot Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":38.365 ,"LONGITUDE":-115.867 ,"NAME":"Abel Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":41.929 ,"LONGITUDE":-114.071 ,"NAME":"Nile Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":39.193 ,"LONGITUDE":-119.752 ,"NAME":"Carson Hot Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":39.512 ,"LONGITUDE":-119.907 ,"NAME":"Lawton Hot Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":39.944 ,"LONGITUDE":-119.509 ,"NAME":"Anaho Island Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":37.761 ,"LONGITUDE":-117.632 ,"NAME":"Silverpeak Hot Spring" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":37.621 ,"LONGITUDE":-114.51 ,"NAME":"Caliente Hot Springs" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":39.058 ,"LONGITUDE":-119.742 ,"NAME":"Saratoga Hot Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":39.308 ,"LONGITUDE":-117.552 ,"NAME":"Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":40.673 ,"LONGITUDE":-116.838 ,"NAME":"Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":39.08 ,"LONGITUDE":-116.639 ,"NAME":"Potts Ranch Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":38.388 ,"LONGITUDE":-115.866 ,"NAME":"Coyote Hole Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":41.753 ,"LONGITUDE":-118.841 ,"NAME":"Warm Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":44 }
,{"LATITUDE":41.386 ,"LONGITUDE":-114.165 ,"NAME":"Spring (Hot)" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":40.961 ,"LONGITUDE":-117.494 ,"NAME":"Golconda Hot Spring (North)" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":165 ,"CELSIUS":74 }
,{"LATITUDE":40.313 ,"LONGITUDE":-117.07 ,"NAME":"Mound Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":40.585 ,"LONGITUDE":-115.285 ,"NAME":"Sulphur Hot Springs" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":39.059 ,"LONGITUDE":-119.815 ,"NAME":"Hobo Hot Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":114 ,"CELSIUS":46 }
,{"LATITUDE":40.191 ,"LONGITUDE":-117.107 ,"NAME":"Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":40.819 ,"LONGITUDE":-115.777 ,"NAME":"Hot Hole" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":39.286 ,"LONGITUDE":-119.84 ,"NAME":"Bowers Mansion Hot Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":41.809 ,"LONGITUDE":-118.861 ,"NAME":"Painted Hills Mine" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":41.925 ,"LONGITUDE":-118.805 ,"NAME":"Bog Hot Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":41.647 ,"LONGITUDE":-115.775 ,"NAME":"Wild Horse Hot Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":40.183 ,"LONGITUDE":-117.102 ,"NAME":"Hot Springs Ranch" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":40.08 ,"LONGITUDE":-117.604 ,"NAME":"Mccoy Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":41.353 ,"LONGITUDE":-119.216 ,"NAME":"Spring (Hot)" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":41.357 ,"LONGITUDE":-119.188 ,"NAME":"Springs (Hot)" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":40.198 ,"LONGITUDE":-117.103 ,"NAME":"Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":39.42 ,"LONGITUDE":-119.738 ,"NAME":"Dimonte Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":38.952 ,"LONGITUDE":-115.23 ,"NAME":"Williams Hot Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":41.261 ,"LONGITUDE":-115.305 ,"NAME":"Hot Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":39.041 ,"LONGITUDE":-116.663 ,"NAME":"Hot Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":41.365 ,"LONGITUDE":-119.221 ,"NAME":"Spring (Hot)" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":41.159 ,"LONGITUDE":-114.986 ,"NAME":"Threemile Spring, Sulphur Hot Spr" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":41.339 ,"LONGITUDE":-119.192 ,"NAME":"Springs (Hot)" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":39.893 ,"LONGITUDE":-116.649 ,"NAME":"Little Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.787 ,"LONGITUDE":-119.011 ,"NAME":"Bradys Hot Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":209 ,"CELSIUS":98 }
,{"LATITUDE":41.175 ,"LONGITUDE":-115.278 ,"NAME":"Hot Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.145 ,"LONGITUDE":-114.994 ,"NAME":"Hot Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.864 ,"LONGITUDE":-117.349 ,"NAME":"Sulphur Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.733 ,"LONGITUDE":-119.039 ,"NAME":"Eagle Salt Works Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.281 ,"LONGITUDE":-118.42 ,"NAME":"Sand Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":38.81 ,"LONGITUDE":-116.397 ,"NAME":"Fish Springs" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.559 ,"LONGITUDE":-117.427 ,"NAME":"Petersons Mill Hot Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":38.339 ,"LONGITUDE":-116.662 ,"NAME":"Warm Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":38.859 ,"LONGITUDE":-119.175 ,"NAME":"Hot Spring" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.995 ,"LONGITUDE":-117.854 ,"NAME":"Senator Fumaroles" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.565 ,"LONGITUDE":-118.856 ,"NAME":"(Soda Lake Area)" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":210 ,"CELSIUS":99 }
,{"LATITUDE":40.141 ,"LONGITUDE":-119.687 ,"NAME":"The Needle Rocks Hot Springs" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":208 ,"CELSIUS":98 }
,{"LATITUDE":40.146 ,"LONGITUDE":-119.673 ,"NAME":"The Needle Rocks Hot Spring" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":208 ,"CELSIUS":98 }
,{"LATITUDE":40.662 ,"LONGITUDE":-119.365 ,"NAME":"Great Boiling Spring (Gerlach)" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":208 ,"CELSIUS":98 }
,{"LATITUDE":39.388 ,"LONGITUDE":-119.743 ,"NAME":"Steamboat Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":39.866 ,"LONGITUDE":-118.017 ,"NAME":"Dixie Comstock Mine" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.746 ,"LONGITUDE":-116.689 ,"NAME":"White House Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.98 ,"LONGITUDE":-119.502 ,"NAME":"Pyramid Island Hot Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.934 ,"LONGITUDE":-118.808 ,"NAME":"Warm Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.385 ,"LONGITUDE":-116.058 ,"NAME":"Petaini Springs" ,"AREA":"Mcdermitt" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.064 ,"LONGITUDE":-115.389 ,"NAME":"Warm Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.066 ,"LONGITUDE":-114.99 ,"NAME":"Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.355 ,"LONGITUDE":-114.133 ,"NAME":"Warm Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":41.148 ,"LONGITUDE":-116.733 ,"NAME":"Hot Lake" ,"AREA":"Mcdermitt" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.684 ,"LONGITUDE":-116.153 ,"NAME":"Ellison Ranch Warm Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.604 ,"LONGITUDE":-117.648 ,"NAME":"Leach Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":207 ,"CELSIUS":97 }
,{"LATITUDE":40.751 ,"LONGITUDE":-115.035 ,"NAME":"Warm Springs" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.782 ,"LONGITUDE":-115.363 ,"NAME":"Warm Spring" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.529 ,"LONGITUDE":-116.388 ,"NAME":"Warm Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.072 ,"LONGITUDE":-115.635 ,"NAME":"Big Blue Spring" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":38.95 ,"LONGITUDE":-119.388 ,"NAME":"Spring" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":38.965 ,"LONGITUDE":-118.689 ,"NAME":"Double Spring" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":38.458 ,"LONGITUDE":-117.303 ,"NAME":"Indian Springs" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":40.592 ,"LONGITUDE":-116.157 ,"NAME":"Raine Ranch Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":39.941 ,"LONGITUDE":-116.681 ,"NAME":"Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":40.567 ,"LONGITUDE":-116.588 ,"NAME":"Beowawe Hot Springs (The Geysers)" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":208 ,"CELSIUS":98 }
,{"LATITUDE":40.761 ,"LONGITUDE":-117.492 ,"NAME":"Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":40.653 ,"LONGITUDE":-119.378 ,"NAME":"Mud Springs" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":184 ,"CELSIUS":84 }
,{"LATITUDE":38.768 ,"LONGITUDE":-119.174 ,"NAME":"Wilson Hot Spring" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":183 ,"CELSIUS":84 }
,{"LATITUDE":41.921 ,"LONGITUDE":-118.709 ,"NAME":"Baltazor Hot Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":181 ,"CELSIUS":83 }
,{"LATITUDE":40.857 ,"LONGITUDE":-119.328 ,"NAME":"Fly Ranch (Wards) Hot Springs" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":39.597 ,"LONGITUDE":-119.11 ,"NAME":"Patua Hot Springs (Fernley)" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":39.028 ,"LONGITUDE":-117.136 ,"NAME":"Mcleod Ranch Hot Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":40.316 ,"LONGITUDE":-116.433 ,"NAME":"Hot Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":186 ,"CELSIUS":86 }
,{"LATITUDE":38.521 ,"LONGITUDE":-116.365 ,"NAME":"Hot Creek Ranch Hot Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":41.051 ,"LONGITUDE":-119.028 ,"NAME":"Double Hot Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":178 ,"CELSIUS":81 }
,{"LATITUDE":40.003 ,"LONGITUDE":-117.718 ,"NAME":"Hyder Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":176 ,"CELSIUS":80 }
,{"LATITUDE":39.665 ,"LONGITUDE":-114.807 ,"NAME":"Monte Neva Hot Springs" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":176 ,"CELSIUS":80 }
,{"LATITUDE":40.368 ,"LONGITUDE":-117.327 ,"NAME":"Buffalo Valley Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":174 ,"CELSIUS":79 }
,{"LATITUDE":40.699 ,"LONGITUDE":-116.133 ,"NAME":"Hot Springs (Carlin)" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":174 ,"CELSIUS":79 }
,{"LATITUDE":41.052 ,"LONGITUDE":-118.717 ,"NAME":"Macfarlane Hot Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":170 ,"CELSIUS":77 }
,{"LATITUDE":39.342 ,"LONGITUDE":-118.578 ,"NAME":"Borax Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":39.484 ,"LONGITUDE":-119.804 ,"NAME":"Moana Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":41.243 ,"LONGITUDE":-114.947 ,"NAME":"Twelvemile Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":39.38 ,"LONGITUDE":-119.74 ,"NAME":"Steamboat Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":39.558 ,"LONGITUDE":-116.36 ,"NAME":"Bartine Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":39.954 ,"LONGITUDE":-117.917 ,"NAME":"Fumaroles" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":204 ,"CELSIUS":96 }
,{"LATITUDE":40.389 ,"LONGITUDE":-119.402 ,"NAME":"Hot Seeps (San Emidio Desert)" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":38.822 ,"LONGITUDE":-117.183 ,"NAME":"Darroughs Hot Springs" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":40.088 ,"LONGITUDE":-117.725 ,"NAME":"Sou (Seven Devils) Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":41.363 ,"LONGITUDE":-118.788 ,"NAME":"Pinto Hot Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":40.408 ,"LONGITUDE":-117.883 ,"NAME":"Kyle Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":171 ,"CELSIUS":77 }
,{"LATITUDE":41.357 ,"LONGITUDE":-118.809 ,"NAME":"West Pinto Hot Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":39.316 ,"LONGITUDE":-117.549 ,"NAME":"Hot Springs" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":41.468 ,"LONGITUDE":-116.15 ,"NAME":"Hot Sulphur Springs (Tuscarora)" ,"AREA":"Mcdermitt" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":90 }
,{"LATITUDE":40.813 ,"LONGITUDE":-115.778 ,"NAME":"Elko Hot Spring" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":39.208 ,"LONGITUDE":-118.723 ,"NAME":"Lee Hot Springs, Allen Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":40.262 ,"LONGITUDE":-119.379 ,"NAME":"Boiling Springs" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":40.77 ,"LONGITUDE":-119.113 ,"NAME":"Butte Springs (Trego Hot Springs)" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":39.161 ,"LONGITUDE":-119.183 ,"NAME":"Wabuska Hot Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":39.814 ,"LONGITUDE":-115.612 ,"NAME":"Giocoecha Warm Springs" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":36.389 ,"LONGITUDE":-114.433 ,"NAME":"Blue Point Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":37.016 ,"LONGITUDE":-117.211 ,"NAME":"Seep" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":37.751 ,"LONGITUDE":-116.274 ,"NAME":"Cedar Spring" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":37.896 ,"LONGITUDE":-114.227 ,"NAME":"Flatnose Ranch Spring" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":36.207 ,"LONGITUDE":-115.983 ,"NAME":"Pahrump (Bennetts) Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":41.775 ,"LONGITUDE":-115.921 ,"NAME":"Rizzi Ranch Hot Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":35.944 ,"LONGITUDE":-114.731 ,"NAME":"Hot Spring" ,"AREA":"Kingman" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":41.884 ,"LONGITUDE":-114.117 ,"NAME":"Gambles Hole" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":36.565 ,"LONGITUDE":-115.671 ,"NAME":"Indian Springs" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":39.547 ,"LONGITUDE":-114.915 ,"NAME":"Campbell Ranch Springs" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":38.423 ,"LONGITUDE":-115.022 ,"NAME":"Flag Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":38.44 ,"LONGITUDE":-115.011 ,"NAME":"Butterfield Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.997 ,"LONGITUDE":-118.039 ,"NAME":"Fish Spring" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.029 ,"LONGITUDE":-116.719 ,"NAME":"Springs" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":36.426 ,"LONGITUDE":-116.411 ,"NAME":"Ash Tree Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":36.033 ,"LONGITUDE":-115.888 ,"NAME":"Browns Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":41.322 ,"LONGITUDE":-119.206 ,"NAME":"Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":41.706 ,"LONGITUDE":-118.261 ,"NAME":"Ninemile Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":35.964 ,"LONGITUDE":-114.743 ,"NAME":"Hot Spring" ,"AREA":"Kingman" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":41.763 ,"LONGITUDE":-118.279 ,"NAME":"Fivemile Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":39.457 ,"LONGITUDE":-119.722 ,"NAME":"Huffaker Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":38.992 ,"LONGITUDE":-117.042 ,"NAME":"Charnock (Big Blue) Springs" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":36.402 ,"LONGITUDE":-116.302 ,"NAME":"Davis Ranch Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":36.45 ,"LONGITUDE":-116.313 ,"NAME":"Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":39.792 ,"LONGITUDE":-114.692 ,"NAME":"Lower Shellbourne Spring" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":41.338 ,"LONGITUDE":-119.168 ,"NAME":"Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":41.022 ,"LONGITUDE":-119.275 ,"NAME":"Caine Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.05 ,"LONGITUDE":-117.1 ,"NAME":"Hot Springs Ranch Springs" ,"AREA":"Mcdermitt" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":40.079 ,"LONGITUDE":-116.035 ,"NAME":"Flynn Ranch Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":40.325 ,"LONGITUDE":-116.058 ,"NAME":"Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":36.414 ,"LONGITUDE":-116.292 ,"NAME":"Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":36.173 ,"LONGITUDE":-115.191 ,"NAME":"Las Vegas Springs" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":36.174 ,"LONGITUDE":-115.479 ,"NAME":"White Rock Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":36.565 ,"LONGITUDE":-115.623 ,"NAME":"Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":36.491 ,"LONGITUDE":-116.342 ,"NAME":"Fairbanks Spring, Soda Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":38.654 ,"LONGITUDE":-114.633 ,"NAME":"Geyser Ranch Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":36.363 ,"LONGITUDE":-116.271 ,"NAME":"Bole Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":36.999 ,"LONGITUDE":-116.706 ,"NAME":"Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":36.942 ,"LONGITUDE":-115.425 ,"NAME":"Ash Creek Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.796 ,"LONGITUDE":-119.65 ,"NAME":"Doud Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":38.622 ,"LONGITUDE":-115.047 ,"NAME":"Emigrant Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":38.927 ,"LONGITUDE":-115.082 ,"NAME":"Preston Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":36.147 ,"LONGITUDE":-115.893 ,"NAME":"Manse Ranch Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":38.645 ,"LONGITUDE":-114.632 ,"NAME":"Geyser Ranch Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":38.574 ,"LONGITUDE":-115.522 ,"NAME":"Tom Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.671 ,"LONGITUDE":-114.628 ,"NAME":"Geyser Ranch Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":37.783 ,"LONGITUDE":-114.528 ,"NAME":"Bennett Springs" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":37.86 ,"LONGITUDE":-114.321 ,"NAME":"Delmues Springs" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":36.408 ,"LONGITUDE":-116.313 ,"NAME":"Davis Ranch Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":36.567 ,"LONGITUDE":-114.446 ,"NAME":"Seep" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":41.369 ,"LONGITUDE":-114.187 ,"NAME":"Gamble Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":69 ,"CELSIUS":20 }
,{"LATITUDE":39.901 ,"LONGITUDE":-115.868 ,"NAME":"Thompson Ranch Spring" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":38.633 ,"LONGITUDE":-114.638 ,"NAME":"Wambolt Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":37.906 ,"LONGITUDE":-118.171 ,"NAME":"Sand Spring" ,"AREA":"Mariposa" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":23 }
,{"LATITUDE":36.486 ,"LONGITUDE":-114.329 ,"NAME":"Springs" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":41.354 ,"LONGITUDE":-119.116 ,"NAME":"Mustang Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.746 ,"LONGITUDE":-119.791 ,"NAME":"Warm Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.258 ,"LONGITUDE":-118.937 ,"NAME":"Cane Springs" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":23 }
,{"LATITUDE":40.103 ,"LONGITUDE":-119.884 ,"NAME":"Fish Springs" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":39.853 ,"LONGITUDE":-119.719 ,"NAME":"Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":39.832 ,"LONGITUDE":-116.069 ,"NAME":"Sulphur Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":23 }
,{"LATITUDE":36.363 ,"LONGITUDE":-116.263 ,"NAME":"Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.554 ,"LONGITUDE":-115.531 ,"NAME":"Kate Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":37.074 ,"LONGITUDE":-116.691 ,"NAME":"Spring" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":37.979 ,"LONGITUDE":-117.993 ,"NAME":"Gap Spring" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.591 ,"LONGITUDE":-119.862 ,"NAME":"Twin (Vya) Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":71 ,"CELSIUS":22 }
,{"LATITUDE":40.763 ,"LONGITUDE":-119.172 ,"NAME":"Coyote Spring" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":40.127 ,"LONGITUDE":-116.884 ,"NAME":"Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":40.187 ,"LONGITUDE":-116.805 ,"NAME":"Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":40.967 ,"LONGITUDE":-114.515 ,"NAME":"Johnson Ranch Springs" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":36.205 ,"LONGITUDE":-115.141 ,"NAME":"Kyle Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":39.8 ,"LONGITUDE":-114.653 ,"NAME":"Upper Shellbourne Spring" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":23 }
,{"LATITUDE":36.428 ,"LONGITUDE":-116.303 ,"NAME":"Button Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":38.383 ,"LONGITUDE":-115.153 ,"NAME":"Hot Creek Ranch Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":39.283 ,"LONGITUDE":-114.866 ,"NAME":"Lackawanna Hot Springs" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":38.532 ,"LONGITUDE":-116.465 ,"NAME":"Upper Warm Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":38.823 ,"LONGITUDE":-116.717 ,"NAME":"South Mosquito Creek Ranch Springs" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":40.829 ,"LONGITUDE":-117.306 ,"NAME":"Brooks Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":40.992 ,"LONGITUDE":-117.763 ,"NAME":"Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":41.971 ,"LONGITUDE":-114.574 ,"NAME":"Warm Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":38.95 ,"LONGITUDE":-115.7 ,"NAME":"Big Warm Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":37.463 ,"LONGITUDE":-115.192 ,"NAME":"Ash Springs" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":36.464 ,"LONGITUDE":-116.319 ,"NAME":"Parent Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":38.352 ,"LONGITUDE":-115.181 ,"NAME":"Moon River Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":36.402 ,"LONGITUDE":-116.274 ,"NAME":"Point of Rocks Springs, King Sprin" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":36.421 ,"LONGITUDE":-116.322 ,"NAME":"Crystal Pool" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":36.425 ,"LONGITUDE":-116.291 ,"NAME":"Devils Hole" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":39.068 ,"LONGITUDE":-119.786 ,"NAME":"Springs" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":38.954 ,"LONGITUDE":-117.049 ,"NAME":"Big Blue (A) Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":40.087 ,"LONGITUDE":-114.647 ,"NAME":"Collar And Elbow Spring" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":36.378 ,"LONGITUDE":-114.443 ,"NAME":"Rogers Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":39.943 ,"LONGITUDE":-116.073 ,"NAME":"Shipley Hot Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":38.698 ,"LONGITUDE":-116.435 ,"NAME":"Upper Warm Spring, Warm Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":41.53 ,"LONGITUDE":-118.57 ,"NAME":"Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":41.877 ,"LONGITUDE":-115.628 ,"NAME":"Rowland Hot Springs" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":40.035 ,"LONGITUDE":-117.604 ,"NAME":"Lower Ranch Hot Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":40.187 ,"LONGITUDE":-116.79 ,"NAME":"Chillis Hot Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":39.988 ,"LONGITUDE":-116.044 ,"NAME":"Siri Ranch Spring" ,"AREA":"Millett" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":39.421 ,"LONGITUDE":-119.758 ,"NAME":"Zolezzi Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":38.531 ,"LONGITUDE":-116.405 ,"NAME":"Old Dugan Ranch Hot Springs" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":36.968 ,"LONGITUDE":-116.723 ,"NAME":"Burrell Hot Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":38.343 ,"LONGITUDE":-118.103 ,"NAME":"Soda Springs" ,"AREA":"Walker Lake" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":38.556 ,"LONGITUDE":-115.767 ,"NAME":"Lockes Big Spring, Hay Corral Spr" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":38.594 ,"LONGITUDE":-115.138 ,"NAME":"Moorman Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":38.398 ,"LONGITUDE":-115.862 ,"NAME":"Storm Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":41.19 ,"LONGITUDE":-115.287 ,"NAME":"Hot Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":37.822 ,"LONGITUDE":-117.48 ,"NAME":"Pearl Hot Springs" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":39.159 ,"LONGITUDE":-119.737 ,"NAME":"Nevada State Prison Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":40.025 ,"LONGITUDE":-117.646 ,"NAME":"Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":40.83 ,"LONGITUDE":-119.538 ,"NAME":"Springs" ,"AREA":"Lovelock" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":39.442 ,"LONGITUDE":-119.743 ,"NAME":"Double Diamond Spring" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":39.413 ,"LONGITUDE":-114.779 ,"NAME":"Mcgill Spring" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":39.458 ,"LONGITUDE":-114.756 ,"NAME":"Schoolhouse Spring" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":36.375 ,"LONGITUDE":-116.274 ,"NAME":"Big (Ash Meadows) Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":38.292 ,"LONGITUDE":-114.272 ,"NAME":"Hammond Ranch Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":41.398 ,"LONGITUDE":-119.165 ,"NAME":"Spring" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":41.732 ,"LONGITUDE":-119.785 ,"NAME":"Seeps (Hills Warm Spring)" ,"AREA":"Vya" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":38.563 ,"LONGITUDE":-115.528 ,"NAME":"Blue Eagle Springs" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":40.873 ,"LONGITUDE":-117.937 ,"NAME":"Rose Creek Spring" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":39.917 ,"LONGITUDE":-114.667 ,"NAME":"Spring" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":36.39 ,"LONGITUDE":-116.278 ,"NAME":"Jack Rabbit Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":36.437 ,"LONGITUDE":-116.206 ,"NAME":"Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":38.937 ,"LONGITUDE":-115.695 ,"NAME":"Little Warm Spring" ,"AREA":"Lund" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":36.479 ,"LONGITUDE":-116.326 ,"NAME":"Rogers Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":40.29 ,"LONGITUDE":-116.049 ,"NAME":"Carlotti Ranch Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":36.468 ,"LONGITUDE":-116.325 ,"NAME":"Longstreet Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":36.722 ,"LONGITUDE":-114.716 ,"NAME":"Muddy Spring" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":37.532 ,"LONGITUDE":-115.233 ,"NAME":"Crystal Springs" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":37.598 ,"LONGITUDE":-115.215 ,"NAME":"Hiko Spring" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":36.404 ,"LONGITUDE":-116.383 ,"NAME":"Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":37.996 ,"LONGITUDE":-116.389 ,"NAME":"Reveille Mill Spring" ,"AREA":"Goldfield" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":36.71 ,"LONGITUDE":-114.714 ,"NAME":"Moapa Warm Springs" ,"AREA":"Las Vegas" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":35.982 ,"LONGITUDE":-114.748 ,"NAME":"Hot Springs" ,"AREA":"Kingman" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":40.929 ,"LONGITUDE":-116.895 ,"NAME":"Izzenhood Ranch Springs" ,"AREA":"Winnemucca" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":37.807 ,"LONGITUDE":-114.38 ,"NAME":"Panaca Spring" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":36.942 ,"LONGITUDE":-116.729 ,"NAME":"Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":41.98 ,"LONGITUDE":-114.376 ,"NAME":"Hot Spring" ,"AREA":"Wells" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":36.433 ,"LONGITUDE":-116.308 ,"NAME":"Scruggs Springs" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":40.952 ,"LONGITUDE":-114.751 ,"NAME":"Ralphs Warm Springs" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":39.526 ,"LONGITUDE":-118.876 ,"NAME":"Soda Lake" ,"AREA":"Reno" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":38.027 ,"LONGITUDE":-116.683 ,"NAME":"Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":37.741 ,"LONGITUDE":-115.753 ,"NAME":"Sand Spring" ,"AREA":"Caliente" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":36.918 ,"LONGITUDE":-116.744 ,"NAME":"Beatty Municipal Spring" ,"AREA":"Death Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":38.255 ,"LONGITUDE":-116.829 ,"NAME":"Saulsbury Warm Spring" ,"AREA":"Tonopah" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":42.48 ,"LONGITUDE":-73.37 ,"NAME":"Lebanon Spring" ,"AREA":"Albany" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":44.241 ,"LONGITUDE":-122.058 ,"NAME":"Bigelow Hot Springs" ,"AREA":"Salem" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":44.862 ,"LONGITUDE":-121.201 ,"NAME":"Kahneeta Hot Springs" ,"AREA":"Bend" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":44.927 ,"LONGITUDE":-117.939 ,"NAME":"Radium Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":44.354 ,"LONGITUDE":-118.574 ,"NAME":"Blue Mountain Hot Springs" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.936 ,"LONGITUDE":-122.173 ,"NAME":"Bagby Hot Springs" ,"AREA":"Salem" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":43.944 ,"LONGITUDE":-118.136 ,"NAME":"Beulah Hot Springs" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":43.763 ,"LONGITUDE":-117.156 ,"NAME":"Mitchell Butte Hot Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":42.116 ,"LONGITUDE":-121.287 ,"NAME":"Oregon Hot Springs (Big Hot Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":45.151 ,"LONGITUDE":-118.659 ,"NAME":"Lehman Springs" ,"AREA":"Pendleton" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":43.719 ,"LONGITUDE":-121.209 ,"NAME":"East Lake Hot Springs" ,"AREA":"Crescent" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":43.469 ,"LONGITUDE":-118.202 ,"NAME":"Luce Hot Springs" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":145 ,"CELSIUS":63 }
,{"LATITUDE":45.018 ,"LONGITUDE":-117.625 ,"NAME":"Medical Hot Springs" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":44.867 ,"LONGITUDE":-121.228 ,"NAME":"Springs" ,"AREA":"Bend" ,"TYPE":"Hotspring" ,"FARENHEIT":125 ,"CELSIUS":52 }
,{"LATITUDE":42.188 ,"LONGITUDE":-118.383 ,"NAME":"Flagstaff Butte Hot Spring" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":126 ,"CELSIUS":52 }
,{"LATITUDE":44.451 ,"LONGITUDE":-119.105 ,"NAME":"Mount Vernon Hot Springs" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":121 ,"CELSIUS":49 }
,{"LATITUDE":42.977 ,"LONGITUDE":-117.061 ,"NAME":"Canters Hot Spring" ,"AREA":"Jordan Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":43.294 ,"LONGITUDE":-122.367 ,"NAME":"Umpqua Hot Springs" ,"AREA":"Roseburg" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":44.002 ,"LONGITUDE":-119.647 ,"NAME":"Weberg Hot Spring" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":43.739 ,"LONGITUDE":-117.178 ,"NAME":"Deer Butte Hot Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":43.795 ,"LONGITUDE":-117.958 ,"NAME":"Jonesboro Warm Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":45 }
,{"LATITUDE":42.075 ,"LONGITUDE":-119.927 ,"NAME":"Hallinan Spring" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":42.297 ,"LONGITUDE":-119.776 ,"NAME":"Fisher Hot Springs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":45.013 ,"LONGITUDE":-117.885 ,"NAME":"Kropp Hot Spring" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":42.221 ,"LONGITUDE":-120.368 ,"NAME":"Hunters Hot Springs" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":44.083 ,"LONGITUDE":-122.233 ,"NAME":"Cougar Reservoir Hot Springs" ,"AREA":"Salem" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":44.023 ,"LONGITUDE":-117.46 ,"NAME":"Neal Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":189 ,"CELSIUS":87 }
,{"LATITUDE":42.431 ,"LONGITUDE":-121.963 ,"NAME":"Eagle Point Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":43.689 ,"LONGITUDE":-122.372 ,"NAME":"Kitson Hot Springs" ,"AREA":"Roseburg" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":44.813 ,"LONGITUDE":-117.765 ,"NAME":"Spring (Hot)" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.776 ,"LONGITUDE":-118.047 ,"NAME":"Warm Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.793 ,"LONGITUDE":-118.472 ,"NAME":"Sitz Warm Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.86 ,"LONGITUDE":-118.288 ,"NAME":"Altnow Hot Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":43.893 ,"LONGITUDE":-117.596 ,"NAME":"Springs" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":45.206 ,"LONGITUDE":-117.912 ,"NAME":"Union Station Hot Springs" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.208 ,"LONGITUDE":-117.455 ,"NAME":"Jamieson Hot Springs" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":42.338 ,"LONGITUDE":-118.602 ,"NAME":"Hot Springs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":207 ,"CELSIUS":97 }
,{"LATITUDE":44.782 ,"LONGITUDE":-121.975 ,"NAME":"Breitenbush Hot Springs" ,"AREA":"Bend" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":42.219 ,"LONGITUDE":-119.877 ,"NAME":"Warner Valley Ranch" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":42.156 ,"LONGITUDE":-120.345 ,"NAME":"Barry Ranch Hot Springs" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":44.193 ,"LONGITUDE":-122.049 ,"NAME":"Belknap Springs" ,"AREA":"Salem" ,"TYPE":"Hotspring" ,"FARENHEIT":160 ,"CELSIUS":71 }
,{"LATITUDE":45.021 ,"LONGITUDE":-122.009 ,"NAME":"Austin Hot Springs" ,"AREA":"Vancouver" ,"TYPE":"Hotspring" ,"FARENHEIT":186 ,"CELSIUS":86 }
,{"LATITUDE":42.676 ,"LONGITUDE":-118.344 ,"NAME":"Mickey Springs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":44.153 ,"LONGITUDE":-122.098 ,"NAME":"Foley Springs" ,"AREA":"Salem" ,"TYPE":"Hotspring" ,"FARENHEIT":178 ,"CELSIUS":81 }
,{"LATITUDE":45.244 ,"LONGITUDE":-117.958 ,"NAME":"Hot Lake Springs" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":176 ,"CELSIUS":80 }
,{"LATITUDE":42.544 ,"LONGITUDE":-118.533 ,"NAME":"Alvord Hot Springs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":174 ,"CELSIUS":79 }
,{"LATITUDE":43.441 ,"LONGITUDE":-118.638 ,"NAME":"Crane Hot Springs" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":172 ,"CELSIUS":78 }
,{"LATITUDE":42.226 ,"LONGITUDE":-119.881 ,"NAME":"Crump Geyser (Crump Spring)" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":172 ,"CELSIUS":78 }
,{"LATITUDE":43.727 ,"LONGITUDE":-117.203 ,"NAME":"Snively Hot Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":170 ,"CELSIUS":77 }
,{"LATITUDE":42.174 ,"LONGITUDE":-121.615 ,"NAME":"Olene Gap Hot Springs" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":165 ,"CELSIUS":74 }
,{"LATITUDE":43.708 ,"LONGITUDE":-122.288 ,"NAME":"Mccredie Springs" ,"AREA":"Roseburg" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":43.982 ,"LONGITUDE":-117.233 ,"NAME":"Vale Hot Springs" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":42.162 ,"LONGITUDE":-120.344 ,"NAME":"Leithead Hot Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":45.372 ,"LONGITUDE":-121.697 ,"NAME":"Mount Hood Fumaroles" ,"AREA":"The Dalles" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":90 }
,{"LATITUDE":43.264 ,"LONGITUDE":-119.015 ,"NAME":"Dunn Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":42.873 ,"LONGITUDE":-122.167 ,"NAME":"Annie Spring" ,"AREA":"Medford" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":42.133 ,"LONGITUDE":-121.219 ,"NAME":"Wilkersons Hot Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":43.272 ,"LONGITUDE":-119.293 ,"NAME":"Basque Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":23 }
,{"LATITUDE":43.276 ,"LONGITUDE":-119.34 ,"NAME":"Double O Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":74 ,"CELSIUS":23 }
,{"LATITUDE":44.073 ,"LONGITUDE":-119.427 ,"NAME":"Brisbois Ranch Springs" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.265 ,"LONGITUDE":-119.276 ,"NAME":"Johnson Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.281 ,"LONGITUDE":-119.311 ,"NAME":"Double O Barnyard Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.501 ,"LONGITUDE":-119.091 ,"NAME":"Roadland Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.529 ,"LONGITUDE":-119.081 ,"NAME":"Goodman Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.703 ,"LONGITUDE":-117.19 ,"NAME":"South Black Willow Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":71 ,"CELSIUS":22 }
,{"LATITUDE":42.307 ,"LONGITUDE":-119.875 ,"NAME":"Moss Ranch Spring" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":43.758 ,"LONGITUDE":-118.067 ,"NAME":"Juntura Warm Spring 1" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":43.732 ,"LONGITUDE":-121.252 ,"NAME":"Paulina Springs" ,"AREA":"Crescent" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":42.176 ,"LONGITUDE":-121.828 ,"NAME":"Howard Holiday" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":43.477 ,"LONGITUDE":-119.075 ,"NAME":"Baker Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":42.178 ,"LONGITUDE":-121.801 ,"NAME":"Hardboard Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":42.325 ,"LONGITUDE":-120.327 ,"NAME":"White Rock Ranch Hot Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":71 ,"CELSIUS":21 }
,{"LATITUDE":43.252 ,"LONGITUDE":-119.258 ,"NAME":"Hughet Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":42.38 ,"LONGITUDE":-120.33 ,"NAME":"Bean Hot Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":69 ,"CELSIUS":20 }
,{"LATITUDE":42.933 ,"LONGITUDE":-120.642 ,"NAME":"Lost Cabin Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":42.998 ,"LONGITUDE":-120.725 ,"NAME":"Buckhorn Creek Springs" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":42.688 ,"LONGITUDE":-117.905 ,"NAME":"Tudors Spring" ,"AREA":"Jordan Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":42.756 ,"LONGITUDE":-117.55 ,"NAME":"Scott Spring" ,"AREA":"Jordan Valley" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":42.725 ,"LONGITUDE":-120.646 ,"NAME":"Summer Lake Hot Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":43.757 ,"LONGITUDE":-118.092 ,"NAME":"Juntura Warm Spring 2" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":44.374 ,"LONGITUDE":-118.738 ,"NAME":"Limekiln Hot Spring" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":42.221 ,"LONGITUDE":-122.742 ,"NAME":"Jackson Hot Springs" ,"AREA":"Medford" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":44.892 ,"LONGITUDE":-119.141 ,"NAME":"Ritter Hot Springs" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":43.808 ,"LONGITUDE":-122.309 ,"NAME":"Wall Creek Warm Springs" ,"AREA":"Roseburg" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":43.395 ,"LONGITUDE":-118.308 ,"NAME":"Springs (Hot)" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":43.302 ,"LONGITUDE":-117.383 ,"NAME":"Hot Spring" ,"AREA":"Boise" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":44.28 ,"LONGITUDE":-118.956 ,"NAME":"Joaquin Miller Hot Springs" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":42.501 ,"LONGITUDE":-119.693 ,"NAME":"Antelope Hot Springs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":45.129 ,"LONGITUDE":-118.738 ,"NAME":"Hidaway Springs" ,"AREA":"Pendleton" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":44.975 ,"LONGITUDE":-118.044 ,"NAME":"Fisher Hot Springs" ,"AREA":"Canyon City" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":44.033 ,"LONGITUDE":-117.449 ,"NAME":"Bully Creek Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":42.93 ,"LONGITUDE":-120.798 ,"NAME":"Pardon Warm Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":76 ,"CELSIUS":24 }
,{"LATITUDE":42.327 ,"LONGITUDE":-118.602 ,"NAME":"Borax Lake (Hot Lake)" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":42.161 ,"LONGITUDE":-121.627 ,"NAME":"Crystal Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":78 ,"CELSIUS":26 }
,{"LATITUDE":45.741 ,"LONGITUDE":-118.233 ,"NAME":"Bingham Springs" ,"AREA":"Pendleton" ,"TYPE":"Hotspring" ,"FARENHEIT":93 ,"CELSIUS":34 }
,{"LATITUDE":42.889 ,"LONGITUDE":-118.898 ,"NAME":"Fivemile Spring (Hoghouse Hot Sprs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":43.54 ,"LONGITUDE":-119.081 ,"NAME":"Millpond Hot Spring" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":45.891 ,"LONGITUDE":-116.873 ,"NAME":"Cook Creek Hot Spring" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":45.295 ,"LONGITUDE":-121.731 ,"NAME":"Swim Warm Springs" ,"AREA":"The Dalles" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":42.04 ,"LONGITUDE":-120.924 ,"NAME":"Warm Spring" ,"AREA":"Klamath Falls" ,"TYPE":"Hotspring" ,"FARENHEIT":92 ,"CELSIUS":33 }
,{"LATITUDE":44.779 ,"LONGITUDE":-117.811 ,"NAME":"Sam O Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":44.538 ,"LONGITUDE":-117.417 ,"NAME":"Nelson Spring" ,"AREA":"Baker" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":45.631 ,"LONGITUDE":-119.703 ,"NAME":"Well Spring" ,"AREA":"Pendleton" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":42.287 ,"LONGITUDE":-119.867 ,"NAME":"Moss Ranch Springs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":45.061 ,"LONGITUDE":-118.455 ,"NAME":"Warm Mineral Spring" ,"AREA":"Pendleton" ,"TYPE":"Hotspring" ,"FARENHEIT":83 ,"CELSIUS":28 }
,{"LATITUDE":43.95 ,"LONGITUDE":-119.634 ,"NAME":"Warm Springs" ,"AREA":"Burns" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":45.295 ,"LONGITUDE":-117.806 ,"NAME":"Warm Spring" ,"AREA":"Grangeville" ,"TYPE":"Hotspring" ,"FARENHEIT":85 ,"CELSIUS":29 }
,{"LATITUDE":42.815 ,"LONGITUDE":-118.899 ,"NAME":"Warm Springs" ,"AREA":"Adel" ,"TYPE":"Hotspring" ,"FARENHEIT":89 ,"CELSIUS":32 }
,{"LATITUDE":43.452 ,"LONGITUDE":-103.508 ,"NAME":"Hot Brook Springs" ,"AREA":"Hot Springs" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":43.442 ,"LONGITUDE":-103.481 ,"NAME":"Hot Springs" ,"AREA":"Hot Springs" ,"TYPE":"Hotspring" ,"FARENHEIT":87 ,"CELSIUS":31 }
,{"LATITUDE":29.178 ,"LONGITUDE":-102.953 ,"NAME":"Rio Grande Village Spring" ,"AREA":"Emory Peak" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":30.823 ,"LONGITUDE":-105.315 ,"NAME":"Indian Hot Springs" ,"AREA":"Marfa" ,"TYPE":"Hotspring" ,"FARENHEIT":117 ,"CELSIUS":47 }
,{"LATITUDE":30.038 ,"LONGITUDE":-104.598 ,"NAME":"Ruidosa Hot Springs" ,"AREA":"Marfa" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":29.182 ,"LONGITUDE":-102.992 ,"NAME":"Hot Springs" ,"AREA":"Emory Peak" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":30.21 ,"LONGITUDE":-104.562 ,"NAME":"Capote Springs" ,"AREA":"Marfa" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":30.133 ,"LONGITUDE":-104.602 ,"NAME":"Nixon Spring" ,"AREA":"Marfa" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":29.787 ,"LONGITUDE":-104.462 ,"NAME":"Springs (Las Cienegas)" ,"AREA":"Presidio" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":30.861 ,"LONGITUDE":-105.34 ,"NAME":"Red Bull Spring" ,"AREA":"Marfa" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":38.85 ,"LONGITUDE":-112.49 ,"NAME":"Hatton Hot Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":40.176 ,"LONGITUDE":-111.801 ,"NAME":"Bird Island" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":41.917 ,"LONGITUDE":-111.958 ,"NAME":"Gancheff Spring" ,"AREA":"Ogden" ,"TYPE":"Hotspring" ,"FARENHEIT":88 ,"CELSIUS":31 }
,{"LATITUDE":37.942 ,"LONGITUDE":-112.438 ,"NAME":"Lefevre" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":37.335 ,"LONGITUDE":-113.687 ,"NAME":"Veyo Hot Spring" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":40.332 ,"LONGITUDE":-111.891 ,"NAME":"Fault Zone Spring" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":40.146 ,"LONGITUDE":-111.806 ,"NAME":"Lincoln Point Warm Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":38.186 ,"LONGITUDE":-112.912 ,"NAME":"Us Blm" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":41.833 ,"LONGITUDE":-112.454 ,"NAME":"Blue Creek Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":40.526 ,"LONGITUDE":-111.488 ,"NAME":"Midway Hot Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":40.525 ,"LONGITUDE":-111.468 ,"NAME":"Midway Hot Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":40.038 ,"LONGITUDE":-111.529 ,"NAME":"Castilla Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":104 ,"CELSIUS":40 }
,{"LATITUDE":38.217 ,"LONGITUDE":-112.904 ,"NAME":"Dotsons (Radium) Warm Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":40.465 ,"LONGITUDE":-109.221 ,"NAME":"Split Mountain Warm Springs" ,"AREA":"Vernal" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":40.788 ,"LONGITUDE":-112.017 ,"NAME":"Hobo Warm Spring" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":40.788 ,"LONGITUDE":-111.899 ,"NAME":"Wasatch Hot Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":39.35 ,"LONGITUDE":-113.515 ,"NAME":"Tule Spring" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":39.424 ,"LONGITUDE":-113.485 ,"NAME":"Coyote Spring" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":39.842 ,"LONGITUDE":-113.392 ,"NAME":"Fish Springs" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":39.887 ,"LONGITUDE":-113.413 ,"NAME":"North Springs" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":82 ,"CELSIUS":28 }
,{"LATITUDE":41.756 ,"LONGITUDE":-113.603 ,"NAME":"Warm Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":41.038 ,"LONGITUDE":-111.656 ,"NAME":"Como Springs" ,"AREA":"Ogden" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":40.397 ,"LONGITUDE":-112.421 ,"NAME":"Morgans Warm Spring" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":80 ,"CELSIUS":27 }
,{"LATITUDE":39.464 ,"LONGITUDE":-114.038 ,"NAME":"Gandy Warm Springs" ,"AREA":"Ely" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":40.447 ,"LONGITUDE":-110.828 ,"NAME":"Warm Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":37.7 ,"LONGITUDE":-110.421 ,"NAME":"Warm Spring" ,"AREA":"Escalante" ,"TYPE":"Hotspring" ,"FARENHEIT":79 ,"CELSIUS":26 }
,{"LATITUDE":40.502 ,"LONGITUDE":-114.038 ,"NAME":"Blue Lake Spring" ,"AREA":"Elko" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":38.503 ,"LONGITUDE":-112.849 ,"NAME":"Roosevelt Hot Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":38.774 ,"LONGITUDE":-112.096 ,"NAME":"Richfield Warm Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":40.488 ,"LONGITUDE":-111.911 ,"NAME":"Crystal Hot Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":38.186 ,"LONGITUDE":-113.197 ,"NAME":"Thermo Hot Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":38.172 ,"LONGITUDE":-113.204 ,"NAME":"Thermo Hot Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":181 ,"CELSIUS":83 }
,{"LATITUDE":39.613 ,"LONGITUDE":-112.729 ,"NAME":"Baker (Abraham, Crater) Hot Spring" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":38.639 ,"LONGITUDE":-112.098 ,"NAME":"Red Hill Hot Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":171 ,"CELSIUS":77 }
,{"LATITUDE":38.633 ,"LONGITUDE":-112.107 ,"NAME":"Monroe (Cooper) Hot Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":169 ,"CELSIUS":76 }
,{"LATITUDE":38.613 ,"LONGITUDE":-112.202 ,"NAME":"Joseph Hot Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":147 ,"CELSIUS":64 }
,{"LATITUDE":39.906 ,"LONGITUDE":-113.43 ,"NAME":"Wilson Health Springs" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":41.138 ,"LONGITUDE":-112.175 ,"NAME":"Hooper Hot Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":41.338 ,"LONGITUDE":-112.031 ,"NAME":"Utah Hot Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":38.864 ,"LONGITUDE":-112.506 ,"NAME":"Meadow Hot Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":40.815 ,"LONGITUDE":-111.918 ,"NAME":"Becks Hot Spring" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":37.189 ,"LONGITUDE":-113.272 ,"NAME":"Dixie (Laverkin) Hot Springs" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":41.659 ,"LONGITUDE":-112.087 ,"NAME":"Crystal (Madsens) Hot Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":41.855 ,"LONGITUDE":-112.158 ,"NAME":"Udy Hot Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":41.578 ,"LONGITUDE":-112.23 ,"NAME":"Stinking Hot Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":40.517 ,"LONGITUDE":-111.475 ,"NAME":"Midway Hot Spring" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":40.536 ,"LONGITUDE":-111.478 ,"NAME":"Warm Ditch Spring" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":40.35 ,"LONGITUDE":-111.905 ,"NAME":"Saratoga Hot Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":40.353 ,"LONGITUDE":-111.895 ,"NAME":"Crater Hot Spring" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":41.901 ,"LONGITUDE":-112.999 ,"NAME":"Coyote Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":109 ,"CELSIUS":43 }
,{"LATITUDE":41.687 ,"LONGITUDE":-113.986 ,"NAME":"Spring (Hot)" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":41.582 ,"LONGITUDE":-112.256 ,"NAME":"Little Mountain Hot Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":41.822 ,"LONGITUDE":-113.263 ,"NAME":"L.G. Carter Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":41.236 ,"LONGITUDE":-111.924 ,"NAME":"Ogden Hot Spring" ,"AREA":"Ogden" ,"TYPE":"Hotspring" ,"FARENHEIT":135 ,"CELSIUS":57 }
,{"LATITUDE":37.178 ,"LONGITUDE":-113.634 ,"NAME":"Snow Spring" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":38.34 ,"LONGITUDE":-113.22 ,"NAME":"Woodhouse Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.155 ,"LONGITUDE":-112.901 ,"NAME":"Willow Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.56 ,"LONGITUDE":-112.578 ,"NAME":"Sulphurdale" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.981 ,"LONGITUDE":-111.829 ,"NAME":"Salt Spring" ,"AREA":"Salina" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":37.174 ,"LONGITUDE":-112.535 ,"NAME":"Red Canyon" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":41.808 ,"LONGITUDE":-113.327 ,"NAME":"W.R. Carter Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":41.818 ,"LONGITUDE":-113.311 ,"NAME":"Larson Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":41.829 ,"LONGITUDE":-113.654 ,"NAME":"Head Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":40.653 ,"LONGITUDE":-112.907 ,"NAME":"Redlum Spring" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":40.458 ,"LONGITUDE":-111.929 ,"NAME":"Camp Williams" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":40.647 ,"LONGITUDE":-112.524 ,"NAME":"Grantsville Warm Springs" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":39.183 ,"LONGITUDE":-111.691 ,"NAME":"Sterling (Peacock) Warm Spring" ,"AREA":"Price" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":39.246 ,"LONGITUDE":-111.645 ,"NAME":"Livingston Warm Springs" ,"AREA":"Price" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":38.138 ,"LONGITUDE":-112.863 ,"NAME":"Big Maple Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":37.393 ,"LONGITUDE":-113.61 ,"NAME":"Irvine Spring" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":41.563 ,"LONGITUDE":-113.954 ,"NAME":"Kimber (Rose) Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":41.614 ,"LONGITUDE":-113.613 ,"NAME":"Warm Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":41.328 ,"LONGITUDE":-111.826 ,"NAME":"Patio Springs" ,"AREA":"Ogden" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":40.172 ,"LONGITUDE":-112.426 ,"NAME":"Davis" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":40.118 ,"LONGITUDE":-111.337 ,"NAME":"Diamond Fork Warm Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":39.249 ,"LONGITUDE":-113.877 ,"NAME":"Knoll Springs" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":39.403 ,"LONGITUDE":-113.863 ,"NAME":"Twin Springs" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":39.788 ,"LONGITUDE":-111.881 ,"NAME":"Ray Lunt Spring" ,"AREA":"Price" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":38.762 ,"LONGITUDE":-112.87 ,"NAME":"Springs" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":38.77 ,"LONGITUDE":-112.871 ,"NAME":"Coyote Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":37.937 ,"LONGITUDE":-112.424 ,"NAME":"Tebbs" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":37.096 ,"LONGITUDE":-113.447 ,"NAME":"Warner Valley Spring" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":40.565 ,"LONGITUDE":-112.738 ,"NAME":"Deseret Livestock South Springs" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":37.158 ,"LONGITUDE":-113.399 ,"NAME":"Virgin River Spring" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":39.899 ,"LONGITUDE":-112.045 ,"NAME":"Springs" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.603 ,"LONGITUDE":-112.111 ,"NAME":"Johnson Warm Spring" ,"AREA":"Richfield" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":41.722 ,"LONGITUDE":-112.266 ,"NAME":"Bothwell Warm Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":40.538 ,"LONGITUDE":-112.747 ,"NAME":"Deseret Livestock" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":40.733 ,"LONGITUDE":-112.621 ,"NAME":"Utah Fish And Game Dept" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":40.228 ,"LONGITUDE":-111.867 ,"NAME":"Warm Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.137 ,"LONGITUDE":-113.513 ,"NAME":"Warm Spring" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.138 ,"LONGITUDE":-113.528 ,"NAME":"Green Spring" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.166 ,"LONGITUDE":-113.383 ,"NAME":"Berry Springs" ,"AREA":"Cedar City" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":41.834 ,"LONGITUDE":-112.054 ,"NAME":"Cutler Warm Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":40.614 ,"LONGITUDE":-112.709 ,"NAME":"Horseshoe Springs" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.239 ,"LONGITUDE":-112.413 ,"NAME":"Compton Spring" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":40.743 ,"LONGITUDE":-112.642 ,"NAME":"Big Warm Springs" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":40.558 ,"LONGITUDE":-112.739 ,"NAME":"Deseret Livestock South Spring" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":40.39 ,"LONGITUDE":-112.424 ,"NAME":"Russells Warm Springs" ,"AREA":"Tooele" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":41.831 ,"LONGITUDE":-113.391 ,"NAME":"Pugsley" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.449 ,"LONGITUDE":-112.442 ,"NAME":"Poulsen Spring (Salt)" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":40.167 ,"LONGITUDE":-111.622 ,"NAME":"Wood Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":40.234 ,"LONGITUDE":-111.865 ,"NAME":"Warm Springs" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":39.955 ,"LONGITUDE":-111.858 ,"NAME":"Goshen Warm Srings" ,"AREA":"Price" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":39.334 ,"LONGITUDE":-113.518 ,"NAME":"South Tule Spring" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":39.616 ,"LONGITUDE":-112.803 ,"NAME":"Fumarole Butte" ,"AREA":"Delta" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":40.545 ,"LONGITUDE":-111.928 ,"NAME":"East Jordan Canal" ,"AREA":"Salt Lake City" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":41.643 ,"LONGITUDE":-112.281 ,"NAME":"Springs" ,"AREA":"Brigham City" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":37.29 ,"LONGITUDE":-80.619 ,"NAME":"New River White Sulphur Springs" ,"AREA":"Bluefield" ,"TYPE":"Hotspring" ,"FARENHEIT":85 ,"CELSIUS":29 }
,{"LATITUDE":37.997 ,"LONGITUDE":-79.83 ,"NAME":"Hot Springs" ,"AREA":"Roanoke" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":37.898 ,"LONGITUDE":-79.462 ,"NAME":"Rockbridge Baths" ,"AREA":"Roanoke" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.055 ,"LONGITUDE":-79.78 ,"NAME":"Warm Springs" ,"AREA":"Charlottesvill" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":37.963 ,"LONGITUDE":-79.861 ,"NAME":"Healing Springs" ,"AREA":"Roanoke" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":38.238 ,"LONGITUDE":-79.65 ,"NAME":"Bragg Spring" ,"AREA":"Charlottesvill" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":37.645 ,"LONGITUDE":-80.238 ,"NAME":"Sweet Chalybeate Spring" ,"AREA":"Bluefield" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":38.218 ,"LONGITUDE":-79.673 ,"NAME":"Bolar Spring" ,"AREA":"Charlottesvill" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":37.86 ,"LONGITUDE":-79.988 ,"NAME":"Layton Spring" ,"AREA":"Roanoke" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":37.87 ,"LONGITUDE":-79.933 ,"NAME":"Falling Spring" ,"AREA":"Roanoke" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":37.16 ,"LONGITUDE":-80.806 ,"NAME":"Alum Springs" ,"AREA":"Bluefield" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":46.852 ,"LONGITUDE":-121.758 ,"NAME":"Mt Rainier Fumaroles" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":46.738 ,"LONGITUDE":-121.562 ,"NAME":"Ohanapecosh Hot Springs" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":47.707 ,"LONGITUDE":-121.155 ,"NAME":"Scenic Hot Springs" ,"AREA":"Wenatchee" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":47.969 ,"LONGITUDE":-123.864 ,"NAME":"Sol Duc Hot Springs" ,"AREA":"Seattle" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":48.974 ,"LONGITUDE":-119.475 ,"NAME":"Hot Lake" ,"AREA":"Okanogan" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":45.658 ,"LONGITUDE":-121.962 ,"NAME":"Moffetts (Bonneville) Hot Springs" ,"AREA":"The Dalles" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":48.906 ,"LONGITUDE":-119.455 ,"NAME":"Poison Lake" ,"AREA":"Okanogan" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":45.701 ,"LONGITUDE":-121.728 ,"NAME":"Collins Hot Springs" ,"AREA":"The Dalles" ,"TYPE":"Hotspring" ,"FARENHEIT":122 ,"CELSIUS":50 }
,{"LATITUDE":47.484 ,"LONGITUDE":-121.391 ,"NAME":"Goldmeyer Hot Springs" ,"AREA":"Wenatchee" ,"TYPE":"Hotspring" ,"FARENHEIT":127 ,"CELSIUS":53 }
,{"LATITUDE":46.202 ,"LONGITUDE":-121.492 ,"NAME":"Mount Adams Fumaroles" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":150 ,"CELSIUS":66 }
,{"LATITUDE":46.198 ,"LONGITUDE":-122.197 ,"NAME":"Mt St Helens Fumaroles" ,"AREA":"Hoquiam" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":48.789 ,"LONGITUDE":-121.804 ,"NAME":"Dorr Fumarole Field" ,"AREA":"Concrete" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":90 }
,{"LATITUDE":48.77 ,"LONGITUDE":-121.813 ,"NAME":"Sherman Crater Fumaroles" ,"AREA":"Concrete" ,"TYPE":"Hotspring" ,"FARENHEIT":266 ,"CELSIUS":130 }
,{"LATITUDE":45.723 ,"LONGITUDE":-121.927 ,"NAME":"Rock Creek Hot Springs" ,"AREA":"The Dalles" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":48.15 ,"LONGITUDE":-121.062 ,"NAME":"Gamma Hot Springs" ,"AREA":"Concrete" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":46.378 ,"LONGITUDE":-122.265 ,"NAME":"Green River Soda Spring" ,"AREA":"Hoquiam" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":46.575 ,"LONGITUDE":-121.706 ,"NAME":"Packwood Hot Spring" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":47.201 ,"LONGITUDE":-121.536 ,"NAME":"Lester Hot Springs" ,"AREA":"Wenatchee" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":46.024 ,"LONGITUDE":-118.771 ,"NAME":"Warm Springs Canyon Warm Spring" ,"AREA":"Walla Walla" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":46.345 ,"LONGITUDE":-121.6 ,"NAME":"Orr Creek Warm Springs" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":46.041 ,"LONGITUDE":-121.181 ,"NAME":"Fish Hatchery Warm Spring" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":46.752 ,"LONGITUDE":-121.814 ,"NAME":"Longmire Mineral Springs" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":47.892 ,"LONGITUDE":-121.342 ,"NAME":"Garland Mineral Springs" ,"AREA":"Wenatchee" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":46.452 ,"LONGITUDE":-120.956 ,"NAME":"Simcoe Soda Springs" ,"AREA":"Yakima" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":48.254 ,"LONGITUDE":-121.17 ,"NAME":"Sulphur Creek Hot Springs" ,"AREA":"Concrete" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":48.118 ,"LONGITUDE":-121.192 ,"NAME":"Kennedy Hot Spring" ,"AREA":"Concrete" ,"TYPE":"Hotspring" ,"FARENHEIT":100 ,"CELSIUS":38 }
,{"LATITUDE":48.763 ,"LONGITUDE":-121.667 ,"NAME":"Baker Hot Spring" ,"AREA":"Concrete" ,"TYPE":"Hotspring" ,"FARENHEIT":108 ,"CELSIUS":42 }
,{"LATITUDE":47.977 ,"LONGITUDE":-123.682 ,"NAME":"Olympic Hot Springs" ,"AREA":"Seattle" ,"TYPE":"Hotspring" ,"FARENHEIT":118 ,"CELSIUS":48 }
,{"LATITUDE":45.728 ,"LONGITUDE":-121.8 ,"NAME":"St Martins Hot Springs" ,"AREA":"The Dalles" ,"TYPE":"Hotspring" ,"FARENHEIT":120 ,"CELSIUS":49 }
,{"LATITUDE":45.821 ,"LONGITUDE":-121.133 ,"NAME":"Klickitat Mineral Springs" ,"AREA":"The Dalles" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":38.163 ,"LONGITUDE":-79.975 ,"NAME":"Minnehaha Springs" ,"AREA":"Charlottesvill" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":37.63 ,"LONGITUDE":-80.24 ,"NAME":"Old Sweet Spring" ,"AREA":"Bluefield" ,"TYPE":"Hotspring" ,"FARENHEIT":73 ,"CELSIUS":23 }
,{"LATITUDE":39.618 ,"LONGITUDE":-78.23 ,"NAME":"Berkeley Springs" ,"AREA":"Cumberland" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":38.605 ,"LONGITUDE":-79.353 ,"NAME":"Thorn Spring" ,"AREA":"Charlottesvill" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":39.471 ,"LONGITUDE":-77.877 ,"NAME":"Swan Pond Spring" ,"AREA":"Baltimore" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":44.29 ,"LONGITUDE":-110.504 ,"NAME":"Hot Springs,heart Lake Geyser Basi" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.691 ,"LONGITUDE":-110.728 ,"NAME":"Geyser Springs Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.554 ,"LONGITUDE":-110.812 ,"NAME":"Fountain Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.543 ,"LONGITUDE":-110.859 ,"NAME":"Fairy Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.485 ,"LONGITUDE":-110.852 ,"NAME":"Biscuit Basin, Sapphire Pool" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.48 ,"LONGITUDE":-110.85 ,"NAME":"Cascade Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.46 ,"LONGITUDE":-110.844 ,"NAME":"Black Sand Basin" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.459 ,"LONGITUDE":-110.835 ,"NAME":"Myriad Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.307 ,"LONGITUDE":-110.526 ,"NAME":"Hot Springs,heart Lake Geyser Basi" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.354 ,"LONGITUDE":-110.8 ,"NAME":"Shoshone Geyser Basin" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.568 ,"LONGITUDE":-110.805 ,"NAME":"Quagmire Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.537 ,"LONGITUDE":-110.801 ,"NAME":"White Dome Geyser, Surprise Pool" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.52 ,"LONGITUDE":-110.828 ,"NAME":"Flood Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.471 ,"LONGITUDE":-110.843 ,"NAME":"Daisy Group, Sentinel Geysers" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.466 ,"LONGITUDE":-110.839 ,"NAME":"Middle Group,tortoise Shell,inkwel" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.46 ,"LONGITUDE":-110.828 ,"NAME":"Geyser Hill Group, Old Faithful Ge" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.908 ,"LONGITUDE":-110.393 ,"NAME":"Calcite Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":201 ,"CELSIUS":94 }
,{"LATITUDE":44.417 ,"LONGITUDE":-110.57 ,"NAME":"West Thumb Geyser Basin" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.459 ,"LONGITUDE":-110.817 ,"NAME":"Southeastern Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.433 ,"LONGITUDE":-110.581 ,"NAME":"Potts Hot Spring Basin" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":203 ,"CELSIUS":95 }
,{"LATITUDE":44.421 ,"LONGITUDE":-110.952 ,"NAME":"Smoke Jumper Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.684 ,"LONGITUDE":-110.753 ,"NAME":"Monument Geyser Basin" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":197 ,"CELSIUS":92 }
,{"LATITUDE":44.679 ,"LONGITUDE":-110.746 ,"NAME":"Beryl Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.544 ,"LONGITUDE":-110.258 ,"NAME":"Turbid Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.53 ,"LONGITUDE":-110.297 ,"NAME":"Steamboat Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.518 ,"LONGITUDE":-110.813 ,"NAME":"Hot Springs, Rabbit Creek Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.514 ,"LONGITUDE":-110.828 ,"NAME":"Rabbit Creek Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.484 ,"LONGITUDE":-110.873 ,"NAME":"Mystic Falls Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.739 ,"LONGITUDE":-110.324 ,"NAME":"Josephs Coat Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.75 ,"LONGITUDE":-110.714 ,"NAME":"Gas Vent" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.282 ,"LONGITUDE":-110.506 ,"NAME":"Rustic Geyser" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.571 ,"LONGITUDE":-110.811 ,"NAME":"Morning Mist Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":44.733 ,"LONGITUDE":-110.703 ,"NAME":"Cistern Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.697 ,"LONGITUDE":-110.724 ,"NAME":"Gibbon Hill Geyser" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.693 ,"LONGITUDE":-110.738 ,"NAME":"Artists Paintpots" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.69 ,"LONGITUDE":-110.384 ,"NAME":"Hot Springs on Bog Creek" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.526 ,"LONGITUDE":-110.835 ,"NAME":"Excelsior Geyser Crater" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.418 ,"LONGITUDE":-110.805 ,"NAME":"Lone Star Geyser" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.309 ,"LONGITUDE":-110.654 ,"NAME":"Hot Springs on Lewis Lake" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":199 ,"CELSIUS":93 }
,{"LATITUDE":44.469 ,"LONGITUDE":-110.828 ,"NAME":"Solitary Geyser" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.433 ,"LONGITUDE":-110.813 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.766 ,"LONGITUDE":-110.3 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.61 ,"LONGITUDE":-110.438 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.607 ,"LONGITUDE":-110.617 ,"NAME":"Hot Springs East of Mary Lake" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.601 ,"LONGITUDE":-110.632 ,"NAME":"Gas Vent East of Mary Lake" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.595 ,"LONGITUDE":-110.622 ,"NAME":"Gas Vents Southeast of Mary Lake" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.572 ,"LONGITUDE":-110.691 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.553 ,"LONGITUDE":-110.301 ,"NAME":"Beach Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.551 ,"LONGITUDE":-110.85 ,"NAME":"Springs on Fairy Creek" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.616 ,"LONGITUDE":-110.616 ,"NAME":"Highland Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.438 ,"LONGITUDE":-110.977 ,"NAME":"Hot Springs on Continental Divide" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.617 ,"LONGITUDE":-110.432 ,"NAME":"Mud Geysers" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.404 ,"LONGITUDE":-110.824 ,"NAME":"Hot Springs on Upper Firehole Rive" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.498 ,"LONGITUDE":-109.193 ,"NAME":"Buffalo Bill Reservoir Springs" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.495 ,"LONGITUDE":-109.222 ,"NAME":"Buffalo Bill Reservoir Springs" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.482 ,"LONGITUDE":-109.204 ,"NAME":"Buffalo Bill Reservoir Springs" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.841 ,"LONGITUDE":-110.167 ,"NAME":"Hot, on Lamar River" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.734 ,"LONGITUDE":-110.029 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.708 ,"LONGITUDE":-110.471 ,"NAME":"Warm Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.701 ,"LONGITUDE":-110.036 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.508 ,"LONGITUDE":-110.832 ,"NAME":"Midway Picnic Ground" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.715 ,"LONGITUDE":-110.555 ,"NAME":"Gas Vents" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.563 ,"LONGITUDE":-110.834 ,"NAME":"River Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":44.544 ,"LONGITUDE":-110.788 ,"NAME":"Black Warrior Group, Shelf Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":44.115 ,"LONGITUDE":-110.684 ,"NAME":"Huckleberry Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.842 ,"LONGITUDE":-110.732 ,"NAME":"Apollinaris Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.825 ,"LONGITUDE":-110.675 ,"NAME":"Gas Vents at Horseshoe Hill" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.781 ,"LONGITUDE":-110.738 ,"NAME":"Steam Vents at Roaring Mountain" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.743 ,"LONGITUDE":-110.242 ,"NAME":"Hot Spring Basin Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.752 ,"LONGITUDE":-110.256 ,"NAME":"Hot Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.612 ,"LONGITUDE":-110.618 ,"NAME":"Gas Vent" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.741 ,"LONGITUDE":-110.699 ,"NAME":"Gas Vent" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.566 ,"LONGITUDE":-110.871 ,"NAME":"Flat Cone Spring, Steep Cone" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":205 ,"CELSIUS":96 }
,{"LATITUDE":44.711 ,"LONGITUDE":-110.468 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.708 ,"LONGITUDE":-110.461 ,"NAME":"Forest Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.672 ,"LONGITUDE":-110.236 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.667 ,"LONGITUDE":-110.282 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.656 ,"LONGITUDE":-110.572 ,"NAME":"Violet Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.642 ,"LONGITUDE":-110.238 ,"NAME":"Hot Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.634 ,"LONGITUDE":-110.234 ,"NAME":"The Mudkettles" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.634 ,"LONGITUDE":-110.226 ,"NAME":"The Mushpots" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":null ,"CELSIUS":null }
,{"LATITUDE":44.532 ,"LONGITUDE":-110.874 ,"NAME":"Imperial Geyser, Spray Geyser" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":192 ,"CELSIUS":89 }
,{"LATITUDE":42.545 ,"LONGITUDE":-106.725 ,"NAME":"Alcova Hot Springs" ,"AREA":"Casper" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":42.75 ,"LONGITUDE":-109.616 ,"NAME":"Steele Hot Springs" ,"AREA":"Lander" ,"TYPE":"Hotspring" ,"FARENHEIT":102 ,"CELSIUS":39 }
,{"LATITUDE":43.37 ,"LONGITUDE":-110.445 ,"NAME":"Granite Hot Spring" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":106 ,"CELSIUS":41 }
,{"LATITUDE":43.008 ,"LONGITUDE":-108.835 ,"NAME":"Washakie Mineral Hot Springs" ,"AREA":"Thermopolis" ,"TYPE":"Hotspring" ,"FARENHEIT":111 ,"CELSIUS":44 }
,{"LATITUDE":43.907 ,"LONGITUDE":-110.198 ,"NAME":"North Buffalo Fork Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":113 ,"CELSIUS":45 }
,{"LATITUDE":43.365 ,"LONGITUDE":-110.443 ,"NAME":"Granite Falls Hot Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":112 ,"CELSIUS":45 }
,{"LATITUDE":42.817 ,"LONGITUDE":-110.997 ,"NAME":"Johnson Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":44.723 ,"LONGITUDE":-110.358 ,"NAME":"Hot Spring on Moss Creek" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":115 ,"CELSIUS":46 }
,{"LATITUDE":44.681 ,"LONGITUDE":-110.326 ,"NAME":"Hot Springs on Upper Sour Creek" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":90 }
,{"LATITUDE":41.45 ,"LONGITUDE":-106.804 ,"NAME":"Saratoga Hot Springs" ,"AREA":"Rawlins" ,"TYPE":"Hotspring" ,"FARENHEIT":129 ,"CELSIUS":54 }
,{"LATITUDE":44.671 ,"LONGITUDE":-110.786 ,"NAME":"Secret Valley Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":44.625 ,"LONGITUDE":-110.433 ,"NAME":"Mud Volcano" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":131 ,"CELSIUS":55 }
,{"LATITUDE":43.654 ,"LONGITUDE":-108.194 ,"NAME":"Thermopolis Hot Springs" ,"AREA":"Thermopolis" ,"TYPE":"Hotspring" ,"FARENHEIT":133 ,"CELSIUS":56 }
,{"LATITUDE":44.985 ,"LONGITUDE":-110.689 ,"NAME":"Hot River" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.588 ,"LONGITUDE":-110.341 ,"NAME":"Ebro Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.55 ,"LONGITUDE":-110.805 ,"NAME":"Fountain Paint Pot" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.169 ,"LONGITUDE":-110.583 ,"NAME":"Snake Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.157 ,"LONGITUDE":-110.699 ,"NAME":"Crawfish Creek Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":136 ,"CELSIUS":58 }
,{"LATITUDE":44.165 ,"LONGITUDE":-110.723 ,"NAME":"Crawfish Creek Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":138 ,"CELSIUS":59 }
,{"LATITUDE":44.711 ,"LONGITUDE":-110.741 ,"NAME":"Chocolate Pots" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":124 ,"CELSIUS":51 }
,{"LATITUDE":43.56 ,"LONGITUDE":-109.732 ,"NAME":"Geyser (Warm Spring Creek Springs)" ,"AREA":"Thermopolis" ,"TYPE":"Hotspring" ,"FARENHEIT":84 ,"CELSIUS":29 }
,{"LATITUDE":43.489 ,"LONGITUDE":-109.605 ,"NAME":"Jakeys Fork Spring" ,"AREA":"Thermopolis" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":44.749 ,"LONGITUDE":-108.188 ,"NAME":"Little Sheep Mountain Spring" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":68 ,"CELSIUS":20 }
,{"LATITUDE":42.249 ,"LONGITUDE":-104.781 ,"NAME":"Warm Springs (Immigrants Washtub)" ,"AREA":"Torrington" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":44.608 ,"LONGITUDE":-108.138 ,"NAME":"Sheep Mountain Springs" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":70 ,"CELSIUS":21 }
,{"LATITUDE":43.583 ,"LONGITUDE":-108.213 ,"NAME":"Wind River Canyon Spring" ,"AREA":"Thermopolis" ,"TYPE":"Hotspring" ,"FARENHEIT":72 ,"CELSIUS":22 }
,{"LATITUDE":42.702 ,"LONGITUDE":-107.105 ,"NAME":"Horse Creek Springs" ,"AREA":"Casper" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":44.511 ,"LONGITUDE":-109.156 ,"NAME":"Needle Hot Springs" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":75 ,"CELSIUS":24 }
,{"LATITUDE":43.52 ,"LONGITUDE":-109.669 ,"NAME":"Little Warm Spring" ,"AREA":"Thermopolis" ,"TYPE":"Hotspring" ,"FARENHEIT":77 ,"CELSIUS":25 }
,{"LATITUDE":43.3 ,"LONGITUDE":-110.775 ,"NAME":"Astoria Mineral Hot Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":99 ,"CELSIUS":37 }
,{"LATITUDE":43.543 ,"LONGITUDE":-110.741 ,"NAME":"Abercrombie Warm Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":44.513 ,"LONGITUDE":-109.115 ,"NAME":"De Maris Springs" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":97 ,"CELSIUS":36 }
,{"LATITUDE":42.665 ,"LONGITUDE":-105.394 ,"NAME":"Douglas Hot Springs" ,"AREA":"Torrington" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":43.471 ,"LONGITUDE":-110.835 ,"NAME":"Boyles Hill Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":43.282 ,"LONGITUDE":-110.019 ,"NAME":"Kendall Warm Spring" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":44.662 ,"LONGITUDE":-110.768 ,"NAME":"Iron Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":86 ,"CELSIUS":30 }
,{"LATITUDE":42.492 ,"LONGITUDE":-108.172 ,"NAME":"Sweetwater Station Warm Springs" ,"AREA":"Lander" ,"TYPE":"Hotspring" ,"FARENHEIT":90 ,"CELSIUS":32 }
,{"LATITUDE":44.742 ,"LONGITUDE":-110.579 ,"NAME":"Wolf Lake Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":91 ,"CELSIUS":33 }
,{"LATITUDE":44.513 ,"LONGITUDE":-109.129 ,"NAME":"Shoshone Hot Springs" ,"AREA":"Cody" ,"TYPE":"Hotspring" ,"FARENHEIT":95 ,"CELSIUS":35 }
,{"LATITUDE":42.828 ,"LONGITUDE":-110.999 ,"NAME":"Auburn Hot Springs" ,"AREA":"Preston" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":43.639 ,"LONGITUDE":-110.615 ,"NAME":"Kelly Warm Spring" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":81 ,"CELSIUS":27 }
,{"LATITUDE":44.532 ,"LONGITUDE":-110.796 ,"NAME":"Five Sisters Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":192 ,"CELSIUS":89 }
,{"LATITUDE":44.582 ,"LONGITUDE":-110.314 ,"NAME":"Vermilion Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":140 ,"CELSIUS":60 }
,{"LATITUDE":44.521 ,"LONGITUDE":-110.275 ,"NAME":"Butte Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":44.478 ,"LONGITUDE":-110.867 ,"NAME":"Hillside Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":44.752 ,"LONGITUDE":-110.418 ,"NAME":"Hot Springs at Sevenmile Hole" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":189 ,"CELSIUS":87 }
,{"LATITUDE":44.401 ,"LONGITUDE":-110.936 ,"NAME":"Hot Springs on Continental Divide" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":189 ,"CELSIUS":87 }
,{"LATITUDE":44.769 ,"LONGITUDE":-110.269 ,"NAME":"Rainbow Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":44.628 ,"LONGITUDE":-110.433 ,"NAME":"Sulphur Caldron" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":190 ,"CELSIUS":88 }
,{"LATITUDE":44.702 ,"LONGITUDE":-110.767 ,"NAME":"Sylvan Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":192 ,"CELSIUS":89 }
,{"LATITUDE":44.529 ,"LONGITUDE":-110.791 ,"NAME":"White Creek Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":44.564 ,"LONGITUDE":-110.869 ,"NAME":"Queens Laundry" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":192 ,"CELSIUS":89 }
,{"LATITUDE":44.697 ,"LONGITUDE":-110.375 ,"NAME":"Hot Springs on Bog Creek" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":44.285 ,"LONGITUDE":-110.9 ,"NAME":"Bechler River Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":90 }
,{"LATITUDE":44.797 ,"LONGITUDE":-110.725 ,"NAME":"Amphitheater Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":196 ,"CELSIUS":91 }
,{"LATITUDE":44.766 ,"LONGITUDE":-110.429 ,"NAME":"Washburn Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":196 ,"CELSIUS":91 }
,{"LATITUDE":44.756 ,"LONGITUDE":-110.308 ,"NAME":"Coffee Pot Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":196 ,"CELSIUS":91 }
,{"LATITUDE":44.591 ,"LONGITUDE":-110.321 ,"NAME":"Hot Springs at Sulphur Hills" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":196 ,"CELSIUS":91 }
,{"LATITUDE":44.556 ,"LONGITUDE":-110.832 ,"NAME":"River Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":196 ,"CELSIUS":91 }
,{"LATITUDE":44.422 ,"LONGITUDE":-110.574 ,"NAME":"West Thumb Geyser Basin" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":196 ,"CELSIUS":91 }
,{"LATITUDE":44.786 ,"LONGITUDE":-110.74 ,"NAME":"Semi-Centennial Geyser" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.653 ,"LONGITUDE":-110.482 ,"NAME":"Sulphur Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":194 ,"CELSIUS":89 }
,{"LATITUDE":44.41 ,"LONGITUDE":-110.953 ,"NAME":"Summit Lake Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":44.761 ,"LONGITUDE":-110.73 ,"NAME":"Bijah Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":198 ,"CELSIUS":92 }
,{"LATITUDE":44.781 ,"LONGITUDE":-110.699 ,"NAME":"Whiterock Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":144 ,"CELSIUS":62 }
,{"LATITUDE":44.739 ,"LONGITUDE":-110.258 ,"NAME":"Hot Spring Basin Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":153 ,"CELSIUS":67 }
,{"LATITUDE":44.754 ,"LONGITUDE":-110.403 ,"NAME":"Sevenmile Hole" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":44.276 ,"LONGITUDE":-110.636 ,"NAME":"Hot Springs on Lewis Lake" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":154 ,"CELSIUS":68 }
,{"LATITUDE":44.598 ,"LONGITUDE":-110.236 ,"NAME":"Hot Springs In Pelican Valley" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":44.142 ,"LONGITUDE":-110.656 ,"NAME":"South Entrance Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":156 ,"CELSIUS":69 }
,{"LATITUDE":44.753 ,"LONGITUDE":-110.724 ,"NAME":"Roadside Springs, Frying Pan Sprin" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
,{"LATITUDE":44.733 ,"LONGITUDE":-110.712 ,"NAME":"Horseshoe Spring" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":187 ,"CELSIUS":86 }
,{"LATITUDE":43.958 ,"LONGITUDE":-110.696 ,"NAME":"Jackson Lake Hot Springs" ,"AREA":"Driggs" ,"TYPE":"Hotspring" ,"FARENHEIT":162 ,"CELSIUS":72 }
,{"LATITUDE":44.187 ,"LONGITUDE":-110.726 ,"NAME":"Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":142 ,"CELSIUS":61 }
,{"LATITUDE":44.967 ,"LONGITUDE":-110.708 ,"NAME":"Mammoth Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":44.475 ,"LONGITUDE":-110.843 ,"NAME":"Morning Glory Pool" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":163 ,"CELSIUS":73 }
,{"LATITUDE":44.204 ,"LONGITUDE":-110.486 ,"NAME":"Hot Springs on Upper Snake River" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":167 ,"CELSIUS":75 }
,{"LATITUDE":44.299 ,"LONGITUDE":-110.517 ,"NAME":"Heart Lake Geyser Basin, Middle Gr" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":174 ,"CELSIUS":79 }
,{"LATITUDE":44.671 ,"LONGITUDE":-110.29 ,"NAME":"Ponuntpa Springs Group" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":180 ,"CELSIUS":82 }
,{"LATITUDE":44.244 ,"LONGITUDE":-111.022 ,"NAME":"Boundary Creek Hot Springs" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":181 ,"CELSIUS":83 }
,{"LATITUDE":44.414 ,"LONGITUDE":-110.817 ,"NAME":"Lone Star Geyser Basin, Footbridge" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":183 ,"CELSIUS":84 }
,{"LATITUDE":44.722 ,"LONGITUDE":-110.701 ,"NAME":"Echinus Geyser" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":185 ,"CELSIUS":85 }
,{"LATITUDE":44.461 ,"LONGITUDE":-110.854 ,"NAME":"Emerald Pool" ,"AREA":"Ashton" ,"TYPE":"Hotspring" ,"FARENHEIT":158 ,"CELSIUS":70 }
],"SYSUSERID" : "sasjsuser"
,"MF_GETUSER" : "SASjs User"
,"_DEBUG" : ""
,"_PROGRAM" : "/Public/app/minimal-seed-app/services/common/getdata.sas"
,"SYSCC" : "1012"
,"SYSERRORTEXT" : "File WORK.AREAS.DATA does not exist."
,"SYSHOSTINFOLONG" : ""
,"SYSHOSTNAME" : "https://sasjs.com"
,"SYSPROCESSID" : "41DD635DA00D1EB84018000000000000"
,"SYSPROCESSMODE" : "SAS Batch Mode"
,"SYSPROCESSNAME" : ""
,"SYSJOBID" : "14684"
,"SYSSCPL" : "WINDOWS"
,"SYSSITE" : "0"
,"SYSTCPIPHOSTNAME" : "https://sasjs.com"
,"SYSVLONG" : ""
,"SYSWARNINGTEXT" : ""
,"END_DTTM" : "2022-06-30T10:46:29.056000"
,"AUTOEXEC" : ""
,"MEMSIZE" : "2GB"
}
  `
]

_webout = responses[Math.floor(Math.random() * responses.length)]
