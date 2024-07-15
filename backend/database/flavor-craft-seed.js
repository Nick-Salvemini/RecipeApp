const bcrypt = require('bcrypt');
const { Client } = require('pg');
const { getDatabaseUri } = require('../config');

async function seedDatabase() {
    const client = new Client({ connectionString: getDatabaseUri() });
    await client.connect();

    const saltRounds = 10;
    const users = [
        {
            password: 'password1',
            email: 'testemail1@gmail.com',
        },
        {
            password: 'password2',
            email: 'testemail2@gmail.com',
        },
    ];

    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
    }

    const usersSql = `
        INSERT INTO users (password, email)
        VALUES
        ('${users[0].password}', '${users[0].email}'),
        ('${users[1].password}', '${users[1].email}')
        ON CONFLICT (email) DO NOTHING;
    `;

    const recipesSql = `
        INSERT INTO recipes (user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps)
        VALUES
        (1, 'Spaghetti Carbonara', 'easy', '30 minutes', 'Italian', 
        ARRAY['200g spaghetti', '100g pancetta', '2 large eggs', '50g pecorino cheese', '50g parmesan', 'Salt and pepper'], 
        ARRAY['Cook the spaghetti', 'Fry the pancetta', 'Mix eggs and cheese', 'Combine all with spaghetti']),
        (1, 'Chicken Curry', 'medium', '45 minutes', 'Indian', 
        ARRAY['500g chicken breast', '2 onions', '3 tomatoes', '2 tsp curry powder', '200ml coconut milk', 'Salt and pepper'], 
        ARRAY['Cook the chicken', 'Prepare the sauce', 'Combine chicken and sauce', 'Simmer until cooked']),
        (2, 'Beef Tacos', 'easy', '20 minutes', 'Mexican', 
        ARRAY['500g ground beef', '1 packet taco seasoning', '8 taco shells', '100g shredded lettuce', '100g cheese', 'Salsa'], 
        ARRAY['Cook the beef', 'Add taco seasoning', 'Prepare taco shells', 'Fill shells with beef and toppings']),
        (2, 'Vegetable Stir Fry', 'easy', '15 minutes', 'Chinese', 
        ARRAY['1 broccoli', '2 carrots', '1 bell pepper', '2 tbsp soy sauce', '1 tbsp olive oil', 'Salt and pepper'], 
        ARRAY['Chop the vegetables', 'Heat the oil in a pan', 'Stir fry the vegetables', 'Add soy sauce and seasoning']);
    `;

    try {
        await client.query(usersSql);
        await client.query(recipesSql);
        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await client.end();
    }
}

seedDatabase().catch(console.error);
