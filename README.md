# HCEC Barrington to Hawkesbury (B2H)

This is the source code for the leaflet.js web app for B2H. <br/>
Initial web/GIS developement by Ian Scrivener for **Hunter Community Environment Centre** (HCEC).<br/>
GIS support by Will DeGeer from HCEC.<br/>

**[https://www.hcec.org.au/](https://www.hcec.org.au/).**


---
## Web Map Configuration

### Map Layers
- All map layers are configured in the file **[/src/data/layers.jsonl](https://github.com/hcec-org-au/b2h/blob/main/src/data/layers.jsonl**
- This is a **[JSONL](https://jsonlines.org/)** file - ie a series of JSON rows separate with new lines
- Comments are allowed with `//`

### Initial zoom & map centre
- Initial zoom & map centre can be configured by carefully editing the **[/src/js/_config.js](https://github.com/hcec-org-au/b2h/tree/main/src/js/_config.js)** file


### Map layer icons
- B2H uses **Bootstrap Icons** - see **https://icons.getbootstrap.com/**
- Icons can be configured by carefully editing the **[/src/js/_icons.js](https://github.com/hcec-org-au/b2h/tree/main/src/js/_icons.js)** file

---
## Editing The Code

### (1) Install the latest node.js
[ ] ToDo

### (2) Install node.js dependancies

`npm install `

### (3) Run gulp

`gulp`


