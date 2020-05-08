---
layout: post
title: "Timing functions with TypeScript decorators"
date: 2020-05-08
tags: typescript,decorators,javascript
---

So around November/December last year, I really felt like I was stagnating at work. I wasn't feeling particularly challenged, was undervalued, distracted by my upcoming holiday in Mexico and wasn't making the progress as a developer that I would have liked. So I decided to try and tackle the last issue as I felt I had the most control of it and I signed up to some courses on Udemy and pick up some new skills. One of those new skills I was interested in was TypeScript – it's becoming more prevalent in the job market, offers an incremental adoption process and some blockers to adoption at work had been removed.

So I signed up to Stephen Grider's [TypeScript: The Complete Developer's Guide](https://www.udemy.com/course/typescript-the-complete-developers-guide/) and I've been slowly working through it over the last few months. One of the sections later on in the course is about decorators. I'd seen decorators applied to React-Redux a couple of years ago and I didn't really understand them/see the need for them and they just generally seemed like confusing _magic_. Since then I've seen similar looking code in my backend colleague's Spring/Java code, in some Django project I worked with and when looking at some documentation for NestJS. It wasn't until doing the section of Stephen's course though that I began to understand them and see some uses for them.

<!--more-->

If you haven't used decorators in Typescript before, then [start with the documentation](https://www.typescriptlang.org/v2/docs/handbook/decorators.html), but here I'm using them to modify a class method.

I've written previously about using Neo4J at work, and I'm trying it out for a personal project, importing data from a postgres database using the JDBC driver. For this sort of importing job, I'll create a base Neo4J class that accepts a Neo4J driver and add each step that I want to execute as a method to it.

```
export class Neo4J {
  constructor(public driver: Driver) {}

  async runQuery() {
    try {
      const session = await this.driver.session();
      const res = await session.run(`
            // some cypher query
      `);

    } catch (error) {}
  }
}
```

Now at work, we use Python to do the importing, and we call a logging function before and after each method, which prints a timestamp and a message. I didn't really like this approach though, as there's a lot of code repetition, so I decided to create a decorator factory for this (using a factory allows the message variable to be passed in for each method that it's decorating).

```

export function createTimestamps(message: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const startTime = new Date(Date.now());
      console.log(
        `${message} started at: ${startTime.toLocaleString("en-GB")}`
      );
      await method.apply(this);
      const endTime = new Date(Date.now());
      console.log(
        `${message} completed at: ${endTime.toLocaleString("en-GB")}`
      );
      console.log(
        `${message} took ${
          endTime.getTime() - startTime.getTime()
        }ms to complete.`
      );
    };
  };
}
```

This decorator logs the start time of a function, then calls it (with `await method.apply(this)`) and then logs the finish time and calculates how many milliseconds it took for the function to complete. To use it, import the `createTimestamps` function and _decorate_ the method you want to collect timestamps for.

```
export class Neo4J {
  constructor(public driver: Driver) {}

  @createTimestamps('Run query')
  async runQuery() {
    try {
      const session = await this.driver.session();
      const res = await session.run(`
            // some cypher query
      `);

    } catch (error) {}
  }
}
```

When you call the `runQuery()` method from now on, you'll get some easy-to-digest information about how long each function took to run (and the code to modify this is neatly stored in just one place). Because this worked really well in Typescript for my use case, I looked up how to do the same thing in Python and opened a pull request at work to add the timestamps automatically (I borrowed some code I found online for this):

```
from datetime import datetime

import functools
import time


def timer(func):
    """Print the runtime of the decorated function"""
    @functools.wraps(func)
    def wrapper_timer(*args, **kwargs):

        print(
            f"[{datetime.now().strftime('%d/%m/%Y %H:%M:%S')}] Starting {func.__name__}")
        start_time = time.perf_counter()    # 1
        value = func(*args, **kwargs)
        end_time = time.perf_counter()      # 2
        run_time = end_time - start_time    # 3
        print(f"[{datetime.now().strftime('%d/%m/%Y %H:%M:%S')}] Finished {func.__name__!r} in {run_time:.4f} secs")
        return value
    return wrapper_timer

```

While I was apprehensive before about decorators, I'm now one of the converted 🥰
