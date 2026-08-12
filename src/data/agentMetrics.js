/**
 * GENERATED FILE - do not edit by hand.
 * Produced by rover-data/scripts/build_agent_metrics.py from
 * rover_contact_index.json. Every value here is computed from the contact
 * extract, not authored.
 *
 * Agent-facing KPIs: ahtSeconds, fcrPct, csat. Quality-side fields are present
 * for the Operations and Quality screens and are not shown on the Agent page.
 *
 * coachingPack follows the Micro Coaching Generation Agent card contract.
 * No agent-facing string in a pack references a contact id, a transcript, a
 * QA score or any internal system.
 *
 * Regenerate with:  python3 rover-data/scripts/build_agent_metrics.py
 */

export const WK_LABELS = ["W1", "W2", "W3", "W4", "W5"]
export const COACHING_WEEK_INDEX = 1

export const AGENT_METRICS = {
  "ayanda-mbeki": {
    "name": "Ayanda Mbeki",
    "slug": "ayanda-mbeki",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 189,
    "firstContacts": 125,
    "continuationContacts": 64,
    "ahtSeconds": 350,
    "ahtSeries": [
      370,
      343,
      371,
      314,
      351
    ],
    "fcrPct": 89.9,
    "fcrSeries": [
      97.2,
      87.5,
      88.1,
      94.4,
      82.9
    ],
    "csat": 3.46,
    "csatSeries": [
      3.22,
      3.4,
      3.81,
      3.39,
      3.4
    ],
    "firstCsat": 4.39,
    "continuationCsat": 1.62,
    "qaScore": 90.9,
    "qaSeries": [
      90.3,
      90.3,
      91.5,
      90.8,
      91.7
    ],
    "processAdherencePct": 94.7,
    "resolutionRatePct": 89.9,
    "firstQa": 92.6,
    "continuationQa": 87.7,
    "criticalFailures": 3,
    "criticalFailureSeries": [
      1,
      2,
      0,
      0,
      0
    ],
    "empathy": 3.56,
    "behaviourFirst": {
      "clarity": 4.31,
      "ownership": 4.13,
      "listening": 4.26,
      "professionalism": 4.54,
      "empathy": 4.37,
      "managing_frustration": 4.07
    },
    "behaviourContinuation": {
      "clarity": 3.8,
      "ownership": 2.19,
      "listening": 2.92,
      "professionalism": 4.3,
      "empathy": 1.97,
      "managing_frustration": 2.35
    },
    "coachingPack": {
      "packId": "PACK-20260502-7442",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 189 contacts, starting with 62 follow-up contacts opened like a fresh ticket mostly on Booking Cancellation and Verification.",
      "packReason": "Built from your own contacts this period, 95 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 182,
      "packWordCount": 528,
      "cards": [
        {
          "cardId": "CARD-AYANDA-1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Start Where They Left Off \u00b7 Booking Cancellation",
          "personalNote": "62 of your 64 follow-up contacts this period (96.9%) mostly on Booking Cancellation and Verification.",
          "positiveOpening": "First contacts are going well for you. People come away from those with a clear sense that it got handled.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 140,
          "estimatedDurationSeconds": 54,
          "_severity": "high",
          "_metric": "62 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-AYANDA-2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "situation_led",
          "title": "Name Who Has It and When \u00b7 Cancellation Penalties",
          "personalNote": "12 of your contacts that closed without a next step this period mostly on Cancellation Penalties and Account Standing.",
          "positiveOpening": "An appeal is genuinely still open and there is no decision to give yet. The contact has to end anyway.",
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 139,
          "estimatedDurationSeconds": 53,
          "_severity": "high",
          "_metric": "12 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-AYANDA-3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "short",
          "title": "Let the Situation Set the Tone \u00b7 Trust & Safety",
          "personalNote": "10 of your contacts on serious incidents this period mostly on Trust & Safety and Stay Concerns.",
          "positiveOpening": null,
          "coachingFocus": "When the situation is serious, keep that in your tone even if the question sounds casual.",
          "practicalGuidance": "Sounds like: \"I know this started with something worrying, so let me be clear about where it stands.\" Calm wording does not mean the person is calm.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": null,
          "wordCount": 82,
          "estimatedDurationSeconds": 32,
          "_severity": "medium",
          "_metric": "10 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-AYANDA-4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Answer the Worry, Not Just the Question \u00b7 Cancellation Penalties",
          "personalNote": "11 of your sitter standing contacts this period mostly on Cancellation Penalties and Payouts.",
          "positiveOpening": null,
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 113,
          "estimatedDurationSeconds": 43,
          "_severity": "medium",
          "_metric": "11 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "busisiwe-maseko": {
    "name": "Busisiwe Maseko",
    "slug": "busisiwe-maseko",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 197,
    "firstContacts": 145,
    "continuationContacts": 52,
    "ahtSeconds": 371,
    "ahtSeries": [
      363,
      424,
      374,
      384,
      318
    ],
    "fcrPct": 93.4,
    "fcrSeries": [
      97.4,
      85.3,
      97.4,
      90.7,
      95.3
    ],
    "csat": 3.48,
    "csatSeries": [
      3.55,
      3.59,
      3.44,
      3.7,
      3.16
    ],
    "firstCsat": 4.1,
    "continuationCsat": 1.77,
    "qaScore": 91.5,
    "qaSeries": [
      91.4,
      91.1,
      92.6,
      91.1,
      91.5
    ],
    "processAdherencePct": 98.0,
    "resolutionRatePct": 93.4,
    "firstQa": 91.9,
    "continuationQa": 90.6,
    "criticalFailures": 1,
    "criticalFailureSeries": [
      1,
      0,
      0,
      0,
      0
    ],
    "empathy": 3.8,
    "behaviourFirst": {
      "clarity": 4.4,
      "ownership": 4.17,
      "listening": 4.29,
      "professionalism": 4.54,
      "empathy": 4.42,
      "managing_frustration": 4.1
    },
    "behaviourContinuation": {
      "clarity": 3.93,
      "ownership": 2.22,
      "listening": 3.07,
      "professionalism": 4.44,
      "empathy": 2.07,
      "managing_frustration": 2.48
    },
    "coachingPack": {
      "packId": "PACK-20260502-7446",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 197 contacts, starting with 44 follow-up contacts opened like a fresh ticket mostly on Booking Cancellation and Account Standing.",
      "packReason": "Built from your own contacts this period, 69 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 179,
      "packWordCount": 523,
      "cards": [
        {
          "cardId": "CARD-BUSISI-1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Start Where They Left Off \u00b7 Booking Cancellation",
          "personalNote": "44 of your 52 follow-up contacts this period (84.6%) mostly on Booking Cancellation and Account Standing.",
          "positiveOpening": "Your tone stays steady even on the difficult ones, which is not a small thing.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 136,
          "estimatedDurationSeconds": 52,
          "_severity": "high",
          "_metric": "44 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-BUSISI-2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "situation_led",
          "title": "Name Who Has It and When \u00b7 Account Standing",
          "personalNote": "7 of your contacts that closed without a next step this period mostly on Account Standing and Verification.",
          "positiveOpening": "An appeal is genuinely still open and there is no decision to give yet. The contact has to end anyway.",
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 138,
          "estimatedDurationSeconds": 53,
          "_severity": "high",
          "_metric": "7 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-BUSISI-3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "short",
          "title": "Let the Situation Set the Tone \u00b7 Stay Concerns",
          "personalNote": "7 of your contacts on serious incidents this period mostly on Stay Concerns and Rover Guarantee.",
          "positiveOpening": null,
          "coachingFocus": "When the situation is serious, keep that in your tone even if the question sounds casual.",
          "practicalGuidance": "Sounds like: \"I know this started with something worrying, so let me be clear about where it stands.\" Calm wording does not mean the person is calm.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": null,
          "wordCount": 81,
          "estimatedDurationSeconds": 31,
          "_severity": "medium",
          "_metric": "7 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-BUSISI-4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Answer the Worry, Not Just the Question \u00b7 Account Standing",
          "personalNote": "11 of your sitter standing contacts this period mostly on Account Standing and Payouts.",
          "positiveOpening": null,
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 113,
          "estimatedDurationSeconds": 43,
          "_severity": "medium",
          "_metric": "11 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "janine-jacobs": {
    "name": "Janine Jacobs",
    "slug": "janine-jacobs",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 274,
    "firstContacts": 204,
    "continuationContacts": 70,
    "ahtSeconds": 355,
    "ahtSeries": [
      369,
      348,
      331,
      384,
      334
    ],
    "fcrPct": 88.0,
    "fcrSeries": [
      92.5,
      90.3,
      87.8,
      80.0,
      89.7
    ],
    "csat": 3.49,
    "csatSeries": [
      3.74,
      3.37,
      3.27,
      3.53,
      3.52
    ],
    "firstCsat": 4.09,
    "continuationCsat": 1.76,
    "qaScore": 91.5,
    "qaSeries": [
      92.3,
      91.0,
      91.3,
      90.7,
      92.4
    ],
    "processAdherencePct": 96.4,
    "resolutionRatePct": 88.0,
    "firstQa": 92.5,
    "continuationQa": 88.7,
    "criticalFailures": 4,
    "criticalFailureSeries": [
      1,
      2,
      0,
      1,
      0
    ],
    "empathy": 3.76,
    "behaviourFirst": {
      "clarity": 4.39,
      "ownership": 4.17,
      "listening": 4.27,
      "professionalism": 4.54,
      "empathy": 4.37,
      "managing_frustration": 4.07
    },
    "behaviourContinuation": {
      "clarity": 3.81,
      "ownership": 2.21,
      "listening": 2.97,
      "professionalism": 4.36,
      "empathy": 2.01,
      "managing_frustration": 2.36
    },
    "coachingPack": {
      "packId": "PACK-20260502-2842",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 274 contacts, starting with 64 follow-up contacts opened like a fresh ticket mostly on Refund & Fees and Booking Cancellation.",
      "packReason": "Built from your own contacts this period, 107 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 189,
      "packWordCount": 547,
      "cards": [
        {
          "cardId": "CARD-JANINE-1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Start Where They Left Off \u00b7 Refund & Fees",
          "personalNote": "64 of your 70 follow-up contacts this period (91.4%) mostly on Refund & Fees and Booking Cancellation.",
          "positiveOpening": "Your tone stays steady even on the difficult ones, which is not a small thing.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 137,
          "estimatedDurationSeconds": 53,
          "_severity": "high",
          "_metric": "64 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-JANINE-2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "situation_led",
          "title": "Name Who Has It and When \u00b7 Account Standing",
          "personalNote": "20 of your contacts that closed without a next step this period mostly on Account Standing and Cancellation Penalties.",
          "positiveOpening": "An appeal is genuinely still open and there is no decision to give yet. The contact has to end anyway.",
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 139,
          "estimatedDurationSeconds": 53,
          "_severity": "high",
          "_metric": "20 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-JANINE-3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "short",
          "title": "Let the Situation Set the Tone \u00b7 Rover Guarantee",
          "personalNote": "5 of your contacts on serious incidents this period mostly on Rover Guarantee and Stay Concerns.",
          "positiveOpening": null,
          "coachingFocus": "When the situation is serious, keep that in your tone even if the question sounds casual.",
          "practicalGuidance": "Sounds like: \"I know this started with something worrying, so let me be clear about where it stands.\" Calm wording does not mean the person is calm.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": null,
          "wordCount": 81,
          "estimatedDurationSeconds": 31,
          "_severity": "medium",
          "_metric": "5 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-JANINE-4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "18 of your sitter standing contacts this period mostly on Payouts and Account Standing.",
          "positiveOpening": "A sitter asks a flat, procedural question about a penalty. What sits underneath it is whether they can still take work.",
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 134,
          "estimatedDurationSeconds": 52,
          "_severity": "medium",
          "_metric": "18 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "lerato-nkosi": {
    "name": "Lerato Nkosi",
    "slug": "lerato-nkosi",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 193,
    "firstContacts": 126,
    "continuationContacts": 67,
    "ahtSeconds": 329,
    "ahtSeries": [
      362,
      291,
      341,
      349,
      310
    ],
    "fcrPct": 90.7,
    "fcrSeries": [
      94.9,
      90.2,
      87.5,
      89.7,
      90.9
    ],
    "csat": 3.44,
    "csatSeries": [
      3.64,
      3.24,
      3.73,
      3.28,
      3.27
    ],
    "firstCsat": 4.29,
    "continuationCsat": 1.82,
    "qaScore": 90.8,
    "qaSeries": [
      90.8,
      90.7,
      90.3,
      90.0,
      91.8
    ],
    "processAdherencePct": 94.8,
    "resolutionRatePct": 90.7,
    "firstQa": 91.7,
    "continuationQa": 89.0,
    "criticalFailures": 2,
    "criticalFailureSeries": [
      0,
      1,
      1,
      0,
      0
    ],
    "empathy": 3.55,
    "behaviourFirst": {
      "clarity": 4.33,
      "ownership": 4.14,
      "listening": 4.23,
      "professionalism": 4.44,
      "empathy": 4.36,
      "managing_frustration": 4.06
    },
    "behaviourContinuation": {
      "clarity": 3.86,
      "ownership": 2.16,
      "listening": 2.99,
      "professionalism": 4.33,
      "empathy": 2.03,
      "managing_frustration": 2.48
    },
    "coachingPack": {
      "packId": "PACK-20260502-3429",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 193 contacts, starting with 63 follow-up contacts opened like a fresh ticket mostly on Refund & Fees and Booking Cancellation.",
      "packReason": "Built from your own contacts this period, 104 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 198,
      "packWordCount": 570,
      "cards": [
        {
          "cardId": "CARD-LERATO-1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Start Where They Left Off \u00b7 Refund & Fees",
          "personalNote": "63 of your 67 follow-up contacts this period (94.0%) mostly on Refund & Fees and Booking Cancellation.",
          "positiveOpening": "A booking has already fallen through once. The member is messaging again, and this time the question looks small.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 141,
          "estimatedDurationSeconds": 54,
          "_severity": "high",
          "_metric": "63 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-LERATO-2",
          "priorityRank": 2,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Let the Situation Set the Tone \u00b7 Stay Concerns",
          "personalNote": "9 of your contacts on serious incidents this period mostly on Stay Concerns and Rover Guarantee.",
          "positiveOpening": null,
          "coachingFocus": "When the question sounds routine but the situation is not, take the tone from the situation rather than from how calmly it was asked.",
          "practicalGuidance": "Sounds like: \"Before I give you the status, I know this started with something worrying during the stay, so let me be clear about where it stands.\" People often ask about serious things in a flat voice. Answering flatly back reads as not caring.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": "Matching the situation rather than the sentence is what makes people feel taken seriously.",
          "wordCount": 120,
          "estimatedDurationSeconds": 46,
          "_severity": "high",
          "_metric": "9 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-LERATO-3",
          "priorityRank": 3,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "standard",
          "title": "Name Who Has It and When \u00b7 Account Standing",
          "personalNote": "17 of your contacts that closed without a next step this period mostly on Account Standing and Booking Cancellation.",
          "positiveOpening": null,
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 119,
          "estimatedDurationSeconds": 46,
          "_severity": "medium",
          "_metric": "17 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-LERATO-4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "15 of your sitter standing contacts this period mostly on Payouts and Account Standing.",
          "positiveOpening": "A sitter asks a flat, procedural question about a penalty. What sits underneath it is whether they can still take work.",
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 134,
          "estimatedDurationSeconds": 52,
          "_severity": "medium",
          "_metric": "15 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "michael-naidoo": {
    "name": "Michael Naidoo",
    "slug": "michael-naidoo",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 167,
    "firstContacts": 114,
    "continuationContacts": 53,
    "ahtSeconds": 336,
    "ahtSeries": [
      389,
      296,
      349,
      333,
      298
    ],
    "fcrPct": 86.2,
    "fcrSeries": [
      91.7,
      82.6,
      87.1,
      79.1,
      91.2
    ],
    "csat": 3.43,
    "csatSeries": [
      3.5,
      3.78,
      3.45,
      3.35,
      3.18
    ],
    "firstCsat": 4.12,
    "continuationCsat": 1.92,
    "qaScore": 91.2,
    "qaSeries": [
      91.8,
      92.5,
      90.6,
      89.5,
      92.6
    ],
    "processAdherencePct": 97.0,
    "resolutionRatePct": 86.2,
    "firstQa": 92.0,
    "continuationQa": 89.6,
    "criticalFailures": 0,
    "criticalFailureSeries": [
      0,
      0,
      0,
      0,
      0
    ],
    "empathy": 3.63,
    "behaviourFirst": {
      "clarity": 4.34,
      "ownership": 4.17,
      "listening": 4.29,
      "professionalism": 4.53,
      "empathy": 4.37,
      "managing_frustration": 4.01
    },
    "behaviourContinuation": {
      "clarity": 3.87,
      "ownership": 2.23,
      "listening": 3.1,
      "professionalism": 4.33,
      "empathy": 2.02,
      "managing_frustration": 2.46
    },
    "coachingPack": {
      "packId": "PACK-20260502-8990",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 167 contacts, starting with 49 follow-up contacts opened like a fresh ticket mostly on Booking Cancellation and Payments.",
      "packReason": "Built from your own contacts this period, 72 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 180,
      "packWordCount": 523,
      "cards": [
        {
          "cardId": "CARD-MICHAE-1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Start Where They Left Off \u00b7 Booking Cancellation",
          "personalNote": "49 of your 53 follow-up contacts this period (92.5%) mostly on Booking Cancellation and Payments.",
          "positiveOpening": "Your tone stays steady even on the difficult ones, which is not a small thing.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 135,
          "estimatedDurationSeconds": 52,
          "_severity": "high",
          "_metric": "49 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-MICHAE-2",
          "priorityRank": 2,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "short",
          "title": "Let the Situation Set the Tone \u00b7 Stay Concerns",
          "personalNote": "9 of your contacts on serious incidents this period mostly on Stay Concerns and Trust & Safety.",
          "positiveOpening": null,
          "coachingFocus": "When the situation is serious, keep that in your tone even if the question sounds casual.",
          "practicalGuidance": "Sounds like: \"I know this started with something worrying, so let me be clear about where it stands.\" Calm wording does not mean the person is calm.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": null,
          "wordCount": 82,
          "estimatedDurationSeconds": 32,
          "_severity": "medium",
          "_metric": "9 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-MICHAE-3",
          "priorityRank": 3,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "situation_led",
          "title": "Name Who Has It and When \u00b7 Cancellation Penalties",
          "personalNote": "7 of your contacts that closed without a next step this period mostly on Cancellation Penalties and Booking Changes.",
          "positiveOpening": "An appeal is genuinely still open and there is no decision to give yet. The contact has to end anyway.",
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 139,
          "estimatedDurationSeconds": 53,
          "_severity": "medium",
          "_metric": "7 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-MICHAE-4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "7 of your sitter standing contacts this period mostly on Payouts and Account Standing.",
          "positiveOpening": null,
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 113,
          "estimatedDurationSeconds": 43,
          "_severity": "medium",
          "_metric": "7 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "nomsa-dlamini": {
    "name": "Nomsa Dlamini",
    "slug": "nomsa-dlamini",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 182,
    "firstContacts": 139,
    "continuationContacts": 43,
    "ahtSeconds": 372,
    "ahtSeries": [
      352,
      413,
      359,
      365,
      361
    ],
    "fcrPct": 90.1,
    "fcrSeries": [
      87.5,
      93.3,
      95.5,
      89.5,
      86.5
    ],
    "csat": 3.69,
    "csatSeries": [
      3.75,
      3.89,
      3.41,
      3.37,
      3.89
    ],
    "firstCsat": 4.24,
    "continuationCsat": 1.93,
    "qaScore": 91.9,
    "qaSeries": [
      91.4,
      92.0,
      93.1,
      90.9,
      92.4
    ],
    "processAdherencePct": 96.2,
    "resolutionRatePct": 90.1,
    "firstQa": 92.5,
    "continuationQa": 89.8,
    "criticalFailures": 1,
    "criticalFailureSeries": [
      1,
      0,
      0,
      0,
      0
    ],
    "empathy": 3.84,
    "behaviourFirst": {
      "clarity": 4.34,
      "ownership": 4.21,
      "listening": 4.23,
      "professionalism": 4.5,
      "empathy": 4.39,
      "managing_frustration": 4.06
    },
    "behaviourContinuation": {
      "clarity": 3.85,
      "ownership": 2.27,
      "listening": 3.04,
      "professionalism": 4.28,
      "empathy": 2.06,
      "managing_frustration": 2.55
    },
    "coachingPack": {
      "packId": "PACK-20260502-8172",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 182 contacts, starting with 37 follow-up contacts opened like a fresh ticket mostly on Refund & Fees and Booking Cancellation.",
      "packReason": "Built from your own contacts this period, 49 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 180,
      "packWordCount": 523,
      "cards": [
        {
          "cardId": "CARD-NOMSA--1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Start Where They Left Off \u00b7 Refund & Fees",
          "personalNote": "37 of your 43 follow-up contacts this period (86.0%) mostly on Refund & Fees and Booking Cancellation.",
          "positiveOpening": "First contacts are going well for you. People come away from those with a clear sense that it got handled.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 142,
          "estimatedDurationSeconds": 55,
          "_severity": "high",
          "_metric": "37 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-NOMSA--2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "short",
          "title": "Name Who Has It and When \u00b7 Booking Changes",
          "personalNote": "4 of your contacts that closed without a next step this period mostly on Booking Changes and Verification.",
          "positiveOpening": null,
          "coachingFocus": "When you cannot resolve it yourself, name who has it and when, before you close.",
          "practicalGuidance": "Sounds like: \"It sits with the review team, you will hear by Thursday.\" A date is what stops the next message.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": null,
          "wordCount": 72,
          "estimatedDurationSeconds": 28,
          "_severity": "medium",
          "_metric": "4 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-NOMSA--3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Let the Situation Set the Tone \u00b7 Stay Concerns",
          "personalNote": "3 of your contacts on serious incidents this period mostly on Stay Concerns.",
          "positiveOpening": "Something went wrong during a stay. The follow-up comes in as a one-line question about status, with none of the worry in it.",
          "coachingFocus": "When the question sounds routine but the situation is not, take the tone from the situation rather than from how calmly it was asked.",
          "practicalGuidance": "Sounds like: \"Before I give you the status, I know this started with something worrying during the stay, so let me be clear about where it stands.\" People often ask about serious things in a flat voice. Answering flatly back reads as not caring.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": "Matching the situation rather than the sentence is what makes people feel taken seriously.",
          "wordCount": 140,
          "estimatedDurationSeconds": 54,
          "_severity": "medium",
          "_metric": "3 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-NOMSA--4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "5 of your sitter standing contacts this period mostly on Payouts and Account Standing.",
          "positiveOpening": null,
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 113,
          "estimatedDurationSeconds": 43,
          "_severity": "medium",
          "_metric": "5 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "pieter-botha": {
    "name": "Pieter Botha",
    "slug": "pieter-botha",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 203,
    "firstContacts": 152,
    "continuationContacts": 51,
    "ahtSeconds": 334,
    "ahtSeries": [
      290,
      349,
      312,
      342,
      366
    ],
    "fcrPct": 92.1,
    "fcrSeries": [
      87.5,
      93.2,
      90.9,
      90.5,
      97.7
    ],
    "csat": 3.47,
    "csatSeries": [
      2.8,
      3.43,
      3.36,
      3.86,
      3.82
    ],
    "firstCsat": 4.06,
    "continuationCsat": 1.71,
    "qaScore": 92.1,
    "qaSeries": [
      91.7,
      92.9,
      92.5,
      91.6,
      91.7
    ],
    "processAdherencePct": 97.5,
    "resolutionRatePct": 92.1,
    "firstQa": 93.2,
    "continuationQa": 88.8,
    "criticalFailures": 1,
    "criticalFailureSeries": [
      1,
      0,
      0,
      0,
      0
    ],
    "empathy": 3.8,
    "behaviourFirst": {
      "clarity": 4.38,
      "ownership": 4.23,
      "listening": 4.33,
      "professionalism": 4.59,
      "empathy": 4.4,
      "managing_frustration": 4.02
    },
    "behaviourContinuation": {
      "clarity": 3.81,
      "ownership": 2.25,
      "listening": 3.03,
      "professionalism": 4.29,
      "empathy": 2.01,
      "managing_frustration": 2.46
    },
    "coachingPack": {
      "packId": "PACK-20260502-7041",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 203 contacts, starting with 47 follow-up contacts opened like a fresh ticket mostly on Refund & Fees and Account & Access.",
      "packReason": "Built from your own contacts this period, 75 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 200,
      "packWordCount": 574,
      "cards": [
        {
          "cardId": "CARD-PIETER-1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Start Where They Left Off \u00b7 Refund & Fees",
          "personalNote": "47 of your 51 follow-up contacts this period (92.2%) mostly on Refund & Fees and Account & Access.",
          "positiveOpening": "A booking has already fallen through once. The member is messaging again, and this time the question looks small.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 142,
          "estimatedDurationSeconds": 55,
          "_severity": "high",
          "_metric": "47 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-PIETER-2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "standard",
          "title": "Name Who Has It and When \u00b7 Cancellation Penalties",
          "personalNote": "11 of your contacts that closed without a next step this period mostly on Cancellation Penalties and Refund & Fees.",
          "positiveOpening": null,
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 120,
          "estimatedDurationSeconds": 46,
          "_severity": "high",
          "_metric": "11 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-PIETER-3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Let the Situation Set the Tone \u00b7 Trust & Safety",
          "personalNote": "5 of your contacts on serious incidents this period mostly on Trust & Safety and Rover Guarantee.",
          "positiveOpening": null,
          "coachingFocus": "When the question sounds routine but the situation is not, take the tone from the situation rather than from how calmly it was asked.",
          "practicalGuidance": "Sounds like: \"Before I give you the status, I know this started with something worrying during the stay, so let me be clear about where it stands.\" People often ask about serious things in a flat voice. Answering flatly back reads as not caring.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": "Matching the situation rather than the sentence is what makes people feel taken seriously.",
          "wordCount": 121,
          "estimatedDurationSeconds": 47,
          "_severity": "high",
          "_metric": "5 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-PIETER-4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "12 of your sitter standing contacts this period mostly on Payouts and Cancellation Penalties.",
          "positiveOpening": "A sitter asks a flat, procedural question about a penalty. What sits underneath it is whether they can still take work.",
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 134,
          "estimatedDurationSeconds": 52,
          "_severity": "medium",
          "_metric": "12 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "sipho-khumalo": {
    "name": "Sipho Khumalo",
    "slug": "sipho-khumalo",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 185,
    "firstContacts": 133,
    "continuationContacts": 52,
    "ahtSeconds": 344,
    "ahtSeries": [
      320,
      350,
      372,
      364,
      311
    ],
    "fcrPct": 85.9,
    "fcrSeries": [
      88.0,
      89.7,
      91.4,
      75.0,
      89.6
    ],
    "csat": 3.53,
    "csatSeries": [
      3.68,
      3.55,
      3.31,
      3.6,
      3.52
    ],
    "firstCsat": 4.27,
    "continuationCsat": 1.63,
    "qaScore": 90.7,
    "qaSeries": [
      91.0,
      90.7,
      89.9,
      90.3,
      91.4
    ],
    "processAdherencePct": 94.1,
    "resolutionRatePct": 85.9,
    "firstQa": 92.1,
    "continuationQa": 87.0,
    "criticalFailures": 1,
    "criticalFailureSeries": [
      1,
      0,
      0,
      0,
      0
    ],
    "empathy": 3.7,
    "behaviourFirst": {
      "clarity": 4.38,
      "ownership": 4.12,
      "listening": 4.22,
      "professionalism": 4.56,
      "empathy": 4.39,
      "managing_frustration": 4.05
    },
    "behaviourContinuation": {
      "clarity": 3.81,
      "ownership": 2.17,
      "listening": 3.02,
      "professionalism": 4.26,
      "empathy": 1.95,
      "managing_frustration": 2.34
    },
    "coachingPack": {
      "packId": "PACK-20260502-1268",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 185 contacts, starting with 48 follow-up contacts opened like a fresh ticket mostly on Refund & Fees and Booking Cancellation.",
      "packReason": "Built from your own contacts this period, 78 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 199,
      "packWordCount": 572,
      "cards": [
        {
          "cardId": "CARD-SIPHO--1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Start Where They Left Off \u00b7 Refund & Fees",
          "personalNote": "48 of your 52 follow-up contacts this period (92.3%) mostly on Refund & Fees and Booking Cancellation.",
          "positiveOpening": "First contacts are going well for you. People come away from those with a clear sense that it got handled.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 142,
          "estimatedDurationSeconds": 55,
          "_severity": "high",
          "_metric": "48 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-SIPHO--2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "situation_led",
          "title": "Name Who Has It and When \u00b7 Refund & Fees",
          "personalNote": "13 of your contacts that closed without a next step this period mostly on Refund & Fees and Account Standing.",
          "positiveOpening": "An appeal is genuinely still open and there is no decision to give yet. The contact has to end anyway.",
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 140,
          "estimatedDurationSeconds": 54,
          "_severity": "medium",
          "_metric": "13 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-SIPHO--3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Let the Situation Set the Tone \u00b7 Stay Concerns",
          "personalNote": "7 of your contacts on serious incidents this period mostly on Stay Concerns and Trust & Safety.",
          "positiveOpening": null,
          "coachingFocus": "When the question sounds routine but the situation is not, take the tone from the situation rather than from how calmly it was asked.",
          "practicalGuidance": "Sounds like: \"Before I give you the status, I know this started with something worrying during the stay, so let me be clear about where it stands.\" People often ask about serious things in a flat voice. Answering flatly back reads as not caring.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": "Matching the situation rather than the sentence is what makes people feel taken seriously.",
          "wordCount": 121,
          "estimatedDurationSeconds": 47,
          "_severity": "medium",
          "_metric": "7 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-SIPHO--4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "standard",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "10 of your sitter standing contacts this period mostly on Payouts and Account Standing.",
          "positiveOpening": null,
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 113,
          "estimatedDurationSeconds": 43,
          "_severity": "medium",
          "_metric": "10 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "thabo-van-der-merwe": {
    "name": "Thabo van der Merwe",
    "slug": "thabo-van-der-merwe",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 191,
    "firstContacts": 138,
    "continuationContacts": 53,
    "ahtSeconds": 340,
    "ahtSeries": [
      343,
      317,
      322,
      353,
      369
    ],
    "fcrPct": 89.5,
    "fcrSeries": [
      93.3,
      82.5,
      90.0,
      86.2,
      94.6
    ],
    "csat": 3.56,
    "csatSeries": [
      3.71,
      3.38,
      3.45,
      3.72,
      3.57
    ],
    "firstCsat": 4.22,
    "continuationCsat": 1.83,
    "qaScore": 91.6,
    "qaSeries": [
      91.9,
      92.6,
      91.7,
      90.0,
      91.2
    ],
    "processAdherencePct": 96.9,
    "resolutionRatePct": 89.5,
    "firstQa": 92.2,
    "continuationQa": 89.9,
    "criticalFailures": 1,
    "criticalFailureSeries": [
      1,
      0,
      0,
      0,
      0
    ],
    "empathy": 3.65,
    "behaviourFirst": {
      "clarity": 4.3,
      "ownership": 4.2,
      "listening": 4.29,
      "professionalism": 4.54,
      "empathy": 4.27,
      "managing_frustration": 4.05
    },
    "behaviourContinuation": {
      "clarity": 3.81,
      "ownership": 2.24,
      "listening": 3.05,
      "professionalism": 4.32,
      "empathy": 2.05,
      "managing_frustration": 2.4
    },
    "coachingPack": {
      "packId": "PACK-20260502-1525",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 191 contacts, starting with 46 follow-up contacts opened like a fresh ticket mostly on Verification and Booking Cancellation.",
      "packReason": "Built from your own contacts this period, 65 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 188,
      "packWordCount": 542,
      "cards": [
        {
          "cardId": "CARD-THABO--1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Start Where They Left Off \u00b7 Verification",
          "personalNote": "46 of your 53 follow-up contacts this period (86.8%) mostly on Verification and Booking Cancellation.",
          "positiveOpening": "A booking has already fallen through once. The member is messaging again, and this time the question looks small.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 139,
          "estimatedDurationSeconds": 53,
          "_severity": "high",
          "_metric": "46 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-THABO--2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "short",
          "title": "Name Who Has It and When \u00b7 Verification",
          "personalNote": "7 of your contacts that closed without a next step this period mostly on Verification and Booking Changes.",
          "positiveOpening": null,
          "coachingFocus": "When you cannot resolve it yourself, name who has it and when, before you close.",
          "practicalGuidance": "Sounds like: \"It sits with the review team, you will hear by Thursday.\" A date is what stops the next message.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": null,
          "wordCount": 72,
          "estimatedDurationSeconds": 28,
          "_severity": "medium",
          "_metric": "7 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-THABO--3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Let the Situation Set the Tone \u00b7 Stay Concerns",
          "personalNote": "6 of your contacts on serious incidents this period mostly on Stay Concerns and Rover Guarantee.",
          "positiveOpening": "Something went wrong during a stay. The follow-up comes in as a one-line question about status, with none of the worry in it.",
          "coachingFocus": "When the question sounds routine but the situation is not, take the tone from the situation rather than from how calmly it was asked.",
          "practicalGuidance": "Sounds like: \"Before I give you the status, I know this started with something worrying during the stay, so let me be clear about where it stands.\" People often ask about serious things in a flat voice. Answering flatly back reads as not caring.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": "Matching the situation rather than the sentence is what makes people feel taken seriously.",
          "wordCount": 143,
          "estimatedDurationSeconds": 55,
          "_severity": "medium",
          "_metric": "6 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-THABO--4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "6 of your sitter standing contacts this period mostly on Payouts and Cancellation Penalties.",
          "positiveOpening": "A sitter asks a flat, procedural question about a penalty. What sits underneath it is whether they can still take work.",
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 134,
          "estimatedDurationSeconds": 52,
          "_severity": "medium",
          "_metric": "6 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  },
  "zanele-ndlovu": {
    "name": "Zanele Ndlovu",
    "slug": "zanele-ndlovu",
    "role": "Support Agent",
    "team": "Kagiso de Villiers",
    "volume": 296,
    "firstContacts": 225,
    "continuationContacts": 71,
    "ahtSeconds": 353,
    "ahtSeries": [
      339,
      367,
      305,
      376,
      381
    ],
    "fcrPct": 88.9,
    "fcrSeries": [
      91.1,
      87.0,
      92.1,
      87.0,
      87.0
    ],
    "csat": 3.59,
    "csatSeries": [
      3.88,
      3.52,
      3.37,
      3.76,
      3.51
    ],
    "firstCsat": 4.17,
    "continuationCsat": 1.76,
    "qaScore": 91.3,
    "qaSeries": [
      91.3,
      90.7,
      91.5,
      91.6,
      91.2
    ],
    "processAdherencePct": 95.9,
    "resolutionRatePct": 88.9,
    "firstQa": 92.1,
    "continuationQa": 88.8,
    "criticalFailures": 3,
    "criticalFailureSeries": [
      0,
      1,
      2,
      0,
      0
    ],
    "empathy": 3.77,
    "behaviourFirst": {
      "clarity": 4.35,
      "ownership": 4.15,
      "listening": 4.25,
      "professionalism": 4.53,
      "empathy": 4.35,
      "managing_frustration": 4.08
    },
    "behaviourContinuation": {
      "clarity": 3.8,
      "ownership": 2.22,
      "listening": 3.0,
      "professionalism": 4.34,
      "empathy": 1.94,
      "managing_frustration": 2.33
    },
    "coachingPack": {
      "packId": "PACK-20260502-6513",
      "cycleType": "weekly_insight",
      "packSummary": "Four things from your last 296 contacts, starting with 63 follow-up contacts opened like a fresh ticket mostly on Booking Cancellation and Payouts.",
      "packReason": "Built from your own contacts this period, 94 across these four patterns, where a small change in how you opened or closed would have made the conversation easier for the member.",
      "cardCount": 4,
      "estimatedPackDurationSeconds": 206,
      "packWordCount": 590,
      "cards": [
        {
          "cardId": "CARD-ZANELE-1",
          "priorityRank": 1,
          "topicKey": "open_with_incident",
          "affectedKpis": [
            "csat",
            "repeat_contact_rate"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Start Where They Left Off \u00b7 Booking Cancellation",
          "personalNote": "63 of your 71 follow-up contacts this period (88.7%) mostly on Booking Cancellation and Payouts.",
          "positiveOpening": "A booking has already fallen through once. The member is messaging again, and this time the question looks small.",
          "coachingFocus": "When someone is coming back about something already open, say what you can see has happened before you ask them anything.",
          "practicalGuidance": "Sounds like: \"I can see the sitter cancelled on you Tuesday and you have been waiting on a replacement since. Let me pick it up from there.\" It tells them the history came with them, so they are not starting the story again.",
          "miniChallenge": "On your next three contacts where the member has been in touch before, open with what already happened before your first question.",
          "encouragingClose": "One line at the start does most of the work on these. The rest of the contact gets easier.",
          "wordCount": 139,
          "estimatedDurationSeconds": 53,
          "_severity": "high",
          "_metric": "63 follow-up contacts opened on the request rather than the history"
        },
        {
          "cardId": "CARD-ZANELE-2",
          "priorityRank": 2,
          "topicKey": "route_forward",
          "affectedKpis": [
            "repeat_contact_rate",
            "fcr"
          ],
          "contentType": "trigger_action_reminder",
          "cardShape": "standard",
          "title": "Name Who Has It and When \u00b7 Booking Cancellation",
          "personalNote": "8 of your contacts that closed without a next step this period mostly on Booking Cancellation and Refund & Fees.",
          "positiveOpening": null,
          "coachingFocus": "When you cannot resolve something yourself, name who has it and when they will hear back before you close.",
          "practicalGuidance": "Sounds like: \"This sits with the standing review team. They work in order of submission and you will get a decision by Thursday. If nothing lands by then, come back to me directly.\" Under review with no name and no date is the main reason people contact again.",
          "miniChallenge": "On your next three contacts you cannot close yourself, name the team and a date before you end.",
          "encouragingClose": "You cannot always give the answer. You can always give them something to hold onto.",
          "wordCount": 120,
          "estimatedDurationSeconds": 46,
          "_severity": "high",
          "_metric": "8 contacts closed without naming an owner or a date"
        },
        {
          "cardId": "CARD-ZANELE-3",
          "priorityRank": 3,
          "topicKey": "match_register",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Let the Situation Set the Tone \u00b7 Stay Concerns",
          "personalNote": "11 of your contacts on serious incidents this period mostly on Stay Concerns and Rover Guarantee.",
          "positiveOpening": "Something went wrong during a stay. The follow-up comes in as a one-line question about status, with none of the worry in it.",
          "coachingFocus": "When the question sounds routine but the situation is not, take the tone from the situation rather than from how calmly it was asked.",
          "practicalGuidance": "Sounds like: \"Before I give you the status, I know this started with something worrying during the stay, so let me be clear about where it stands.\" People often ask about serious things in a flat voice. Answering flatly back reads as not caring.",
          "miniChallenge": "On your next two contacts attached to a safety concern or a claim, name the situation once before you give the status.",
          "encouragingClose": "Matching the situation rather than the sentence is what makes people feel taken seriously.",
          "wordCount": 143,
          "estimatedDurationSeconds": 55,
          "_severity": "medium",
          "_metric": "11 contacts on serious incidents handled in a routine register"
        },
        {
          "cardId": "CARD-ZANELE-4",
          "priorityRank": 4,
          "topicKey": "say_unspoken",
          "affectedKpis": [
            "csat"
          ],
          "contentType": "scenario_example",
          "cardShape": "situation_led",
          "title": "Answer the Worry, Not Just the Question \u00b7 Payouts",
          "personalNote": "12 of your sitter standing contacts this period mostly on Payouts and Account Standing.",
          "positiveOpening": "A sitter asks a flat, procedural question about a penalty. What sits underneath it is whether they can still take work.",
          "coachingFocus": "When a sitter asks about a penalty or their standing, say what it means for their bookings without waiting to be asked.",
          "practicalGuidance": "Sounds like: \"To be clear on the part you have not asked about, your existing bookings are not affected while this is open.\" For a sitter this is usually about income, and most will not ask that outright.",
          "miniChallenge": "On your next two sitter contacts about standing or penalties, say what it means for their bookings before they ask.",
          "encouragingClose": "Saying it first means they do not have to work up to asking. That is most of the relief.",
          "wordCount": 134,
          "estimatedDurationSeconds": 52,
          "_severity": "medium",
          "_metric": "12 sitter standing contacts where the income question went unaddressed"
        }
      ]
    }
  }
}

export const TEAM_AGGREGATES = {
  "qaScore": 91.4,
  "ahtSeconds": 349,
  "fcrPct": 89.5,
  "csat": 3.52,
  "firstCsat": 4.19,
  "continuationCsat": 1.77,
  "firstQa": 92.3,
  "continuationQa": 88.9,
  "empathy": 3.71,
  "criticalFailuresTotal": 17,
  "agentsWithCriticalFailures": 9,
  "totalContacts": 2077
}

export const AGENT_METRIC_ORDER = [
  "ayanda-mbeki",
  "busisiwe-maseko",
  "janine-jacobs",
  "lerato-nkosi",
  "michael-naidoo",
  "nomsa-dlamini",
  "pieter-botha",
  "sipho-khumalo",
  "thabo-van-der-merwe",
  "zanele-ndlovu"
]

/** Ranked by critical failures, then by CSAT ascending. */
export const FLAGGED_AGENT_SLUGS = [
  "janine-jacobs",
  "ayanda-mbeki",
  "zanele-ndlovu",
  "lerato-nkosi"
]

export const CARD_SHAPE_LABELS = {
  standard: 'Standard',
  situation_led: 'Situation-led',
  short: 'Short',
  technique_first: 'Technique-first',
}

export const CONTENT_TYPE_LABELS = {
  knowledge_check: 'Knowledge check',
  scenario_example: 'Scenario',
  trigger_action_reminder: 'Trigger and action',
}
