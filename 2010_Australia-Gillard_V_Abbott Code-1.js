campaignTrail_temp.modBoxTheme = {
     "header_color": "#444444",
     "header_text_color": "#000000",
     "description_text_color": "#0f0f0f",
     "description_background_color": "#ffffff",
     "main_color": "#7c7c7c",
     "secondary_color": "#444444",
     "ui_text_color": "#ffffff"
}

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

campaignTrail_temp.achievements = {
    "A Ruddless Victory" : {
        "image" : "https://i.imgur.com/ClPV9fn.png",
        "description" : "As Julia Gillard, win the election by dumping Kevin Rudd as Labors candidate for the seat of Griffith.",
        "cannotBeCheated" : true
    },
    "The Taxing Queen" : {
        "image" : "https://i.imgur.com/niM87y7.png",
        "description" : "As Julia Gillard, win the elction while promitising to introduce a Carbon Tax and Mining Tax.",
        "cannotBeCheated" : true
    },
    "The More, The Merrier" : {
        "image" : "https://i.imgur.com/e0LvfTc.png",
        "description" : "As Julia Gillard, win more than 83 seats, beating Rudd's 2007 margin.",
        "cannotBeCheated" : true
    },

     "Finish What You Started" : {
        "image" : "https://i.imgur.com/XGoGdRA.png",
        "description" : "As Tony Abbott, win the election and win more than 94 seats, beating John Howards 1996 record.",
        "cannotBeCheated" : true
    },
     "The Independent Kingmaker" : {
        "image" : "https://i.imgur.com/1l9Biep.png",
        "description" : "As Tony Abbott, win at least 75 seats and get Bob Katter to give condifence and supply.",
        "cannotBeCheated" : true
    },
     "The Coal-Free Liberal" : {
        "image" : "https://i.imgur.com/TmLvqvR.png",
        "description" : "As Tony Abbott, win while backing major climate iniciatives.",
        "cannotBeCheated" : true
    },
}

quotes = [
    `"Through hard work and education, we can deliver a strong economy and oppotunity for all." - Julia Gillard`,
    `"Short-term thinking is the greatest enemy of good government." - Anthony Albanese`,
    `"If we boost productivity, we can improve economic growth." - Tony Abbott`,
    `"Let's Move Australia Forward."`,
    `"Standing up for Australia."`,
]

selQuote = quotes[Math.round(Math.random()*(quotes.length - 1))]
corrr = `<h2>The 2010 Australian Federal Election</h2><font id="wittyquote" size="4" color="white"><em>` + selQuote + `</em></font>`
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

campaignTrail_temp.election_json = [
  {
    "model": "campaign_trail.election",
    "pk": 20,
    "fields": {
      "year": 2010,
      "summary": "<div style='overflow-y:scroll;height:200px;'><p>Since Labor was swept into office in 2007, there has been much controversy surrounding the time of Kevin Rudd’s tenure. Rudd’s most loyal deputy, Julia Gillard was elected leader of Labor and the first Female Prime Minister after a leadership spill months before the election. Polls are saying it will be a tight race between her, and controversial Liberal Opposition leader, Tony Abbott.</p><p><ul><li>Labor under Julia Gillard must navigate internal divisions and controversies to unite the party and secure whatever majority she can, all while managing leaks within the ranks.</li><li>The Liberal/National Coalition lead by Tony Abbott will need to emphasise the point of the instability within Labor, and highlight Liberal/National policy and unite the base after their 2007 loss.</li></ul><p>This election is a make-or-break moment for both parties as they seek to lead Australia into the new decade.</p></div>",
      "image_url": "https://i.imgur.com/m2oElBN.jpeg",
      "winning_electoral_vote_number": 76,
      "advisor_url": "https://i.imgur.com/e359GWl.png",
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
      "image_url": "https://i.imgur.com/YMkANqC.png",
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

e.credits = "<button onclick='credits()'>Various people</button>";
  
credits = function() {
    credits = ["LEAD DEVELOPER", "SergeantAnderson", "", "WRITING", "SergeantAnderson", "", "CODE", "SergeantAnderson", "CatBox", "muastronaut", "", "MAP", "CatBox", "", "PLAYTESTERS", "TotalRozza", "Quartz", "Killeritch", "Jeeve", "_mango", "JustAlex"]
    text = "CREDITS:\n\n"
    for (i in credits) {
        text += credits[i] + "\n"
    }
    alert(text)
}

HistHexcolour=["#FF563E","#336DCF","#8E8B8B","#19C91E"]; // party logo colours
//        HistHexcolour=["#000065","#7F0000","#AAAAAA","#DCD472"]; //matching banner
        HistName=[" Australian Labor Party - ALP"," Liberal/National Coalition - L/NP"," Independents/Others - IND/OTH"," Australian Greens - GRN"];
        HistEV=[72,72,5,1];
        HistPV=["4,711,363","5,365,529","504,134","1,458,998"];
        HistPVP=["37.99%","43.32%","4.05%","11.76%"];

const touched = new WeakSet();
const prevContent = new WeakMap();
    const el = document.querySelector("#state_info > p:nth-of-type(2)");

    if (el && !touched.has(el)) {
        el.textContent = el.textContent.replace(/Electoral Votes:/, "Seat:")
        touched.add(el);
    }

const replaceTextContent = (el, find, replace) => {
    el.textContent = el.textContent.replace(find, replace);
}

const changeTextObs = new MutationObserver(() => {
    const els = [
        { selector: "#state_info > h3", change: (el) => el.textContent = "SEAT SUMMARY" },
        { selector: "#state_info > p:nth-of-type(2)", change: (el) => replaceTextContent(el, "Electoral Votes:", "Seats") },
        { selector: "#pvswitcher", change: (el) => replaceTextContent(el, "State", "Seat"), persist: true },
        { selector: "#ev_est", change: (el) => replaceTextContent(el, "Electoral Vote", "Total Seat") },
    ];

    for (const { selector, change, persist = false } of els) {
        const el = document.querySelector(selector);
        if (!el) continue;

        if (persist) {
            const prev = prevContent.get(el);
            if (el.textContent !== prev) {
                change(el);
                prevContent.set(el, el.textContent);
            }
        }
        else if (!touched.has(el)) {
            change(el);
            touched.add(el);
        }
    }
});
const target = document.getElementById("game_window");

changeTextObs.observe(target, {
    childList: true,
    subtree: true,
    characterData: true,
});



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

function addDynamicCSS() {
    var css = `
        .inner_window_question h3 .mytooltip{
            background-color: lightskyblue;
        }

        .mytooltip {
            position: relative;
            display: inline-block;
            cursor: pointer;
            background-color: lightblue;
        }

        .mytooltip .mytooltiptext {
            width: 240px;
            background-color: lightblue;
            color: black;
            text-align: center;
            border-radius: 6px;
            padding: 10px;
            position: absolute;
            z-index: 99;
            bottom: 20%;
            left: 20%;
            margin-left: -90px;
            opacity: 0;
            transition: opacity 0.3s;
            border: 1px solid black;
            pointer-events: none;
            font-size: 13px !important;
            line-height: 1.5em !important;
            font-weight: normal !important;
            font-style: normal !important;
        }

        .mytooltip .mytooltiptext img {
            max-width: 240px;
            height: auto;
        }

        .mytooltip:hover .mytooltiptext {
            opacity: 1;
            transition-delay: 0.5s;
        }
    `;

    var styleElem = document.createElement('style');
    styleElem.type = 'text/css';
    
    styleElem.appendChild(document.createTextNode(css));
    
    document.head.appendChild(styleElem);
}

{

addDynamicCSS();

tooltipList = [
    {searchString: "Kevin Rudd", explanationText: "Kevin Rudd had served as The 26th Prime Minister of Australia, and former leader of the Australian Labor Party. Rudd had held several Shadow Ministerial positions under Kim Beazley, Simon Crean and Mark Latham. Rudd is currently serving as the Member for Griffith, Queensland and has been since 1998. <img src=https://images.sbs.com.au/dims4/default/e04bc1c/2147483647/strip/true/crop/800x450+0+31/resize/1280x720!/quality/90/?url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2Fdrupal%2Fnews%2Fpublic%2Fimages%2Fi%2Fn%2FIndigenous_4-3_13467715_1828576_20180212180224e74d006e-7611-4044-800c-239348fb3a4a.jpg_sd_800x600.jpg>"},
    {searchString: "Mark Arbib", explanationText: "Mark Arbib serves as a Labor Senator for New South Wales. He served as the Minister for Employment Participation under the Rudd Government. Arbib has been Senator since 2008. <img src=https://content.api.news/v3/images/bin/53e4d4b314efc4f6c4334fcc498ce24d>"},
    {searchString: "National Broadband Network", explanationText: "The Rudd Government launched the National Broadband Network to deliver high-speed internet across Australia, particularly to regional and rural areas. <img src=https://hsmit.com.au/wp-content/uploads/2020/03/NBN.jpg>"},
    {searchString: "Governor General", explanationText: "Quentin Bryce serves as the 25th Governor General of Australia. She has made history as the first female Governor General in Australian History. <img src=https://cef.org.au/wp-content/uploads/2014/03/The-Honourable-Dame-Quentin-Bryce-AD-CVO-blog-header.jpg>"},
    {searchString: "Medicare", explanationText: "Medicare is Australia's universal health insurance scheme. It allows a access to a wide range of health and hospital services at little to no cost. Medicare was introduced in 1984 under the Labor lead Hawke Government. <img src=https://www.head2toe.com.au/wp-content/uploads/2023/10/physio-fixx-Medicare-Enhanced-Primary-Care-Program_sm.webp>"}, 
    {searchString: "Great Financial Crisis", explanationText: "The Global Financial Crisis of 2008 had occured due to massive worldwide economic downturns and a strained Housing Market in the United States. Under the Rudd Government, Australia avoided the worst of the recession through the introduction of stimulus packages through until 2009."},
    {searchString: "GFC", explanationText: "TThe Global Financial Crisis of 2008 had occured due to massive worldwide economic downturns and a strained Housing Market in the United States. Under the Rudd Government, Australia avoided the worst of the recession through the introduction of stimulus packages through until 2009."},
    {searchString: "2008", explanationText: "The Global Financial Crisis of 2008 had occured due to massive worldwide economic downturns and a strained Housing Market in the United States. Under the Rudd Government, Australia avoided the worst of the recession through the introduction of stimulus packages through until 2009."},
    {searchString: "WorkChoices", explanationText: "Federal industrial relations laws in Australia by the Howard government in 2005. Scrapped by the Rudd Government in 2008.<img src=https://www.crikey.com.au/wp-content/uploads/sites/3/2015/08/workchoices.png>"},
    {searchString: "John Howard", explanationText: "John Howard served as the 25th Prime Minister of Australia from 1996 to 2007. He lost his seat of Bennelong in the 2007 election to Labor's Maxine McKew. Howard served under multiple ministerial positions through the 1970s and shadow ministerial positions in the 1980s and 1990s. His experience in these roles culminated in his first elevation to the leadership of the Liberal Party, where he led the Coalition to defeat in 1987. Howard served in Parliament from 1974 until 2007. <img src=https://i.guim.co.uk/img/static/sys-images/Sport/Pix/pictures/2010/6/30/1277884170346/John-Howard-006.jpg?width=465&dpr=1&s=none&crop=none>"},
    {searchString: "2007 Election", explanationText: "In 2007, Kevin Rudd led Labor to a decisive victory over the Howard Government, ending over a decade of Coalition rule. The result was seen as a mandate for change."},
    {searchString: "Anna Bligh", explanationText: "Bligh serves as the 37th Premier of Queensland, taking over from Peter Beattie. Bligh lead Labor to victory in 2009, having made history as the first woman Premier of Queensland being elected. <img src= https://alumni.uq.edu.au/files/46090/Anna_Bligh.jpg>"},
    {searchString: "Kristina Keneally", explanationText: "Keneally serves as the 42nd Premier of New South Wales. After former Premier Nathan Rees resigned, she took on the role of leading an unpopular Government due to internal party unrest and corruption. Ahead of the 2011 State election, she faces challenges due to voter dissatisfaction and instability within the Government.<img src= https://bonzablogger.wordpress.com/wp-content/uploads/2010/12/keneallyinparl.jpg>"},
    {searchString: "Brendan Nelson", explanationText: "Brendan Nelson formerly served as Opposition leader since 2007, and lead the Liberal/National Coalition until 2008 and retired. Nelson served as the MP for Bradfield, New South Wales, since 1996, retiring as member in 2009.. <img src= https://live-production.wcms.abc-cdn.net.au/aa55c2061e596d0f9da8060fb401b7a7?impolicy=wcms_crop_resize&cropH=337&cropW=600&xPos=0&yPos=0&width=862&height=485>"},
    {searchString: "Malcolm Turnbull", explanationText: "Malcolm Turnbull formerly served as Opposition Leader after Nelson retired. Turnbull has led the Coalition* from 2008 to 2009nwhen he was narrowly defeated by Tony Abbott in a leadership spill by just one vote. He has been the Member for Wentworth since 2004. <img src= https://live-production.wcms.abc-cdn.net.au/308c21aed0eed96a1fdc0544327d30c4?impolicy=wcms_crop_resize&cropH=472&cropW=840&xPos=0&yPos=0&width=862&height=485>"},
    {searchString: "Mining Tax", explanationText: "The Rudd Government in 2009 had proposed a tax on mining companies super profits. This would have lead to Australians reciebing a fare share of wealth from resources. The plan backfired however from the Federal Opposition and Mining industry. Many believe that this elad to the downfall of Kevin Rudd as Prime Minister. <img src= https://live-production.wcms.abc-cdn.net.au/7d64a487f99d8dd722df60d1ff0841b0?impolicy=wcms_crop_resize&cropH=472&cropW=840&xPos=0&yPos=0&width=862&height=485>"},
    {searchString: "Barack Obama", explanationText: "Elected in 2008, Barack Obama serves as the 44th President of the United States and the first African American President. Since being sworn in, his focus has been on economic recovery and strenghening alliances with nations such as Australia.<img src= https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/January/140127/2D11437520-140124-SOTU-Obama-2010.jpg>"},
    {searchString: "Wayne Swan", explanationText: "Wayne Swan serves as the current Treasurer and now Deputy Prime Minister under the Gillard Government. Swan held the seat of Lilley from 1993-1996, losing it in the Howard Landslide, but won it again in the 1998 Federal Election. <img src= https://live-production.wcms.abc-cdn.net.au/cbd182ef43c83f76aae0ea475070efd9?impolicy=wcms_crop_resize&cropH=1980&cropW=2974&xPos=8&yPos=0&width=862&height=575>"},
    {searchString: "Treasurer", explanationText: "Wayne Swan serves as the current Treasurer and now Deputy Prime Minister under the Gillard Government. Swan held the seat of Lilley from 1993-1996, losing it in the Howard Landslide, but won it again in the 1998 Federal Election. <img src= https://live-production.wcms.abc-cdn.net.au/cbd182ef43c83f76aae0ea475070efd9?impolicy=wcms_crop_resize&cropH=1980&cropW=2974&xPos=8&yPos=0&width=862&height=575>"},
    {searchString: "Afghanistan", explanationText: "Since 2001, Australia has kept a military presence in Afghanistan as part of the U.S. lead coalition fight on the War on Terror."},
    {searchString: "Iraq", explanationText: "Currently, Australian troops have withdrawn from combat roles in Iraq as of the Rudd Government in 2009. Personal remain in non-combat roles in the nation, supporting reconstruction and training."},
    {searchString: "Paul Lucas", explanationText: "Current Deputy Premier of Queensland serving under Anna Bligh. State member for the seat of Lytton in the Queensland Parliament since 1996. Lucas has now been parachuted to the seat of Griffith to fill in for Kevin Rudd <img src= https://live-production.wcms.abc-cdn.net.au/f7e07311d3bd0f5cf1cb7363f0c435f7?impolicy=wcms_crop_resize&cropH=844&cropW=1500&xPos=0&yPos=0&width=862&height=485>"},
    {searchString: "Barry O'Farrell", explanationText: "Barry O'Farrell serves as the Current New South Wales Opposition leader, leading in opinion polls in the state heading into next year's state election. O'Farrell has been a State member for the seat of Ku-ring-gai, representing the seat since 1999. <img src= https://images.theconversation.com/files/181/original/Barry_O_Farrell_for_Gauja.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop>"},
    {searchString: "Campbell Newman", explanationText: "Campbell Newman serves as the Current Queensland Opposition leader, leading the Liberal Natonal Party of Queensland. Newman does not hold a seat in the State Parliament, but will be contesting in the 2012 State Election. <img src= https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/1/28/1422489277781/75879f51-7f89-4103-850c-53bf39c8351e-2060x1236.jpeg?width=465&dpr=1&s=none&crop=none>"},
    {searchString: "Shadow Treasurer", explanationText: "Joe Hockey serves as the Federal Shadow Treasuer and New South Wales MP representing the seat of North Sydney. Hockey has represented the seat since 1996. <img src= https://live-production.wcms.abc-cdn.net.au/259e6eb4432ca865cd68dc85e007211a?impolicy=wcms_crop_resize&cropH=1680&cropW=2982&xPos=0&yPos=128&width=862&height=485>"},

];



//#endcode


}






