/* Taken from Tom Nurkkala's Youtube Video on Object-RElational Mapping, which uses KnexJS and ObjectionJS to demonstrate
 Basic SQL relationships (https://www.youtube.com/watch?v=2Mnn29KRzEI)

Models in relation
    source: model containing relationMappings definition
    related: model at other end of relation

Relation        Attribute                   FK(s) in
One-toMany      BelongsToOneRelation        Source
                HasManyRelation             Related

Many-to-Many    ManyToManyRelation          Source

One-to-One      BelongsToOneRelation        Source
                HasOneRelation              Related
                HasOneThroughRelation       Join table

See video at around 48:00 for further details.
Also look up Database Relations and also ObjectionJS docs for further details on each one.
*/

// MANY TO ONE RELATION ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// Firstly we extend the ObjectionJS Model class so that we can reference both the Country and City classes/tables later

class Country extends Model {
  static get tableName() {
    return "country";
  }
}

class City extends Model {
  static get tableName() {
    return "city";
  }
  // Note that we are still in the City extends Model here, we simply grab the city table here reference the Country class so that we can link
  // their primary keys as a BelongsToOneRelation relationship...

  // Note that the country object returned here could have been called anything, it simply is an object that is returned which
  // refers to the relation we are creating here.

  static get relationMappings() {
    return {
      // return city.$relatedQuery("country") below refers to THIS.
      country: {
        relation: Model.BelongsToOneRelation, // Defines a Many-to-One relationship
        modelClass: Country,
        join: {
          from: "city.country_id",
          to: "country.country_id",
        },
      },
    };
  }
}

// Then within our server's GET() request, we can ask for that particular relation to be displayed to us:

// Firstly we have the verbose version of a Many-to-one Lazy query, which is also an example of LAZY loading:

City.query()
  .where("city_id", 45)
  .first() // just give us the first result
  .then((city) => {
    console.log(city); // return us the City Class object
    return city.$relatedQuery("country"); // refers to the country object created above
  })
  // secondary .then() statement returns what is outputted from the to: relation
  // note that it doesn't just return us the country.country_id, that is just the foreign key that BINDS it to other tables,
  // we are referencing in this case, the WHOLE country table
  .then((country) => console.log(country))
  .catch((error) => console.log(error.message));

// But this is loaded using a "Lazy" fashion and is still a little clunky, there is a better way...

// This is an example of a Many-to-One (otherwise known as a BelongsToOneRelation) Eager query:

City.query()
  .withGraphFetched("country") // Load this relation first
  .where("city_id", 45)
  .first() // again, just the first result
  .then((city) => console.log(city))
  .catch((error) => console.log(error.message));

// ONE TO MANY RELATION ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// Great!  withGraphFetched() does a lot of the work for us that id displayed above...
// But what if we want to know the relation of the CITY to the COUNTRY instead,
// This is what is known as a One-to-Many relation, and it can be defined like so:

class City extends Model {
  // class City references the table named "city"
  static get tableName() {
    return "city";
  }
}

class Country extends Model {
  static get tableName() {
    return "country";
  }
  static get relationMappings() {
    return {
      // note that we named this relationship in plural, this is to help us understand what KIND of relationship we are creating (One-to-Many)
      cities: {
        relation: Model.HasManyRelation, // Defines a One-to-Many relation
        modelClass: City,
        join: {
          from: "country.country_id",
          to: "city.country_id",
        },
      },
    };
  }
}

// And here's what the query() looks like (LAZY loading version):

Country.query()
  .where("country_id", 17)
  .first()
  .then((country) => {
    console.log(country);
    return country.$relatedQuery("cities");
  })
  .then((cities) => console.log(cities))
  .catch((error) => console.log(error.message));

// This will return to us a single instance (because of first()) of our Country Class with an array returned from
// our $relatedQuery() method.  Again it returns us an ARRAY of CLASS City instances.

// And of course, we would probably want to do this using an EAGER loading version:

Country.query()
  .withGraphFetched("cities")
  .where("country_id", 17)
  .first()
  .then((country) => console.log(country))
  .catch((error) => console.log(error.message));


// MANY TO MANY RELATION ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//  Lastly let's look at a Many-to-Many Relationship (3 or more table join):

// In this instance, Tom Nurkkala uses the example of a film/actor database, which uses an "Associative Table",
// called film_actor, which basically ONLY has references to two other tables (two foreign keys), in this case
// the film table and the actor table.

class Actor extends Model {
  static get tableName() {
    return "actor";
  }
  fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}

class Film extends Model {
  static get tableName() {
    return "film";
  }
  static get relationMappings() {
    return {
      // again, note the plural syntax here, to help us understand what we expect to be returned
      actors: {
        relation: Model.ManyToManyRelation,
        modelClass: Actor,
        // Because there are 3 tables involved here, we have to express their relations
        join: {
          from: "film.film_id",
          // References our "Associative Table", which again, has two FOREIGN keys, referenced below:
          through: {
            from: "film_actor.film_id", // references the film.film_id
            to: "film_actor.actor_id", // references the actor.actor_id
          },
          to: "actor.actor_id",
        },
      },
    };
  }
}

// And once again, we can query() this relation in a LAZY Loading fashion:

Film.query()
  .select("film_id", "title")
  .where("film_id", 17)
  .first()
  .then((film) => {
    console.log("TITLE", film.title);
    return film.$relatedQuery("actors");
  })
  // after the 'actors' relation query is fulfilled, the returned array of actors is looped through,
  // and the fullName() method defined above is invoked, returning the actor's full name
  .then((actors) =>
    actors.forEach((actor) => console.log("ACTOR", actor.fullName()))
  )
  .catch((error) => console.log(error.message));

// And yes, the better EAGER version:

Film.query()
  .select("film_id", "title")
  .where("film_id", 17)
  .withGraphFetched("actors")
  .first()
  // Note the different syntax here, it's because Objection withGraphFetched() in a Many-to-Many relation returns us
  // a single CLASS instance (first()) where film has an ARRAY referring to the RELATION "actors"
  // This was defined in our relationMappings() method above...
  // so referencing that array is done slightly DIFFERENTLY
  .then((film) => {
    console.log("TITLE", film.title);
    film.actors.forEach((actor) => console.log("ACTOR", actor.fullName()));
  })
  .catch((error) => console.log(error.message));
