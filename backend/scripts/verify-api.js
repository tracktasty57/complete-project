const API_URL = 'http://localhost:5000/api';

async function verify() {
    try {
        console.log('1. Registering User...');
        const registerRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test User', email: `test${Date.now()}@example.com`, password: 'password123' })
        });
        const registerData = await registerRes.json();
        console.log('Register Response:', registerData);

        if (!registerData.token) {
            console.error('Registration failed, cannot proceed.');
            return;
        }
        const token = registerData.token;
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

        console.log('\n2. Creating Recipe...');
        const recipeRes = await fetch(`${API_URL}/recipes`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: 'Test Recipe',
                description: 'A test recipe',
                ingredients: ['Ingredient 1', 'Ingredient 2'],
                instructions: 'Mix them up',
                cookTime: '10 min',
                servings: 2,
                category: 'dinner'
            })
        });
        const recipeData = await recipeRes.json();
        console.log('Create Recipe Response:', recipeData);

        console.log('\n3. Fetching Recipes...');
        const recipesRes = await fetch(`${API_URL}/recipes`, { headers });
        const recipesData = await recipesRes.json();
        console.log(`Fetched ${recipesData.length} recipes`);

        console.log('\n4. Updating Meal Plan...');
        const mealPlanRes = await fetch(`${API_URL}/meal-plans`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                weekStartDate: new Date(),
                days: {
                    monday: { breakfast: { name: 'Test Breakfast', time: '8:00', servings: 1 } }
                }
            })
        });
        const mealPlanData = await mealPlanRes.json();
        console.log('Update Meal Plan Response:', mealPlanData);

        console.log('\n5. Adding Shopping Item...');
        const shoppingRes = await fetch(`${API_URL}/shopping-list/items`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                item: {
                    id: Date.now(),
                    name: 'Test Item',
                    category: 'pantry',
                    quantity: '1',
                    completed: false,
                    priority: 'medium'
                }
            })
        });
        const shoppingData = await shoppingRes.json();
        console.log('Add Shopping Item Response:', shoppingData);

        console.log('\n✅ Verification Complete');
    } catch (error) {
        console.error('Verification Failed:', error);
    }
}

verify();
