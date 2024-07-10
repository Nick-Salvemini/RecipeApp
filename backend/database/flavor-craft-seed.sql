INSERT INTO users (username, password, email)
VALUES 
    ('testuser1', '$2b$10$somehashedpassword1', 'testemail1@gmail.com'),
    ('testuser2', '$2b$10$somehashedpassword2', 'testemail2@gmail.com');

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
