# A Rodent
## It is a rodent, isn't it? 

Or at least verming, if not a rodent? 

### Schema
So step one is defining a schema.  This, as you might expect, establishes
our expectations about the data attributes that will be present on a model
as well as 'static' and instance methods avaible on it. 

### I Lied
step one is establishing a connection to our db. 

    var mongoose = requite('mongoose')
        , conn_opts = {}
        , conn = mongoose.connect('mongodb://user:pass@host:port/db_name?options', conn_opts)

### And Then We Make Schema

    var fruitSchema = new mongoose.Schema({
            name: String,
            picked: { type: Date, default: Date.now },
            organic: Boolean
        }) 

#### Schema Attribute Types
* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* Objectid
* Array

### From a Schema, We 'Compile' a Model

    // A string as model name, and the schema object
    var fruitModel = mongoose.model('Fruit', fruitSchema)

### Using A Model, Instantiate Document Instances

    var fruitDoc = new fruitModel({
            name: 'Apple',
            picked: Date.now(),
            organic: false
        })


### The document instance and model 'class' provide the persistence interface 

#### Persitence
    fruitDoc.save(function (err) {
        if (err)
            throw err
        console.log('%s saved!', fruitDoc.name)
    })

    // Instantiate and persist in one step (fancy!)
    fruitModel.create({
            name: 'Banana',
            picked: Date.now(),
            organic: true
        }, function (err, anotherFruitDoc) {
            if (err)
                throw err
            console.log('%s saved!', anotherFruitDoc.name)
        })

####  Querying

    fruitModel.find()
    fruitModel.findById()    
    fruitModel.findOne()
    fruitModel.where()

#### Deletion, or... Depersistence?

    fruitModel.remove({ name: 'Apple' }, function (err) {
        if (err)
            throw err
        console.log('He\'s dead, Jim.')
    })

-------
