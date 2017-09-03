---
layout: post
title:  "Amsterdam – one year on"
date:   2017-08-03 12:00:00 +0200
categories: moving-abroad
---

It's been too long since my last post, but I think the one year anniversary of moving into this flat in Amsterdam is as good as any other to write something.

<!--more-->

Things have really changed since last year – bright-eyed and bushy-tailed, I genuinely though I could make a go of being a freelance editor, despite the fact that I had no real passion for editorial work nor any network to draw on in Amsterdam, so I was relying on my old employer for scraps. It was pretty miserable, and I've written previously about how lame it was and my subsequent experiences at Codaisseur.

But what have I done since finishing at Codaisseur? Well, at my demo night I met a company who invited me to come check out their office, one thing led to another and I had a job offer (which has since turned into a permanent contract!).

Aside from working, I've continued with my Codaisseurify project that I've discussed previously. I refactored the back-end to use the RSpotify gem instead of making API calls in my node script – this keeps my API keys secret, and lets me check if I've already requested the information I need for the song, so there should be less calls made to Spotify's API. I also implemented a GraphQL endpoint with batch loaders to get avoid N+1 problems.

I then created a React app to fetch and display data (thanks, Apollo) from the back-end using the Recharts library. It needs a lot more design work, but you can [check out][0] what I have so far. In the future I'd like to add sign-ups to it, so I've got to figure out the best way to either get them running the node script on their machines or find a different solution.

There are a few other little projects knocking around, but I doubt I'll share much about them until I have something that is at least deployable.

### Looking ahead

The first year in Amsterdam was basically really tough in the first half of it and then really great in the second half, so what will the second year bring?

- the freelance stuff will find some closure when I get the final accounts dealt with and can completely wash my hands of the whole thing
- I'll finish my application for Irish citizenship and take a trip to Den Haag to get it processed (though I've heard it can take another 6 months after that to get it confirmed)
- a lot more gigs than last year. I've currently got LCD Soundsystem (twice), Portugal the Man and Father John Misty lined up. I'd quite like to get tickets for QOTSA, but €60 is a bit much (I've seen them before though, so I'm not going to lose sleep over not seeing them)
- once my ankle is better, I'll get back to running in the mornings and make sure that I never run for a tram in my Stan Smiths ever again

In terms of coding, I've got a few things I want to learn/do in the next year:

- React Native – I've dabbled with it, but would really like to build a 'real' app
- Python – I did a bit of Python at Codaisseur for my 'Real World Project', so I'd like to learn to use it properly as I think it's really flexible (I'll focus on scraping/spiders, the Django framework and, if I have time, data analysis)
- Laravel – PHP has a reputation for being really shitty, but I'd like to build a small CRUD app using Laravel (which is a Rails-like MVC framework)
- Kubernetes
- SuperCollider - I did so much with MaxMSP while at uni, that it seems a shame to not have any music-related projects. With my newly-acquired coding skills, I might finally attempt to tackle SuperCollider again!

Clearly, I have a lot to work on, but I'll try and update this a little more regularly as well!

[0]: https://music-visualizr.leefreeman.xyz/
