---
layout: post
title: "Multiline strings in GraphQL with Neo4J"
date: 2020-05-07 12:00:00 +0200
categories: graphql,neo4j,javascript
---

For the last year or so I've been working with GraphQL with NodeJS quite a lot, both as a wrapper around some REST microservices and with the graph database Neo4J. While it hasn't been a problem with the REST microservice project, line length has been a real problem when working with Neo4J schemas. This week I've found out two ways to solve this.

<!--more-->

When working with Neo4J I normally can let the library infer all my schemas and resolvers from the database contents, but sometimes I need to write some custom cypher (Cypher is Neo4j’s graph query language that allows users to store and retrieve data from the graph database).

Here is an example from their docs:

```
const types = gql`
    type Movie {
    movieId: ID!
    title: String
    year: Int
    plot: String
    similar(first: Int = 3, offset: Int = 0): [Movie]
        @cypher(
        statement: "MATCH (this)-[:IN_GENRE]->(:Genre)<-[:IN_GENRE]-(o:Movie) RETURN o ORDER BY COUNT(*) DESC"
        )
    }
`
```

The `similar` field is resolved using this custom @cypher directive, and while this is quite a simple query, it's easy to find yourself writing much longer and more complex queries and you can't just stick a line break in there. So here are two solutions.

Despite working with GraphQL so much over the last year, I'm sure I haven't even scratched the surface of what it's capable of, and one of those things is how it supports multiline strings or [Block Strings](https://spec.graphql.org/June2018/#BlockStringCharacter), by wrapping the string in triple quotation marks """. I'd seen this syntax in our Python loading scripts for Neo4J, and hadn't realised that the same syntax was available with GraphQL (and, after all, as a Javascript/Typescript developer, I would normally just use a template literal for multiline blocks). So, the example above can be rewritten as:

```
const types = gql`
    type Movie {
    movieId: ID!
    title: String
    year: Int
    plot: String
    similar(first: Int = 3, offset: Int = 0): [Movie]
        @cypher(
        statement: """MATCH (this)-[:IN_GENRE]->(:Genre)<-[:IN_GENRE]-(o:Movie)
                        RETURN o ORDER BY COUNT(*) DESC"""
        )
    }
`
```

It's not a drastic improvement here, but for longer queries, it really improves the readability.

The other solution is even better - the latest release of the [neo4j-graphql-js](https://github.com/neo4j-graphql/neo4j-graphql-js) library that I use has added an export of a `cypher` template literal tag, which also enables syntax highlighting 😍. The previous example using this new syntax instead:

```
const similarQuery = cypher`
    MATCH (this)-[:IN_GENRE]->(:Genre)<-[:IN_GENRE]-(o:Movie)
    RETURN o ORDER BY COUNT(*) DESC
`

const types = gql`
    type Movie {
        movieId: ID!
        title: String
        year: Int
        plot: String
        similar(first: Int = 3, offset: Int = 0): [Movie] @cypher(${similarQuery})
    }
`
```

So much better 😊.
