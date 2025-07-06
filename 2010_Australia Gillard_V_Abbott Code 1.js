const introTitle = document.querySelector("#inner_window_1 h3");
if (introTitle) {
	introTitle.textContent = "Do you have what it takes to win the 2010 Federal Election?";
  }

document.getElementById("inner_window_1").children[1].innerHTML = `<li>Can you win the 2010 Australian Federal Election?</li><li>Heading into the race, you'll face off against either the Incumbent Australian Labor Party or the Liberal/National Coalition, depending who you choose to play as.</li><li>The answers you choose along the Campaign Trail will affect your popularity with the public for better or for worse.</li><li>Appeal to the people across Australia to get them to put their first preference for your party.</li><li>Defy the polls and either form a Majority Government, or if not, form a strong Minority Government with Crossbench MP's</li>`;
document.styleSheets[0].insertRule(".inner_window_w_desc{ margin:1em 0 0 0.5em !important;padding-top: 0.5em !important;}", 0);
document.styleSheets[0].insertRule(".inner_window_question{ margin:1em 0 .7em 0.5em !important;padding-top: 0.3em !important;}", 0);
document.styleSheets[0].insertRule("#main_content_area { height:82% !important;}", 0);

campaignTrail_temp.show_premium = true;
campaignTrail_temp.premier_ab_test_version = -1;

let style = document.createElement('style');style.innerHTML = `#overall_result {overflow: auto;}`;document.head.appendChild(style);


quotes = [
    `"I will not be lectured about Sexism and Misogyny by this man, I will not!" - Julia Gillard`,
    `"HAHAHAHA, Shit Happens." - Tony Abbott`,
    `"Short-term thinking is the greatest enemy of good government." - Anthony Albanese`,
    `"If we boost productivity, we can improve economic growth." - Tony Abbott`,
    `"Julia Gillard in 2010!"`,
    `"Tony Abbott in 2010!"`,
]

selQuote = quotes[Math.round(Math.random()*(quotes.length - 1))]
corrr = `<h2>THE DOWN UNDER TRAIL, 2010</h2><font id="wittyquote" size="4" color="white"><em>` + selQuote + `</em></font>`
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
    if (runningMateSummary && runningMateSummary.children[0].children[2].innerHTML != runningMateSummary.children[0].children[2].innerHTML.replaceAll("Home State", "Division")) {
        runningMateSummary.children[0].children[2].innerHTML = runningMateSummary.children[0].children[2].innerHTML.replaceAll("Home State", "Division");
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
    name: "The Hits of Australia",
    tracklist: [
      {
        "name": "Guy Sebastian - Like It Like That",
        "url": "https://audio.jukehost.co.uk/2XJmO8iFf6kuXbxyMLm41fPVACeEijCb"
      },
      {
        "name": "Jessica Mauboy - Burn",
        "url": "https://audio.jukehost.co.uk/u93IvDODcBiUKwg9CRv3gnZFOfc7yvdZ"
      },
         {
        "name": "Birds of Tokyo - Plans",
        "url": "https://audio.jukehost.co.uk/RvS0hzjTiZmmfewmGwUEYprL4P3vxXAQ"
      },
         {
        "name": "Yolanda Be Cool & DCUP - We No Speak Americano",
        "url": "https://audio.jukehost.co.uk/ENHEPuEvKLYSy7PfG9FC0K3C6KgYp0K9"
      },
      {
        "name": "Empire of the Sun - Walking on a Dream",
        "url": "https://audio.jukehost.co.uk/2XJmO8iFf6kuXbxyMLm41fPVACeEijCb"
      },
    ]
  },
  1: {
    name: "Hits of the New Decade",
    tracklist: [
         {
        "name": "Maroon 5 - Misery",
        "url": "https://audio.jukehost.co.uk/2uQ7ZLAV1MWkqtGTWd8sVKSqEVTGzWiN"
      },
      {
        "name": "Katy Perry - California Gurls (Feat. Snoop Dogg)",
        "url": "https://audio.jukehost.co.uk/zRTT3FtJCNoJBJNm4IRgfpplsxcK9p20"
      },
      {
        "name": "Taio Cruz - Dynamite",
        "url": "https://audio.jukehost.co.uk/975oC94jUKRrUeqkkSBFdommAseWnLoF"
      },
        {
        "name": "Maroon 5 - Moves Like Jagger (Feat. Christina Aguilera)",
        "url": "https://audio.jukehost.co.uk/QbtK91y9OCgURhsybsHEAMpJerOqq7PH"
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
      "summary": "<div style='overflow-y:scroll;height:200px;'><p>Since Labor was swept into office in 2007, there has been much controversy surrounding the time of Kevin Rudd’s tenure. Now, it has gotten to the point of a leadership spill in the party. Rudd’s most loyal deputy, Julia Gillard was elected leader of Labor, and the first Female Prime Minister. Now, Gillard has made the decision to call an election, and polls are saying it will be a tight race between her, and controversial Liberal Opposition leader, Tony Abbott.</p><p><ul><li>Labor lead under Julia Gillard must fight through the controversies and darkness of the Labor factions to unite the party to win an overall majority, but that will prove difficult with a leaker.</li><li>The Liberal/National Coalition lead by Tony Abbott will need to emphasise the point of the instability within Labor, and highlight Liberal/National policy and unite the base after their 2007 loss.</li></ul><p>This election is make or break for both parties.</p></div>",
      "image_url": "https://i.imgur.com/m2oElBN.jpeg",
      "winning_electoral_vote_number": 76,
      "advisor_url": "https://content.api.news/v3/images/bin/af91695117ab7054734ce091627ca175",
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
      "color_hex": "#FF563E",
      "secondary_color_hex": "#FF563E",
      "is_active": 1,
      "image_url": "https://i.imgur.com/K17Wilc.jpg",
      "electoral_victory_message": "<h3></h3><p></p>",
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
      "color_hex": "#336DCF",
      "secondary_color_hex": "#336DCF",
      "is_active": 1,
      "image_url": "https://i.imgur.com/T5YOMgW.jpg",
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
      "first_name": "Independents/Others - ",
      "last_name": "IND/OTH",
      "election": 20,
      "party": "Greens",
      "state": "Canberra",
      "priority": 3,
      "description": "'",
      "color_hex": "#8E8B8B",
      "secondary_color_hex": "#8E8B8B",
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
      "first_name": "Australian Greens - ",
      "last_name": "GRN",
      "election": 20,
      "party": "Non-Alligned",
      "state": "Canberra",
      "priority": 4,
      "description": "'",
      "color_hex": "#19C91E",
      "secondary_color_hex": "#8E8B8B",
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
    "pk": 205,
    "fields": {
      "first_name": "WA Nationals - ",
      "last_name": "WA NAT",
      "election": 20,
      "party": "Non-Alligned",
      "state": "Canberra",
      "priority": 4,
      "description": "'",
      "color_hex": "#204F0B",
      "secondary_color_hex": "#204F0B",
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
      "image_url": "data:image/jpeg;base64,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",
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
      "image_url": "https://moad-electionspeeches.s3.amazonaws.com/uploads/regular_b0e08dda.jpg",
      "electoral_victory_message": "'",
      "electoral_loss_message": "'",
      "no_electoral_majority_message": "'",
      "description_as_running_mate": "<p>The former minister under John Howard’s tenure and infamous Health Minister who once said “That's Bullshit” on national television during a Health Minister's debate. Abbott now leads the Liberal/National coalition after it had dumped 2 previous leaders, Brendan Nelson, and Malcolm Turnbull.<p/><p>Abbott will have to take advantage of the disunited Labor Party and continue to hammer at them for their failures over the past 3 years and the recent leadership spill before the election. Abbott is in a very easy spot compared to Julia Gillard and may set to win Government, but Gillard and Labor are not going down without a fight.</p><p>Fortunately for him, there is a leaker at hand within the Labor Party, and Abbott can take full advantage of that, for better or for worse.</p>",
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
    "display_year": "2010 - Australia"
  }
]
campaignTrail_temp.credits = 'SergeantAnderson'

HistHexcolour=["#FF563E","#336DCF","#8E8B8B","#19C91E"]; // party logo colours
//        HistHexcolour=["#000065","#7F0000","#AAAAAA","#DCD472"]; //matching banner
        HistName=[" Australian Labor Party - ALP"," Liberal/National Coalition - L/NP"," Independents/Others - IND/OTH"," Australian Greens - GRN"];
        HistEV=[72,72,5,1];
        HistPV=["4,711,363","5,365,529","504,134","1,458,998"];
        HistPVP=["37.99%%","43.32%","4.05%","11.76%"];



jet_data = {
  "headerColor": "#7C7C7C",
  "windowColor": "#B4B4B4",
  "containerColor": "#444444",
  "innerWindowColor": "#B4B4B4",
  "bannerImageUrl": "https://imgur.com/LmEllAJ.png",
  "backgroundImageUrl": "https://live-production.wcms.abc-cdn.net.au/b2cac6abc72319058a76ebe408fb0f11?impolicy=wcms_crop_resize&cropH=2000&cropW=2997&xPos=1&yPos=0&width=862&height=575",
  "endingTextColor": "#ffffff",
}



nct_stuff.themes[nct_stuff.selectedTheme].coloring_title = "#7C7C7C";

nct_stuff.themes[nct_stuff.selectedTheme].coloring_window = "#B4B4B4";

document.getElementsByClassName("game_header")[0].style.backgroundColor = nct_stuff.themes[nct_stuff.selectedTheme].coloring_title;

$("#game_window")[0].style.backgroundColor = nct_stuff.themes[nct_stuff.selectedTheme].coloring_window;

$(".container")[0].style.backgroundColor = "#444444";

document.getElementById("header").src = "https://i.imgur.com/kEHwlHH.png";

document.body.background = "https://live-production.wcms.abc-cdn.net.au/b2cac6abc72319058a76ebe408fb0f11?impolicy=wcms_crop_resize&cropH=2000&cropW=2997&xPos=1&yPos=0&width=862&height=575";

document.head.innerHTML += "<style>#results_container {color:#ffffff;} .inner_window_w_desc {background-color:#444444!important;}</style>";

//#endcode

