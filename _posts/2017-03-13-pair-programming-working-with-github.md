---
layout: post
title:  "Pair programming, flexbox & working with GitHub!"
date:   2017-03-13 12:00:00 +0200
categories: learn-to-code
---
So my first week of [Codaisseur's academy/bootcamp](https://www.codaisseur.com/) was a great success! I think the time spent on the [Learn.co Bootcamp Prep](http://learn.co/) has really paid off and I'd definitely recommend it to anyone thinking about a bootcamp or about to embark on one.

The week started last Sunday and ran through until Friday evening. After a lovely day in Utrecht on the Saturday followed by taking it very easy at a friend's birthday party on the Saturday evening, bright-eyed and bushy tailed, I turned up at the TQ building for 9.30am.

After a brief induction session (don't be a dick, treat the building/people with respect), we were straight into HTML and CSS with Tijn. Now, I've got a fair amount of experience with HTML and CSS, so I was a bit concerned about what I would get out of the day, but luckily there was some interesting stuff to get stuck into.

<!--more-->

## Emmet
Yeah, it's not just the main character from the Lego Movie, but it's also an awesome tool for writing HTML. Essentially, you write an expression, press tab and it expands it all into full HTML tags.

With Emmet, you can write something like `(div.row>div.col-md-6+div.col-md-3)*4` and it will expand into 4 divs with the class `row`, each with 2 child divs, the first with the class `col-md-9` and the other with `col-md-3`. The &gt; indicates a child tag, while the + indicates siblings. This was a really simple example. You can also add an 'id' to each tag using the `#` symbol and the name of the id.

So, you write some big long expression, press tab and it all expands into some lovely HTML. On top of that, your cursor appears in the first position you need to start providing content in, and each press of the tab key jumps forward to the next position to start writing stuff. It's very cool and there's definitely room to be more efficient with writing your HTML like this.

The other really awesome thing I got out of Sunday was working with CSS flexbox. I feel like 'the internet' can sometimes be a bit down about flexbox. 'Ooh, can you use flexbox, what about IE9 support?' etc. But you can use it on [97% of the browsers out there in the wild](http://caniuse.com/#feat=flexbox). So, just use it. It's a higher percentage than the css3 `border-radius` attribute.

So, what do we do with flexbox? You apply the attribute `display:flex` to a parent element and it will make all the children flexy. It's awesome and it makes it a dream to do things like justify your content and centering things in divs etc. I can highly recommend it.

Monday to Wednesday were spent working with Ruby on the command line. I have mixed feelings about it to be honest. I found it really useful creating classes in Ruby to take do some object-oriented programming, and I think it lays a good foundation for working with Rails (but it can be a little tiresome when I really just wanna get started making some web apps!).

## Ruby on Rails
Yes. Thursday brought us Ruby on Rails, and it is quite simply magical. It's really, really smart, and took very little time to get up and running making associations between classes and creating my [Valley of Dinosaurs](https://github.com/leefreemanxyz/valleys-of-dinosaurs) and [Cities of Monsters](https://github.com/leefreemanxyz/cities-of-monsters) apps.

This also involved our first introduction the MVC design pattern. Obviously there are variants, but this pattern is very popular, so it's really important to get familiar with it.

If you're just getting started with Rails, the our teacher Miriam really drilled into us to think:

- Router
- Controller
- Model (if you need it)
- View

So, what route is being called? Now, think about the controller and action you're calling. Are you asking your model to speak to the database? Now, how is that being displayed in your view? Breaking it down like this and working through the flow of data and what instructions you're giving should really make it clear when you're trying to make heads or tails of your web app. Failing that, just read the Rails error messages and just develop by fixing what it tells you.

## Pair programming
Wow, so Friday was the final day of Week 1, and we were working in groups to implement what we had learned that week. One of the main experiences I really wanted to get out of the course was working in groups. I imagine it's a problem for many self-taught developers – you work alone and there is no real judge of the quality of your code. I mean, sure, you can submit it to the internet, but I think it takes a lot of bravery to put yourself out there and request feedback.

So part of our task was to share laptops and pair program, and I have to say, it's a completely novel experience for me, and I can't help but wonder what this sort of practice would involve in my previous career (and yes, it feels good to write that).  What other careers might it work (or not work) in?

As an editor, would it be possible to 'pair edit'? Is there any logistical reason preventing it? I always felt that editing was a very solitary experience. Lots of responsibility, lots of ~~fighting~~ discussion with your author, but I rarely felt supported as part of a team.

In trying out pair programming, I thought it was an interesting experiment and it's probably something that you get used to as you do it more and try it with other people. Our teachers discussed today using the second person to essentially be a god of documentation/Stack Overflow/Google and, while this is very different from the task we were set (I felt the instruction to only work from one laptop between two was fairly explicit), it perhaps has some extra potential to work.

While we were pair programming though, we were also working simultaneously with another pair on our project, which leads me to...

## GitHub
GitHub is amazing. In my *previous career* we used an absolutely god-awful bit of software to use called Documentum. It only worked in Internet Explorer and required Java to work. It completely sucked. Luckily my project didn't involve using it that much because *reasons*.

And now here I am using GitHub. I talked about it in my previous post. Branch it, add it, commit it, push it. Amazing. But now we've got other people using it too and it's really awesome to see how to deal with merge conflicts and pull requests really works. It really emphasized the importance of making small branches so that submitted code is easier to review (and I know that I'd rather have a quick look at 3 lines of submitted code than 300).

So, using what we had learned the day before, we created our Batches of Students app, where you could see former Codaisseur students by according to the batch they were part of. This let us explore parent and child relationships, as well as adding `references`, `has_many` and `belongs_to` to our models.

Because I found working on GitHub really valuable and I think we could all do with some more experience submitting pull requests and working with merge conflicts, I opened a few issues on GitHub for the team to work through when we find time to do so. While we are moving onto other projects, some of these issues only require a line of two or code, but I think there is more to gain out of the experiences here than merely writing those one or two lines of code, so here we are. You can check out the [repository on GitHub](https://github.com/anikaSchwing/codaisseur_connection).

I'd intended to update this about once a week, and I hope I can keep to this sort of schedule, but I think the words come pretty easily for this, so we should be okay, even if this one is a little late. We'll see.

Also, I know I just re-did the whole blog thing, but I'm very tempted to start over. My Chrome updated with CSS grid this morning, and I really want to try a real newspaper/magazine-like layout for my blog, because I think it would look really rad (also, I assume that anyone reading this will be a FireFox/Chrome user anyway). I can look at CSS Grid with Wordpress, but it may be a lot simpler to try it out with Jekyll anyway (especially given that my course focuses so much on Ruby/Rails anyway). I'll see how busy I end up in the next fortnight and hopefully be make a decision on this. We'll see, I'll let you know.
