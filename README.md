# 2473 Scouting App
TODO: A dummy page is hosted [here]() to try out. This is disconnected from our DB.

### How to interpret 
There are two ways in which scouting data can be presented.

**Per-Round Stats** TODO

How a team performance has varied across rounds.
This can be viewd on the scouting site, at `/[team#]`.
This page will show a table of the scouting data, as well as a graph of performance over rounds for graphable stats.

[screenshot of page]

**Summative Stats**

The average of a team's performance, i.e. the average speakers scored, or the percentage of rounds where it climbed onstage.
This statistic is exported into a `.csv` file that can then be imported to google sheets.
Through google sheets, you can then sort or process the data further.
As a sample and for testing, we've imported the '24 SVR scouting data into our database.
Here is the exported [google sheet](https://docs.google.com/spreadsheets/d/1O8MmyFpt3tY0lR3NgNLADu2RxGO6atvxuu2eQgzQhfE/edit#gid=726465529) of the summative stats of the teams at SVR. <br>


**How to Export**
Preferably have the developers do this for you.
- `npm run compile`
- This will produce a `export.csv`
- In google sheets, go to `file > import` and select the `export.csv`
- From there you should have a file that looks like the screeshot above.

### Configuration

Notes for re-configuring the project for future games. 
- The forum structure is completely configurable through the `fields` export in `configs.js`
    - It supports three types of input: "Number", "Rating", and "Boolean"
    - There are obviously other ways to input forum data, but we choose only to implement types that we can easily take the average of, that way compiling our data will be simpler.
    - Each type have settings to restrict the range, etc.
    - The details of configuration can be infered.
    - You can also specify to add a labeled divider, refer to source to see how.
- `exporter.js` was also written to be programmatic, it simply takes the average for each team for each field. 
    - What needs to be edited is the `nameMap` object; it is a look-up table that maps the field name (as defined in the `field` object) to the table name (what the column is named in the google sheet).
        - For example, you may rename the field "Leave_Starting_Zone" into "leave%" in the exported data.
- `config.js` also holds other configuration information.
    - `eventCode`: the event code as it is in TBA. refer to TBA documentation to find the code. 
- Two keys are to be stored in `.env`
    - `MONGODB_URI`: access to atlas db
    - `TBA_API_KEY`: refer to TBA website

### Technical Notes
- Built with Svelte, Tailwind, MongoDB, and TBA API, deployed on Vercel.
- Forum validation is in `config.js`. It shouldn't need re-writing.
- The TBA data is fetched and organized in `+page.server.js`, then passed as a prop through `+page.svelte` to `TeamSelector.svelte`.
- The `select` type in `Field.svelte` is only used for `TeamSelector.svelte`. This is because we cannot take the "average" of a selector field, and so it will be difficult to compile that field.
    - You can usually swap a selector field with multiple boolean fields, for example, instead of a "Final Position" selector with "Parked", "Onstage", or "Harmony", you can just use three boolean fields "Parked", "Onstage", and "Harmony".
- This application can be hosted for free on Vercel, since it is written to be serverless (read into this if needed).
- The `svrImporter.js` file was for importing the `.csv` file of 2024's SVR scouting data as testing. This can be repurposed for further testing.
    - Similarly, `svr.csv` is the scouting data from that regional.

