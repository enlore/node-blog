# It's the Exception
## Wait For It... MongoDB

Binary JSON! BSON!

![BSON](/img/mbison.png "Mmmm Bison")

### Some nouns

__Databases__ organize collections. When you fire up the mongo shell, you
connect to a default db unless you specified one on the command line. When
you create a collection, you do so on a given database, and it will only
be accessible on said database.

__Collections__ are analagous to SQL tables, save the lack of columns.

Collections collect __documents__.  This is similar to a row, being one
entry in our database. It's a block of JSON, basically.


### Some verbs

Fire up the mongo shell with the `mongo` shell command, and let's take a look around.

First, `show dbs` and take a look at the collections present on the system.

Now, let's construct a simple document and save it to a new collection.

    > a_post = {title: "On Being Goofy", body: "I am the very model of a modern app developer.", tags: ["article", "mongo", "shell"]}
    {
            "title" : "On Being Goofy",
            "body" : "I am the very model of a modern app developer.",
            "tags" : [
                    "article",
                    "mongo",
                    "shell"
            ]
    }
    > 

Several intersting things to note here. 

1. Javascripty syntax
2. Variables
3. JSON
4. A properly constructed document causes the mongo shell to spit it back out
at you pretty-fied.

We have a document.  Let's persist it!

    > db.posts.save(a_post)
    >

Awesome.  Did we do anything? Let's query and find out.

    > db.posts.find()
    { "_id" : ObjectId("52cb1c8e2943c08797611fa4"), "title" : "On Being Goofy", "body" : "I am the very model of a modern app developer.", "tags" : [ "article", "mongo", "shell" ] }
    > 

Nice! There's our post, and with a fancy new `_id` attribute attached. 
Mongo generates id's for us by default.  

Also, __mongo created a collection for us when we saved our first docuemnt__.
We told it to implicitly when we called the `save` method on a collection 
that didn't already exist (that being `posts`).

### Understanding Ourselves

Let's look in the mirror and seek a deeper understanding of the self.

    > help

    > show collections
    posts
    system.indexes

    > show users

    > show profile

    > show logs
    global
    >

    > show log global
    [ all sorts of crap ]


### Having Attained Self Knowledge, Let Us Seek Change

Connect to a given database.
    > use <db_name>



### More On That JS Syntax Bit From Earlier

Need a slew of test documents stuck in your db?

    for (var i = 0; i < 100; i++) {}

----------
