---
layout: post
title: "Shopping carts, APIs, a dash of JS and rebuilding Taste of Code"
date: 2017-04-02 12:00:00 +0200
tags: learn-to-code
---

Well, it's two weeks since my last post and I'm now halfway through Codaisseur's two-month web developer academy. I. Am. Ex. Haus. Ted. Admittedly, I'm not making it easy for myself – in the week before last I went to developer meetups on Tuesday and Wednesday, and had scheduled two for the last week (though I ended up sacking off the AmsterdamJS one on Thursday  ¯\\\_(ツ)\_/¯ ).

<!--more-->

So, Amsterdam-rb was on the same night as Father John Misty played about 100m away from where the meetup was hosted. I'm definitely not bitter about not getting tickets or anything. There were two talks, but I don't think the event was recorded:

- Processing streaming data at a large scale with Kafka. You can read about a high-level overview of Kafka in [Apache's Kafka documentation](https://kafka.apache.org/intro). This technology is pretty crazy, and I'm not sure what I could take from the talk at this point in my learning journey, but it was pretty interesting.
- Having a fun time building your own efficient machine learning system with Redis. This talk was about a project to classify banking transactions with machine learning. One of the banks that I've used back in the UK used to offer something similar, but as so many of my transactions were cash withdrawals, I don't think it really worked so well for me. Here in the Netherlands, everyone uses their cards for everything, so you can build up a much clearer picture of where exactly you're spending your money.

I also met a Codaisseur graduate currently working for one of the meetup's sponsors, Young Capital. [She also blogged about her experience](https://beebytes.wordpress.com/), which I found really useful when deciding whether to sign up or not, which is one of the reason's I'm trying to write about this experience too.

The DigitalOcean meetup was the next night and featured a talk on common DevOps misconceptions and a completely off-the-deep-end talk on putting everything into containers on Linux. I think the second talk really captured a lot of people's imaginations, but the livestream stopped working before that talk sorted, so I guess it's just one of those 'you really had to be there things'.

Last Monday, I attended a Kubernetes talk at Rockstart. This meetup had an abundance of excellent pizza and was based in an awesome location. Two talks and a few lightning talks, about dockerizing everything, monitoring 'fashionably', LDAP authorization and using Windows and Linux together on a single Kubernetes cluster. I know it was being recorded, but the recordings don't seem to have surfaced yet, but when they do I suspect they'll be on [this YouTube channel](https://www.youtube.com/user/TheSmartbit).

But that's plenty about eating pizza and listening to other people speaking. Week 3 of Codaisseur was about finishing off our work on Rails by looking at more at SQL/ActiveRecord and using Rails as just a REST API – I expect this will come in really useful when we start working with React next week. We also got started on JavaScript with a whistlestop tour of JavaScript and jQuery. We didn't go too heavily into it (presumably because we'll either fall in love with React and ES6 next week or never want to touch any JavaScript ever again and just stick to the back-end development).

We also worked in teams on a project to store shopping cart items in our user's session. I don't think we really had enough time to work on this, and while what we produced at the end of the week was able to do the core elements of the task, we didn't get through the long list of extra features that we should have implemented. As a reward for this, our homework changed from adding some jQuery flourish to our Codaisseurify applications to going back to working on core Ruby skills, by building a command-line Hangman. [My code is on GitHub](https://github.com/leefreemanxyz/hangman-ruby-starter), and you can give it a go if you want. I didn't go overboard on error-handling, but the weather was too nice to put too much time into it.

Last week was 'Real World Project' week, and each team had to work towards a replacement of the [Taste of Code website](http://tasteofcode.nl/). The new version would let an admin create new Taste of Code events, as well as some other functions to do with hosting and sponsoring events. After an exhausting week, involving god-knows how many code reviews, pull requests, git merges, git rebases and squinting to compare Sketch files with what we saw in our browser, we presented [this on Friday afternoon](http://toc-bears.codaisseur.cloud/). It went down pretty well, but I still had to submit another pull request on Saturday to fix a broken image link. I'm still hoping to have time to rewrite some partials so they are fetching from the database properly, but I've been lead to believe that the next two weeks may not leave me with very much time!

Outside of going to meetups and going to Codaisseur every day, I've had a little time to work on my Codaisseurify app from Week 2. After the homework to work on it changed to the Hangman game, I decided it was a good opportunity to [take it in a different direction](https://github.com/leefreemanxyz/codaisseurify). It's still a work in progress, but there are now albums sitting in between the artist and songs models. Oh, and it now accepts POST requests with song information (which are triggered from a little Node.js application which listens out for my Spotify track changes). I still need to deal with images for artists and album artwork, so my database will get populated by just listening to music. Hopefully I'll get this working in the next week?
