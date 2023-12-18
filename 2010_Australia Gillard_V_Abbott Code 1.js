quotes = [
    `"I will not be lectured about Sexism and Misogyny by this man, I will not!." - Julia Gillard`,
    `"HAHAHAHA, Shit Happens." - Tony Abbott`,
    `"Short-term thinking is the greatest enemy of good government." - Anthony Albanese`,
]

selQuote = quotes[Math.round(Math.random()*(quotes.length - 1))]
corrr = `<h2>THE CAMPAIGN TRAIL</h2><font id="wittyquote" size="4" color="white"><em>` + selQuote + `</em></font>`
$("#theme_picker")[0].style.display = "none"
$("#bottomBar")[0].style.display = "none"

styling = document.createElement("style");
document.head.appendChild(styling);

styling.innerHTML = `
#candidate_form h3 {
    visibility: hidden;
}

#candidate_form h3::before {
  content: "Please select your party:";
  position: absolute;
  top: 10px;
  left: 0;
  height: 100%;
  width: 100%;
  visibility: visible;
}

#candidate_id, #running_mate_id, .person_description_window, .person_button {
    z-index: 289;
    position:relative;
}

#running_mate_form h3 {
    visibility: hidden;
}

#running_mate_form h3::before {
  content: "Please select your party leader:";
  position: absolute;
  top: 10px;
  left: 0;
  height: 100%;
  width: 100%;
  visibility: visible;
}

#candidate_summary ul li:nth-child(2),
#candidate_summary ul li:nth-child(3), #running_mate_summary ul li:nth-child(2) {
    display: none;
}
`

let z = new MutationObserver((mutationsList, observer) => {
    let runningMateSummary = document.querySelector("#running_mate_summary");
    if (runningMateSummary && runningMateSummary.children[0].children[2].innerHTML != runningMateSummary.children[0].children[2].innerHTML.replaceAll("Home State", "Constituency")) {
        runningMateSummary.children[0].children[2].innerHTML = runningMateSummary.children[0].children[2].innerHTML.replaceAll("Home State", "Constituency");
    }
});


z.observe(document, { subtree: true, childList: true });

// Initialise custom music

$("#music_player")[0].children[0].style.display="none"
$("#music_player")[0].children[1].style.display="none"

document.getElementById("modLoadReveal").style.display="none"
document.getElementById("modloaddiv").style.display="none"

musicBox = document.getElementById("music_player")
musicBox.style.display=""

var trackSel;
e = campaignTrail_temp
e.selectedSoundtrack = 0

toTime = (seconds) => {
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

generateTime = () => {
    // Get the audio element
    var audio = document.getElementById("campaigntrailmusic");

    timeTracker = document.createElement("div");
    timeTracker.style = `
      text-align:left;
      border-style:solid;
      border-width:3px;
      height:150px;
      width:200px;
      background-color:#999999;
      float:right;
      padding: 10px;
    `
    $("#trackSelParent")[0].prepend(timeTracker);
    $("#trackSelParent")[0].prepend(document.createElement("br"));

    // Create a new element to display the current position of the audio
    var positionDisplay = document.createElement("gg");
    positionDisplay.id = "position-display";

    // Create a new slider element to change the time
    var timeSlider = document.createElement("input");
    timeSlider.type = "range";
    timeSlider.min = 0;
    timeSlider.max = 1;
    timeSlider.step = 0.001;
    timeSlider.value = 0;
    timeSlider.style.width = "200px";
    timeSlider.id = "time-slider";

    var pausePlay = document.createElement("button");
    pausePlay.id = "position-display";
    pausePlay.innerHTML = "<b>Pause</b>"
    pausePlay.style.width = "100%";


    pausePlay.addEventListener("click", event => {
      event.preventDefault();
      updatePositionDisplay();
      let audio = document.getElementById("campaigntrailmusic");
      if (audio.paused) {
        audio.play();
        event.target.innerHTML = "<b>Pause</b>";
        return;
      }
      audio.pause();
      event.target.innerHTML = "<b>Play</b>";
      return;
    })

    var volumeLabel = document.createElement("gg");
    volumeLabel.id = "volume-label";
    volumeLabel.innerHTML = "<br><b>Volume: </b>"

    var volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.001;
    volumeSlider.value = 0;
    volumeSlider.style.width = "200px";
    volumeSlider.id = "volume-slider";

    volumeSlider.value = audio.volume;

    timeTracker.appendChild(pausePlay);
    timeTracker.appendChild(document.createElement("br"));
    timeTracker.appendChild(document.createElement("br"));
    timeTracker.appendChild(positionDisplay);
    timeTracker.appendChild(timeSlider);
    timeTracker.appendChild(volumeLabel);
    timeTracker.appendChild(volumeSlider);

    updatePositionDisplay();

    //for (let i = 0; i < 10; i++)
    //timeTracker.append(document.createElement("br"));


    // Function to update the position display
    function updatePositionDisplay() {
      positionDisplay.innerHTML = "<b>Time:</b> " + toTime(audio.currentTime) + "<br>";
      timeSlider.value = audio.duration ? audio.currentTime / audio.duration : 0;
    }

    // Function to change the time of the audio
    function changeTime() {
      positionDisplay.innerHTML = "<b>Time:</b> " + toTime(audio.currentTime) + "<br>";
      audio.currentTime = timeSlider.value * audio.duration;
    }

    updateVolume = event => {
      audio.volume = event.target.value;
    }
    
    // Update the position display and slider every second
    setInterval(updatePositionDisplay, 1000);

    // Listen for changes to the time slider and change the time of the audio
    timeSlider.addEventListener("input", changeTime);
    volumeSlider.addEventListener("input", updateVolume)
}

function newMusicPlayer() {
  trackSel = document.createElement("div");
  trackSel.id = "trackSelParent"
  let z = `<br><br><br><br><br><br><br><br><br><br><div id='trackSel' style="text-align:left;border-style:solid;border-width:3px;overflow-y: scroll;overflow-x: hidden;height:200px; width:400px;background-color:#999999;float:right;">`
  z += `<b><select id='selectSoundtrack'><option value='`+soundtracks[e.selectedSoundtrack].name+`'>`+soundtracks[e.selectedSoundtrack].name+"</option>"
  for (i in soundtracks) {
    if (soundtracks[e.selectedSoundtrack] != soundtracks[i]) {
      z += `<option value='`+soundtracks[i].name+`'>`+soundtracks[i].name+`</option>`
    }
  }
  z += `</select></b><br><br>`
  // <label><input type="radio" name="option" value="option1">Option 1</label><br>
  for (i in soundtracks[e.selectedSoundtrack].tracklist) {
    let a = soundtracks[e.selectedSoundtrack].tracklist[i]
    let b = `<label><input class="trackSelector" type="radio" name="trackSelector" value="`+i+`">`+a.name+`</label><br>`
    z += b
  }
  z += "</div><br><br>"
  trackSel.innerHTML = z

  // select correct song

  musicBox.appendChild(trackSel);
  Array.from(document.getElementById("trackSel").children).filter(f=>{
    return f.tagName == "LABEL"
  }).map(f=>f.children[0])[0].checked = true

  // set soundtrack changer

  soundtrackSelector = document.getElementById("selectSoundtrack")
  soundtrackSelector.onchange = function() {
    for (i in soundtracks) {
      if (soundtracks[i].name == soundtrackSelector.value) {
        e.selectedSoundtrack = i
        break
      }
    }
    document.getElementById("trackSelParent").remove()
    newMusicPlayer()
  }

  var matches = document.querySelectorAll('.trackSelector');

  for (match in matches) {
    matches[match].onchange = function() {
      audio = $("#campaigntrailmusic")[0];
      audio.src = soundtracks[e.selectedSoundtrack].tracklist[this.value].url
      audio.currentTime = 0
    }
  }

  musicBox.children[2].loop = false
  musicBox.children[2].src = soundtracks[e.selectedSoundtrack].tracklist[0].url

  musicBox.children[2].onended = function() {
    console.log("next track")
    let selected = Number(document.querySelector('input[name="trackSelector"]:checked').value);
    let newSel = clamp(selected+1, soundtracks[e.selectedSoundtrack].tracklist.length-1, 0)
    let buttons = Array.from(document.getElementById("trackSel").children).filter(f=>{
      return f.tagName == "LABEL"
    }).map(f=>f.children[0])
    //let selectedIndex = buttons.map(f=>f.children[0]).map(f=>f.checked)
    buttons[newSel].click()
  }

  for (w = 0; w < 7; w++) {
    document.getElementById("trackSelParent").appendChild(document.createElement("br"))
  }
  
  generateTime();
}

clamp = function(a, max, min, overflow=true) {
  if (overflow) {
    return a > max ? min : a < min ? max : a;
  }
  return a > max ? max : a < min ? min : a;
}

// Track list

var soundtracks = {
  0: {
    name: "Gillards Greatests",
    tracklist: [
      {
        "name": "",
        "url": ""
      },
      {
        "name": "",
        "url": ""
      },
    ]
  }
}

var soundtracks = {
  0: {
    name: "Tony's Tracks",
    tracklist: [
      {
        "name": "",
        "url": ""
      },
      {
        "name": "",
        "url": ""
      },
    ]
  }
}

// Set up new music player

newMusicPlayer()



campaignTrail_temp.election_json = [
  {
    "model": "campaign_trail.election",
    "pk": 20,
    "fields": {
      "year": 2010,
      "summary": "<div style='overflow-y:scroll;height:200px;'><p>Since Labor was swept into office in 2007, there has been much controversy surrounding the time of Kevin Rudd’s tenure. Now, it has gotten to the point of a leadership spill in the party. Rudd’s most loyal deputy, Julia Gillard was elected leader of Labor, and the first Female Prime Minister. Now, Gillard has made the decision to call an election, and polls are saying it will be a tight race between her, and controversial Liberal Opposition leader, Tony Abbott.</p><p>- Labor lead under Julia Gillard must fight through the controversies and darkness of the Labor factions to unite the party to win an overall majority, but that will prove difficult with a leaker.</p><p>- The Liberal/National Coalition lead by Tony Abbott will need to emphasise the point of the instability within Labor, and highlight Liberal/National policy and unite the base after their 2007 loss.</p><p>This election is make or break for both parties.</p></div>",
      "image_url": "https://media.discordapp.net/attachments/827378337894236170/1147371694030344222/Australia_2010.jpg",
      "winning_electoral_vote_number": 76,
      "advisor_url": "",
      "recommended_reading": "",
      "has_visits": 1,
      "no_electoral_majority_image": ""
    }
  }
]
campaignTrail_temp.candidate_json = [
  {
    "model": "campaign_trail.candidate",
    "pk": 200,
    "fields": {
      "first_name": "Australian Labor Party - ",
      "last_name": "ALP",
      "election": 20,
      "party": "Labor",
      "state": "Canberra",
      "priority": 1,
      "description": "<p>After 11 years in opposition, Labor was swept into power at the 2007 election under Kevin Rudd, defeating John Howard and the Liberal/National Coalition. Things seemed to go well, until the Rudd Government was facing turmoil over senate blockages thanks to the Liberals and the Greens. With this, Rudd’s leadership was in tatters, and a leadership vote was called for, resulting in Julia Gillard being elected Labor leader, and the first female Prime Minister of Australia.<p/><p>In only 3 years of Government, the party's reputation is going down the drain fast, and Labor under Gillard needs to save the party to win at the 2010 election she called. However, this will be proven difficult with a leaker at hand. With Labor narrowly leading, the party must find ways to win.<p>",
      "color_hex": "#E34F49",
      "secondary_color_hex": "#E34F49",
      "is_active": 1,
      "image_url": "https://media.discordapp.net/attachments/827378337894236170/1147373908694147142/image.png",
      "electoral_victory_message": "<h3></h3><p><p/>",
      "electoral_loss_message": "<h3></h3><p></p>",
      "no_electoral_majority_message": "<h3></h3><p></p>",
      "description_as_running_mate": "'",
      "candidate_score": 1
    }
  },
  {
    "model": "campaign_trail.candidate",
    "pk": 201,
    "fields": {
      "first_name": "Liberal/National Coalition - ",
      "last_name": "L/NP",
      "election": 20,
      "party": "Liberal",
      "state": "Canberra",
      "priority": 2,
      "description": "<p>After 11 years of Government, it came to a screeching holt with John Howard losing the election and Labor winning the 2007 election. Since then, Brendan Nelson, Malcolm Turnbull have lead the Liberal/National Coalition within those 3 years, and finally resting upon Tony Abbott to lead them into the 2010 election. Abbott’s main focus in the campaign will be the instability of the Labor Party and the Government.</p><p>The polls are too close to call, and the Liberals are just under Labor in the polls. The Liberals under Tony Abbott will need to focus on Coalition policies and attack the Labor party for their disastrous 3 years in power and instability. With a leaker in Labor, Abbott can take advantage of the proven leads which will either provide fatal or handy.</p>",
      "color_hex": "#0055A5",
      "secondary_color_hex": "#0055A5",
      "is_active": 1,
      "image_url": "https://cdn.discordapp.com/attachments/818130397706846242/1052911533069447208/libLogo.png",
      "electoral_victory_message": "<h3></h3><p></p> ",
      "electoral_loss_message": "<h3></h3><p></p>",
      "no_electoral_majority_message": "<h3></h3><p></p>",
      "description_as_running_mate": "'",
      "candidate_score": 1
    }
  },
  {
    "model": "campaign_trail.candidate",
    "pk": 202,
    "fields": {
      "first_name": "Australian Greens - ",
      "last_name": "GRN",
      "election": 20,
      "party": "Greens",
      "state": "Canberra",
      "priority": 3,
      "description": "'",
      "color_hex": "#ddd175",
      "secondary_color_hex": "#ddd175",
      "is_active": 0,
      "image_url": "'",
      "electoral_victory_message": "'",
      "electoral_loss_message": "'",
      "no_electoral_majority_message": "'",
      "description_as_running_mate": "'",
      "candidate_score": 1
    }
  },
  {
    "model": "campaign_trail.candidate",
    "pk": 203,
    "fields": {
      "first_name": "Independents - ",
      "last_name": "IND",
      "election": 20,
      "party": "Non-Alligned",
      "state": "Canberra",
      "priority": 4,
      "description": "'",
      "color_hex": "#aaaaaa",
      "secondary_color_hex": "##aaaaaa",
      "is_active": 0,
      "image_url": "'",
      "electoral_victory_message": "'",
      "electoral_loss_message": "'",
      "no_electoral_majority_message": "'",
      "description_as_running_mate": "'",
      "candidate_score": 1
    }
  },



  
  {
    "model": "campaign_trail.candidate",
    "pk": 204,
    "fields": {
      "first_name": "Julia",
      "last_name": "Gillard",
      "election": 20,
      "party": "Labor",
      "state": "Lalor, Victoria",
      "priority": 5,
      "description": "'",
      "color_hex": "#FF0000",
      "secondary_color_hex": "#FFA0A0",
      "is_active": 0,
      "image_url": "https://media.discordapp.net/attachments/827378337894236170/1147370370236698644/Julia-Gillard-2012.png?width=294&height=408",
      "electoral_victory_message": "'",
      "electoral_loss_message": "'",
      "no_electoral_majority_message": "'",
      "description_as_running_mate": "<p>Once a Loyal Deputy Prime Minister, turned backstabber. On June 24th, 2010, Gillard, along with several other members of the Labor Caucus launched a leadership spill upon incumbent Prime Minister Kevin Rudd. Rudd had pulled out of the contest, leaving Gillard to win the race unopposed. With that, Gillard had faced the media, announcing she had won the ballot and became the first woman Prime Minister of Australia.<p/><p>Now, she is in a very tough spot, with the Coalition hitting at her and the party after the unstable and rocky past 3 years of the Rudd Government. Now, Gillard has called the election. This election will either make or break the Party, as Gillard's main focus is to have a disciplined campaign like in 2007, and unite the party base as a whole.</p><p>But things will be proven difficult for her, as a leaker is at hand, and the Coalition will not stop attacking the Party, and Julia herself. It will be a fight for survival.</p>",
      "candidate_score": 0
    }
  },
  {
    "model": "campaign_trail.candidate",
    "pk": 209,
    "fields": {
      "first_name": "Tony",
      "last_name": "Abbott",
      "election": 20,
      "party": "Liberal",
      "state": "Warringah, New South Wales",
      "priority": 9,
      "description": "'",
      "color_hex": "#0000FF",
      "secondary_color_hex": "#90C0FF",
      "is_active": 0,
      "image_url": "https://media.discordapp.net/attachments/827378337894236170/1147370479020150864/Tony_Abbott_-_2010.png?width=309&height=408",
      "electoral_victory_message": "'",
      "electoral_loss_message": "'",
      "no_electoral_majority_message": "'",
      "description_as_running_mate": "<p>The former minister under John Howard’s tenure and infamous Health Minister who once said “That's Bullshit” on national television during a health minister debate. Abbott now leads the Liberal/National coalition after it had dumped 2 previous leaders, Brendan Nelson, and Malcolm Turnbull.<p/><p>Abbott will have to take advantage of the disunited Labor Party and continue to hammer at them for their failures over the past 3 years and the recent leadership spill before the election. Abbott is in a very easy spot compared to Julia Gillard and may set to win Government, but Gillard and Labor are not going down without a fight.</p><p>Fortunately for him, there is a leaker at hand within the Labor Party, and Abbott can take full advantage of that, for better or for worse.</p>",
      "candidate_score": 0
    }
  }
]
campaignTrail_temp.running_mate_json = [
  {
    "model": "campaign_trail.running_mate",
    "pk": 9980,
    "fields": {
      "candidate": 201,
      "running_mate": 209
    }
  },
  {
      "model": "campaign_trail.running_mate",
      "pk": 9980,
      "fields": {
        "candidate": 200,
        "running_mate": 204
      }
    }
]
campaignTrail_temp.opponents_default_json = [
  {
    "election": 20,
    "candidates": [
      200,
      201,
      202,
      203
    ]
  }
]
campaignTrail_temp.opponents_weighted_json = [
  {
    "election": 20,
    "candidates": [
      200,
      201,
      202,
      203
    ]
  }
] 
campaignTrail_temp.global_parameter_json = [
  {
    "model": "campaign_trail.global_parameter",
    "pk": 1,
    "fields": {
      "vote_variable": 1.125,
      "max_swing": 0.12,
      "start_point": 0.94,
      "candidate_issue_weight": 10,
      "running_mate_issue_weight": 3,
      "issue_stance_1_max": -0.71,
      "issue_stance_2_max": -0.3,
      "issue_stance_3_max": -0.125,
      "issue_stance_4_max": 0.125,
      "issue_stance_5_max": 0.3,
      "issue_stance_6_max": 0.71,
      "global_variance": 0.01,
      "state_variance": 0.005,
      "question_count": 25,
      "default_map_color_hex": "#C9C9C9",
      "no_state_map_color_hex": "#999999"
    }
  }
]
//campaignTrail_temp.candidate_dropout_json = JSON.parse("[{\"model\": \"campaign_trail.candidate_dropout\", \"pk\": 1, \"fields\": {\"candidate\": 36, \"affected_candidate\": 18, \"probability\": 1.0}}]"); // this is probably unnneeded
campaignTrail_temp.temp_election_list = [
  {
    "id": 20,
    "year": 2016,
    "is_premium": 0,
    "display_year": "2010Aus"
  }
]
campaignTrail_temp.credits = 'SergeantAnderson'

document.getElementById("header").src = "https://media.discordapp.net/attachments/1036555980445597737/1158367000335228959/Australia_2010_Banner_Revamp.jpg?ex=65520a56&is=653f9556&hm=10ebfe6f48a358add9a0e1f48ed80b90a1a74fd51594a48e5a35d3da0e609876&="
nct_stuff.themes[nct_stuff.selectedTheme].coloring_title = "#010a1c"
nct_stuff.themes[nct_stuff.selectedTheme].coloring_window = "#013766"
document.getElementsByClassName("game_header")[0].style.backgroundColor = nct_stuff.themes[nct_stuff.selectedTheme].coloring_title
$(".container")[0].style.backgroundColor = "#ac0e28"
document.body.background = "https://media.discordapp.net/attachments/941097823900942366/1053117600684593182/HOR-I-002_130438_581_Reps.png?width=614&height=408" 
