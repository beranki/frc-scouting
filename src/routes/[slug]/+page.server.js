import { error } from '@sveltejs/kit';
import db from '$lib/db.js';
import { eventCode } from '$lib/config.js';
import { TBA_API_KEY } from "$env/static/private";


const coll = db.collection("data");

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {

    //console.log(params.slug);

    const teams = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventCode}/teams/simple`, {
        method: "GET",
        headers: {"X-TBA-Auth-Key": TBA_API_KEY},
    })
    .then(res => res.json());

    let teams_list = teams.map(team_info => {return team_info.team_number;})

    let team_num = Number(params.slug);

    if (teams_list.includes(team_num)) {
        const data = await coll.find({
            team: team_num
        }).toArray(function (err, res) {
            if (err) throw err;
            //console.log(res);
        });

        let team_data = data.map(team_info => {

            let status;

            if (team_info.data.Parked) {
                status = "Parked";
            } else if (team_info.data.Onstage) {
                status = "Onstage";
            } else if (team_info.data.Harmony) {
                status = "Harmony";
            } else if (team_info.data.Trap) {
                status = "Trap";
            } else {
                status = "DNA";
            }
            

            return {
                "Team": params.slug,
                "Auto": {
                    "Leave Starting Zone": team_info.data.Leave_Starting_Zone,
                    "Amp Scores": team_info.data.Auto_Amp_Scores,
                    "Speaker Scores": team_info.data.Auto_Speaker_Scores
                },
                "TeleOp": {
                    "Amp Scores": team_info.data.TeleOp_Amp_Scores,
                    "Speaker Scores": team_info.data.TeleOp_Speaker_Scores,
                    "Ground Pickup": team_info.data.Ground_Pickup,
                    "Source Pickup": team_info.data.Source_Pickup
                },
                "Endgame": {
                    "Status": status
                },
                "Ratings": {
                    "Driver Skill": team_info.data.Driver_Skill,
                    "Defense Rating": team_info.data.Defense_Rating,
                    "Speed Rating": team_info.data.Speed_Rating,
                },
                "Status": {
                    "Died": team_info.data.Died,
                    "Incapacitated": team_info.data.Incapacitated,
                    "Dropped 2+ Notes": team_info.data.Butter_Fingers
                },
                "Comments": (team_info.data.comments == '' ? "X" : team_info.data.comments)
            };
        });

        return {team_data};
    }
    
    error(404, "team undefined / not found");
}
  