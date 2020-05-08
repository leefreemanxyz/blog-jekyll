---
layout: post
title: "I'VE GRADUATED! React, come at me!"
date: 2017-05-04 12:00:00 +0200
tags: learn-to-code
---

So, the whole blogging all the way through the course thing didn't really work out. Things really kicked up a notch once we moved into the advanced bootcamp, and I didn't really have time for coding and writing. Sorry about that!

If you don't read any further than this, I'm currently looking for a job to put these new skills to good use. [Here's my GitHub](https://github.com/leefreemanxyz), I'm really interested in React-y/ES6-y roles, so show me what you've got.

<!--more-->

I should probably reflect on what happened for the rest of the course.

## Week 5

Week 5 started with a day working on algorithms. We were introduced to some of my new best friends for when working on arrays:

- `filter` - creates a new array containing all the elements of an array passed to it that pass a test
- `reduce` - is used to reduce an array to a single value
- `map` - creates a new array with the results of calling a function on every element of the array passed to it

On top of this, we looked at recursion, where your function calls itself repeatedly until it reaches some sort of stopping condition. It's easy to mess up and cause an infinite loop and crash, but it's definitely sexier than calling for loops everywhere, so there's that. We then remade my favourite game in the whole world...Hangman. I found it much easier than doing it in Ruby though – check out [my Gist solution](https://gist.github.com/leefreemanxyz/9b62ae2b0cf469c7f0f3adcd469ecbf7).

Throughout the rest of the week we started looking at React, Redux, before moving onto using the Feathers framework so we could quickly get some RESTful services up and running. Feathers also supports web sockets, so I mainly just web socketed things pretty much all the time for the next few weeks.

## Week 6

During Week 6 we started to look at what else back-end javascript has to offer. We looked at how Feathers lets you use before and after hooks to transform, validate, make all sorts of changes to data on its way into or out of the database. These hooks are evidently pretty powerful, but they felt far less intuitive than the front-end React/Redux stuff that we'd been working on.

The rest of the week was spent working in pairs on 2-player real-time games. It's safe to say that my game was way too ambitious for the 3/4 days that we had to work on it. If anyone ever suggests to you to try and make Scrabble in your browser before the end of week, just decline.

## Week 7

Easter Monday took a day off the start of this week so, to make up for it, we were given a written test on everything we had covered since the start of the course, before being given our final assignments. The assignment was to create an app which would enable teachers to create pairs of students for each day and, of course, each pair couldn't meet again until they had been matched with all the other students. This was an easy task to mess up – we could choose our own technology, could work from wherever we liked and weren't working in pairs any more.

I spent most of Tuesday flipping back and forth between using Rails or Feathers for the back-end of the application. I knew I wanted to do React on the front end, but given my experiences in Week 6 with Feathers hooks, I was a little bit apprehensive about relying on it for my final assignment. I thought using React with Rails would be a really nice way to make use of what we'd been taught over the whole course. As it turned out, there are plenty of gotchas in Rails when you want to run it as an API (e.g. when trying to use Devise). By the end of Tuesday I had something up and running (I started off with just creating users and allowing admins to promote or demote any user from/to an admin status).

On Wednesday I tackled the main part of the task: making the pairs. I identified fairly quickly that this is just an algorithm that could be used for making football fixtures (or any sort of league) – turns out all this time following football religiously has been good for something. So after a bit of research on [Wikipedia](https://en.wikipedia.org/wiki/Round-robin_tournament) (naturally), I found an algorithm to use, and set about implementing it in javascript. I figured that using an algorithm to generate all the possible pairs in advance was a sound way to approach it, as I could make one set of calculations and feed them back to the users day by day. [Check out the code I used for my algorithm](https://github.com/leefreemanxyz/fym-react/blob/master/src/actions/pairs/generatePairs.js). Yes, I used sexy recursion instead of dull for loops.

I needed to have everything finished by Thursday at 6pm so I could go to the DigitalOcean meetup, so Thursday afternoon was pretty manic implementing the actual functionality to show users their individual matches and letting the teachers choose to publish a set of pairs. Anyway, I smashed through it so I could go see some crazy things people are doing with Node.

Final evaluation on Friday morning, job done.

## Week 8

After a relaxing weekend, it was right back to it. Four external product owners came in and pitched what they wanted us to make. I chose to work on a map for AMSxTech of tech companies in Amsterdam. It felt like it was probably the most challenging project, and a chance to flex our React skills at the showcase on Friday. Anika and Paula did some really awesome work getting Google Maps integrated into some React components, while I spent a lot of time building out our back-end using Feathers and whipping together the Redux functions.

Having King's Day right in the middle of the project was hardly ideal, but as I recovered from King's Night, I managed to write a load of code for placing filters on the map markers. At this point, we basically had something to show, but we didn't really have any markers. We didn't have any real-life data to show off – plenty of companies are very happy to sell you the data as a service, but they were hardly going to let us export their entire datasets when signed up to a free trial (I know, I was shocked too). I found a directory of marketing agencies in Amsterdam online, taught myself just enough Python to be dangerous, so I could scrape it all and turn it into JSON (which then let us seed it in our database).

Demo night was a really nice experience as we got to see the hard work that everyone else had put in during the week. Luckily, our demo all worked fine (and we could all have a good laugh about the admin panel of 'chaos'). [Check out what we showed off at demo night](http://amsxtechmap.bitballoon.com/) (you might need to refresh it – the back-end is hosted on Heroku and it goes to sleep every 30 minutes!).

## Life beyond the Academy

So now I guess I have to go get a job, right? Well, yes, but until that sorts itself out, I'm working on some bits and pieces for my portfolio. I think there are four things I really want to get sorted:

- the 'Codaisseurify' app. [Well, mine has gotten a bit out of hand](https://github.com/leefreemanxyz/codaisseurify). The database is now populated when I play songs in Spotify, and each individual playback of a song is logged against my user. I need to sort out what data I'm going to expose as an endpoint and that should be largely done.
- imperialWTF. I made a bit of a joke in passing about the UK going back to imperial measurements, which has turned into a really small project implementing all that in React with Material-UI. It's pretty cute (though perhaps you don't need to know how many milligrams are in 3 imperial tons, but you'll just have to deal with it).
- replacing this damn WordPress thing. If I want a job doing sexy javascript, I figure my portfolio should be done using sexy javascript things. So I've started building a back-end in Feathers (and navigating all the changes they've made in the big, big release they did last week), and some components in React. This is all so I can ditch WordPress for blogging and chuck it all over into my own system. Part of the reason for the Codaisseurify endpoints is so I can pipe that data into my site and show off what I've been listening to etc. I guess I'll probably end up migrating the posts on here across (though the Google crawler will hate me for it)
- With all these things I'm making, I'd really love to have an easy way to deploy it and keep it updated. I definitely want a Heroku-like experience ('here's a git repository, build me things'), so at the moment I'm leaning towards trying out Dokku on a fresh VPS and seeing how it pans out. This is unlikely to happen until I get Codaisseurify a tiny bit more polished and a React/Feathers blog sorted out, but as I've got a fair bit of time on my hands right now, I'm hoping to sort things out by next weekend.

And, that's it.
