---
layout: post
title:  "Deployment, RSpec, Associations and hitting the 'dojo'"
date:   2017-03-19 12:00:00 +0200
categories: learn-to-code
---
That's Week 2 of Codaisseur completed and I'm now 25% of the way through the course. We were only in class for 5 days this week, but the extra day was spent doing homework, so...¯\\\_(ツ)\_/¯.

My last post was about 1400 words, but I think I actually did more this week than last week, so...¯\\\_(ツ)\_/¯.  Some people would suggest editing these things after writing them, but I'm pretty sure that as a career-switcher from editorial I can refuse to ever edit anything ever again (edit: spotted a typo in this paragraph immediately after publishing, so here I am fixing it).

<!--more-->
<h2>CodaisseurUp</h2>
This week mainly involved building what is essentially a clone of <a href="https://www.meetup.com/">Meetup</a>. As a user, you can create events, place them in categories and eventually declare that you are attending an event. This was pretty cool as I've made a bit of a habit of attending meetups since moving to Amsterdam in the Autumn.

In fact, this week I attended two meetups. On Wednesday I attended Citinerary's <em><a href="https://citinerary.net/">A City Made of People #16</a></em>, where I heard about 'High Cuisine' (think Michelin quality food prepared with cannabis and magic mushrooms),  the refugee project taking place at the Bijlmer prison (because The Netherlands has so few prisoners they've had to shut down prisons) and about a 'new opera' festival taking place here in Amsterdam (though I think I've had enough 'new' music to last a lifetime with the Huddersfield Contemporary Music Festival, so I think I'll pass).

The second meetup was for the Continuous Delivery meetup at the Bestseller offices in the Spaces building on Vijzelstraat (so it was about 500m away from Codaisseur –handy!). To be honest, we were all completely spoiled. A goody-bag on the way in (containing a <a href="https://www.thetileapp.com/">Tile</a>, a <a href="http://shop.bestseller.com/no/no/bc/gift-boxes/jack-and-jones-denim-dog-21-cm-giveaway-12097609.html?cgid=bc-gift-boxes">Jack Jones stuffed denim dog</a> and a water bottle), a choice of hot dogs or flatbreads (or both, if you're really hungry), little tubs of Ben &amp; Jerry's during the talks and the usual beers were available too. Oh, and I picked up some GitHub/Atom stickers too. If all these goodies weren't enough to remember the evening, we ended up walking away with a bunch of polaroids of ourselves. I feel like I'm forgetting something... the talks!
<ul>
 	<li>Nikolaos Georgiou (Bestseller) – <em>CD at scale: the success story of a big rewrite</em>. This was pretty interesting talk and I expect a lot of companies have either already gone through this sort of process, are in the middle of it or have it all to look forward to. I'm not sure what prompted the rewrite (whether it was a new CTO or some disastrous tech catastrophe), but it sounded necessary. Their codebase was spread over a number of servers, I think they were using SVN over git and they had no test coverage whatsoever. Yikes – but all three have been rectified now.</li>
 	<li>Bas Peters (GitHub) – <em>Inner Source: adopting open source principles</em>. This was a really great talk about how even when you're working in a closed environment (so can't just open source <em>everything</em>), you can adopt principles that improve your developers' lives. He discussed how it can be beneficial to let developers share their work without boundaries, have focused code reviews and increase visibility. Oh, and testing is pretty important at GitHub too, if you want to run CI/CD type things.</li>
</ul>
Uhhh, that's the meetup reviews for this week done.
<h2>Deployment</h2>
The week at Codaisseur (remember that, it's what I'm supposed to be writing about) began with setting up our <em>CodaisseurUp</em> app. We all generated our new Rails apps (and added Devise, Bootstrap, RSpec, 12factor gems and added a navbar). We were ready to go and deploy our apps.

I've a little experience on deployment things (as I desperately recall what I wrote in <a href="https://leefreeman.xyz/2017/02/23/goodbye-editor-hello-developer/">Goodbye editor, hello developer!</a>), both pushing things to Heroku for the Rails tutorial and pulling this WordPress theme from GitHub to the VPS this site is hosted on, so it wasn't a completely alien experience.
So, Codaisseur essentially run their own Heroku-like service, powered by <a href="https://deis.com/">Deis</a> and supported with their own <a href="https://github.com/Codaisseur/alea">Alea</a> service. After fixing some minor gem issue (I was calling a gem from the :test group in my seeds.rb file, which obviously won't work in the :production environment), I had it up and running. This sort of service is really awesome, and I'd love to have something similar-ish running on my own VPS, partly for the <del>headache</del> fun of setting it up, but also because I find it a bit fiddly deploying a new site on here. Messing around with nginx configs, setting up SSL stuff etc. It would be nice to be able to just type something like
<pre>git push origin master &amp;&amp; git push cloud master</pre>
and have the service just get on with it for me. So, that's going in the big to-do pile.

I don't really feel like writing at length, but will mention that the images for my Rails work are being stored in Cloudinary. I've no doubt there are plenty of other similar ways of storing images externally, so I might have to investigate further in future, but Cloudinary, CarrierWave and I are pretty chill right now about the whole thing, so we can leave it there.
<h2>RSpec</h2>
My choice of meetups this week was evidently pretty on point, as this week we started writing tests for our Rails apps. We used RSpec for this rather than Rails' default Minitest, but the test suites are ultimately going to be pretty similar. Your test will inevitably have some sort of setup, an execution phase and then a declaration of what you're expecting in order for the test to pass.

I totally understand how all these companies didn't implement testing when building their platforms however long ago. It needs time dedicated to it (and people don't necessarily want to pay for all these tests to be written). I think I'm at the stage where I know it's really good and useful, especially as I want to be doing all sorts of things with automation, but perhaps I lack a little confidence in whether I'm really testing my application really robustly. I think this probably comes with experience, and by 'experience' I mean having my applications break when I thought they were tested and going back to write new tests to cover what I hadn't thought of!
<h2>Associations</h2>
Last week, we learned about associations in Rails, and our hackathon project was essentially an implementation of a has_many/belongs_to relationship, which we'd learned about the day before. This week, we covered the other association types in Rails, so now we can use:
<ul>
 	<li>has_many</li>
 	<li>has_one</li>
 	<li>has_and_belongs_to_many</li>
 	<li>has_many :through</li>
 	<li>has_one :through</li>
 	<li>belongs_to</li>
</ul>
I think many-to-many connections are likely to be the biggest headaches for other beginners. How do you choose between has_and_belongs_to_many and has_many :through? What it boils down to is whether you are using a third model in between or not? It's easier to explain with examples, and I can consider my CodaisseurUp models:
<ul>
 	<li>events can have many categories and categories can have many events. You don't need any more information, just a table that expresses which category ids and event ids match up with each other. For this, you can use a has_and_belongs_to_many association.</li>
 	<li>events can have many users attending and many users can attend events. For this you might want to have a separate model for your registrations, which may contain extra information – how much have they paid for registration? Are they bringing guests? There might be further information about that particular event. For this, you could use the has_many :through association on both models and then set up a third model, containing all this extra information and your two base models as foreign keys in the database.</li>
</ul>
So, that's how you do it. Here's my <a href="https://github.com/leefreemanxyz/codaisseurup">CodaisseurUp repository</a>. There are a few things that need fixing (in particular, images on the front page, and more ways to discover and register for events), but it will all be dependent on my workload over the coming weeks as to whether it gets updated at all.
<h2>Hitting the dojo</h2>
Karate CHOP! Friday afternoon was in my calendar as a 'coding dojo'. This sounds much more exciting than it really was – the task was to, in pairs, refactor some <a href="https://github.com/emilybache/Tennis-Refactoring-Kata/blob/master/ruby/tennis.rb">ruby code about tennis scores</a> so it continues to pass the tests that have been written for it (we only had to tackle the first class in this file). This code is really stinky too – nested if/else/elsif statements, lines of code that don't actually do anything, badly named variables and general other bad behaviour.

Anika, my coding partner, and I spent quite a lot of time just scratching our heads at some of this really quite bizarre code we had in front of us. Then we got to work. We extracted strings into constants and variables and dealt with the horrors that lay in waiting in the spread operator in the else condition (lines 39-53). We then extracted various conditionals into their own methods and used ternary operators to return the appropriate results.

Was it a perfect solution? Well, after seeing other people's work and having a few things pointed out to us by our teacher, there are a few things I would change, of course, but perhaps there is more value in seeing what we came up with, rather than a 'perfect' solution. <a href="https://gist.github.com/leefreemanxyz/f073271936385ab4dd4724fa0734556f">Here I link to the solution that we came up with in class</a> before it was critiqued – the code should be pretty clear in what is going on here. If you haven't tried this sort of thing before, then I definitely think it's a worthwhile task, and the GitHub repo provides options in a pretty large number of languages.
<h2>Looking forwards</h2>
So, we had some homework over the weekend, which was fine, and we'll get tested on it on Tuesday (my GitHub repo for it). Provided all goes well, I'm sure I'll try and write about it next weekend.

This week, it looks like we've got some project work to do building shopping carts and some lessons in using Rails as an API, as well as our first introduction to javascript.

Because I'm a glutton for punishment, I'm currently down to attend developer meetups on <a href="https://www.meetup.com/Amsterdam-rb/">Tuesday night (amsterdam.rb)</a> and <a href="https://www.meetup.com/DigitalOceanAmsterdam/">Wednesday night (DigitalOcean Amsterdam)</a>, before a social meetup on Thursday. Definitely hoping there isn't much in the way of homework this week!
