const { find, filter } = require('lodash');
const { GraphQLServer } = require('graphql-yoga')

let meals = [{
    id: '1',
    name: 'Test Meal',
    price: 12,
    review: 'Yeah really really good!!!!',
    rating: 5
}]

let idCount = meals.length

const resolvers = {
    Query: {
        info:  () => `Stuff`,
        meals: () => meals,
        meal: () => Meal 
    },
    Mutation: {
        addMeal: (root, args) => { 
            const meal ={
                id: `meal-${idCount++}`,
                name: args.name,
                price: args.price,
                review: args.review,
                rating: args.rating
            }
            meals.push(meal)
            return meal
        },
        updateMeal: (root, args) => {
            const meal = find(meals, {id: args.id})
            if (!meal) {throw new Error(`Couldn't find meal with id ${args.id}`)};
            args.map(arg)
            (args.name !== undefined) ? meal.name = args.name : '';
            (args.price !== undefined) ? meal.price = args.price : '';
            (args.review !== undefined) ? meal.review = args.review : '';
            (args.rating !== undefined) ? meal.rating = args.rating : '';
            meal.id = args.id
            return meal
        },
        deleteMeal: (root, args) => {
            const index = meals.indexOf(args.id);
            meals.splice(index, index+1);
            return meal
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers, 
})
server.start(() => console.log(`Server is running on 4000`))
